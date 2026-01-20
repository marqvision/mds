import { ErrorItem, FileData, FileUploaderError, FileUploaderStore, Item, Listener, Progress } from '../@types';

/** 아이템이 업로드 진행 중인지 판단 */
export const checkIsItemUploading = (progress: Progress | null | undefined): boolean => {
  if (!progress) return false;
  if (progress.isUploading === true) return true;
  if (progress.percentage !== undefined && progress.percentage > 0 && progress.percentage < 100) return true;
  if (progress.count && progress.count.current < progress.count.total) return true;
  return false;
};

/** 아이템이 업로드 완료되었는지 판단 */
export const checkIsItemCompleted = (progress: Progress | undefined): boolean => {
  if (!progress) return false;
  if (progress.isUploading === false) return true;
  if (progress.percentage === 100) return true;
  if (progress.count && progress.count.current === progress.count.total && progress.count.total > 0) return true;
  return false;
};

const DEFAULT_PROGRESS: Progress = {
  count: { current: 0, total: 0 },
  percentage: 0,
  isUploading: false,
};

export const calculateBatchProgress = (items: Item[]): Progress => {
  if (items.length === 0) return DEFAULT_PROGRESS;

  // progress가 있는 아이템 = 현재 배치에 포함된 아이템
  const batchItems = items.filter((item) => item.progress !== undefined);

  // 아직 업로드 중인 아이템
  const activeItems = batchItems.filter((item) => checkIsItemUploading(item.progress));
  const isUploading = activeItems.length > 0;

  // 배치가 없거나 모든 업로드가 완료되면 초기화
  if (batchItems.length === 0 || !isUploading) return DEFAULT_PROGRESS;

  // 완료된 아이템 수
  const completedCount = batchItems.filter((item) => checkIsItemCompleted(item.progress)).length;

  // 전체 진행률 계산
  const percentage = Math.round(
    batchItems.reduce((sum, item) => sum + (item.progress?.percentage ?? 0), 0) / batchItems.length
  );

  return {
    count: { current: completedCount, total: batchItems.length },
    percentage,
    isUploading: true,
  };
};

const calculateErrorItems = <T extends FileData>(items: Item<T>[]) => {
  return items.map((item, index) => ({ index, item })).filter(({ item }) => item.error) as ErrorItem<T>[];
};

/** subscribe 헬퍼 함수 생성 */
const createSubscriber = (listeners: Set<Listener>) => (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * FileUploader의 상태 저장소
 *
 * ## 역할 (Store의 책임)
 * - **순수 상태 저장**: items, globalErrors, batchProgress
 * - **파생 상태 계산**: progress, isUploading, errors (items로부터 자동 계산)
 * - **구독 메커니즘**: useSyncExternalStore 호환
 *
 * @see useFileUploader - 비즈니스 로직을 담당하는 Hook
 */
export const createFileUploaderStore = <T extends FileData = FileData>(
  initialItems: Item<T>[] = []
): FileUploaderStore<T> => {
  let items: Item<T>[] = [...initialItems];
  let globalErrors: FileUploaderError[] = [];
  let manualProgress: Progress | null = null;
  let cachedCombinedErrors: FileUploaderError[] = [];
  let isProcessing = false;

  let batchProgress: Progress = calculateBatchProgress(items);
  let cachedErrorItems: ErrorItem<T>[] = calculateErrorItems(items);

  const itemListeners = new Map<number, Set<Listener>>();
  const globalListeners = new Set<Listener>();
  const progressListeners = new Set<Listener>();
  const isUploadingListeners = new Set<Listener>();
  const errorsListeners = new Set<Listener>();
  const isErrorListeners = new Set<Listener>();
  let prevIsError = globalErrors.length > 0 || cachedErrorItems.length > 0;

  // combinedErrors 캐시 업데이트
  const updateCachedCombinedErrors = () => {
    const itemErrors: FileUploaderError[] = cachedErrorItems.map(({ index, item }: ErrorItem<T>) => ({
      ...item.error,
      files: item.data.file ? [item.data.file] : undefined,
      index,
    }));
    cachedCombinedErrors = [...globalErrors, ...itemErrors];
  };
  updateCachedCombinedErrors();

  const notifyItem = (index: number) => {
    itemListeners.get(index)?.forEach((listener) => listener());
  };

  const notifyGlobal = () => {
    globalListeners.forEach((listener) => listener());
  };

  const clearGlobalErrors = () => {
    if (globalErrors.length === 0) return;

    globalErrors = [];
    updateCachedCombinedErrors();
    errorsListeners.forEach((listener) => listener());

    const hasError = cachedErrorItems.length > 0;
    if (hasError !== prevIsError) {
      prevIsError = hasError;
      isErrorListeners.forEach((listener) => listener());
    }
  };

  const updateBatchProgress = () => {
    const newProgress = calculateBatchProgress(items);

    // progress 변경 체크
    if (
      newProgress.percentage !== batchProgress.percentage ||
      newProgress.count?.current !== batchProgress.count?.current ||
      newProgress.count?.total !== batchProgress.count?.total ||
      newProgress.isUploading !== batchProgress.isUploading
    ) {
      // isUploading 변경 체크 (완료 시 아이템 정리)
      if (batchProgress.isUploading && !newProgress.isUploading) {
        items.forEach((_, i) => {
          items[i] = { ...items[i], progress: undefined };
          notifyItem(i);
        });
      }

      const isUploadingChanged = newProgress.isUploading !== batchProgress.isUploading;
      batchProgress = newProgress;
      progressListeners.forEach((listener) => listener());

      if (isUploadingChanged) {
        isUploadingListeners.forEach((listener) => listener());
      }
    }
  };

  const updateErrorItems = () => {
    const newErrors = calculateErrorItems(items);

    const errorsChanged =
      newErrors.length !== cachedErrorItems.length ||
      newErrors.some((newError, index) => {
        const cachedError = cachedErrorItems[index];
        return newError.index !== cachedError?.index || newError.item !== cachedError?.item;
      });

    if (errorsChanged) {
      cachedErrorItems = newErrors;
      updateCachedCombinedErrors();
      errorsListeners.forEach((listener) => listener());
    }

    // isError 변경 체크
    const hasError = globalErrors.length > 0 || cachedErrorItems.length > 0;
    if (hasError !== prevIsError) {
      prevIsError = hasError;
      isErrorListeners.forEach((listener) => listener());
    }
  };

  const updateCaches = () => {
    updateBatchProgress();
    updateErrorItems();
  };

  return {
    // 개별 아이템 구독
    subscribeItem: (index: number, listener: Listener) => {
      if (!itemListeners.has(index)) {
        itemListeners.set(index, new Set());
      }
      const listeners = itemListeners.get(index);
      if (listeners) {
        listeners.add(listener);
      }
      return () => {
        itemListeners.get(index)?.delete(listener);
      };
    },

    getItem: (index: number) => items[index],

    setItem: (index: number, itemOrUpdater: Item<T> | ((prev: Item<T>) => Item<T>)) => {
      const currentItem = items[index];
      if (!currentItem) return;

      items[index] = typeof itemOrUpdater === 'function' ? itemOrUpdater(currentItem) : itemOrUpdater;
      notifyItem(index);
      updateCaches();
    },

    // 전체 목록 구독
    subscribe: createSubscriber(globalListeners),

    getItems: () => items,
    getLength: () => items.length,

    // progress 구독
    subscribeProgress: createSubscriber(progressListeners),
    getProgress: () => manualProgress ?? batchProgress,
    setProgress: (progress: Progress | null) => {
      const wasUploading = checkIsItemUploading(manualProgress) || batchProgress.isUploading === true;
      manualProgress = progress;
      progressListeners.forEach((listener) => listener());

      const nowUploading = checkIsItemUploading(manualProgress) || batchProgress.isUploading === true;
      if (wasUploading !== nowUploading) {
        isUploadingListeners.forEach((listener) => listener());
      }
    },

    // isUploading 구독
    subscribeIsUploading: createSubscriber(isUploadingListeners),
    getIsUploading: () => isProcessing || checkIsItemUploading(manualProgress) || batchProgress.isUploading === true,
    setIsProcessing: (value: boolean) => {
      if (isProcessing === value) return;
      isProcessing = value;
      isUploadingListeners.forEach((listener) => listener());
    },

    // errors 구독
    subscribeErrors: createSubscriber(errorsListeners),
    getErrors: () => cachedErrorItems,
    getGlobalErrors: () => cachedCombinedErrors,

    // isError 구독
    subscribeIsError: createSubscriber(isErrorListeners),
    getIsError: () => globalErrors.length > 0 || cachedErrorItems.length > 0,

    // 전역 에러 추가
    addGlobalError: (error: FileUploaderError) => {
      const wasError = globalErrors.length > 0 || cachedErrorItems.length > 0;
      globalErrors = [...globalErrors, error];
      updateCachedCombinedErrors();
      errorsListeners.forEach((listener) => listener());

      // isError 변경 체크
      const hasError = globalErrors.length > 0 || cachedErrorItems.length > 0;
      if (hasError !== wasError) {
        prevIsError = hasError;
        isErrorListeners.forEach((listener) => listener());
      }
    },

    // 전역 에러 클리어
    clearGlobalErrors,

    // 아이템 추가
    addItems: (newItems: Item<T>[]) => {
      items = [...items, ...newItems];
      notifyGlobal();
      updateCaches();
    },

    // 아이템 삭제
    removeItem: (index: number) => {
      items = items.filter((_, i) => i !== index);

      // 리스너 인덱스 시프트 (삭제된 인덱스 제외, 큰 인덱스는 -1)
      const newListeners = new Map<number, Set<Listener>>();
      itemListeners.forEach((listeners, i) => {
        if (i === index) return; // 삭제 대상 제외
        newListeners.set(i > index ? i - 1 : i, listeners);
      });
      itemListeners.clear();
      newListeners.forEach((listeners, i) => {
        itemListeners.set(i, listeners);
      });

      notifyGlobal();
      itemListeners.forEach((listeners) => {
        listeners.forEach((listener) => listener());
      });
      updateCaches();
    },

    // 전체 리셋
    reset: (newItems: Item<T>[] = []) => {
      items = [...newItems];
      notifyGlobal();
      itemListeners.forEach((listeners) => {
        listeners.forEach((listener) => listener());
      });
      updateCaches();
    },
  };
};
