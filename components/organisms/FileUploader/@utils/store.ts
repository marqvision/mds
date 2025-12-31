import {
  DerivedState,
  ErrorItem,
  FileData,
  FileUploaderError,
  FileUploaderStore,
  Item,
  Listener,
  Progress,
} from '../@types';

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

export const calculateDerivedState = <T extends FileData = FileData>(items: Item<T>[]): DerivedState<T> => {
  const errorItems: ErrorItem<T>[] = items.map((item, index) => ({ index, item })).filter(({ item }) => item.error);

  if (items.length === 0) {
    return {
      progress: { count: { current: 0, total: 0 }, percentage: 0, isUploading: false },
      isUploading: false,
      errors: [],
    };
  }

  // progress가 있는 아이템 = 현재 배치에 포함된 아이템
  const batchItems = items.filter((item) => item.progress !== undefined);

  // 아직 업로드 중인 아이템
  const activeItems = batchItems.filter((item) => checkIsItemUploading(item.progress));
  const isUploading = activeItems.length > 0;

  // 배치가 없거나 모든 업로드가 완료되면 초기화
  if (batchItems.length === 0 || !isUploading) {
    return {
      progress: { count: { current: 0, total: 0 }, percentage: 0, isUploading: false },
      isUploading: false,
      errors: errorItems,
    };
  }

  // 완료된 아이템 수
  const completedCount = batchItems.filter((item) => checkIsItemCompleted(item.progress)).length;

  // 전체 진행률 계산
  const percentage = Math.round(
    batchItems.reduce((sum, item) => sum + (item.progress?.percentage ?? 0), 0) / batchItems.length
  );

  const progress: Progress = {
    count: { current: completedCount, total: batchItems.length },
    percentage,
    isUploading: true,
  };

  return { progress, isUploading: true, errors: errorItems };
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
  let batchProgress: Progress | null = null;
  let cachedCombinedErrors: FileUploaderError[] = [];
  const derivedState: DerivedState<T> = calculateDerivedState(items);

  const itemListeners = new Map<number, Set<Listener>>();
  const globalListeners = new Set<Listener>();
  const progressListeners = new Set<Listener>();
  const isUploadingListeners = new Set<Listener>();
  const errorsListeners = new Set<Listener>();
  const isErrorListeners = new Set<Listener>();
  let prevIsError = globalErrors.length > 0 || derivedState.errors.length > 0;

  // combinedErrors 캐시 업데이트
  const updateCachedCombinedErrors = () => {
    const itemErrors: FileUploaderError[] = derivedState.errors.map(({ index, item }) => ({
      ...item.error!,
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

    const hasError = derivedState.errors.length > 0;
    if (hasError !== prevIsError) {
      prevIsError = hasError;
      isErrorListeners.forEach((listener) => listener());
    }
  };

  const updateDerivedState = () => {
    const newState = calculateDerivedState(items);

    // progress 변경 체크
    if (
      newState.progress.percentage !== derivedState.progress.percentage ||
      newState.progress.count?.current !== derivedState.progress.count?.current ||
      newState.progress.count?.total !== derivedState.progress.count?.total ||
      newState.progress.isUploading !== derivedState.progress.isUploading
    ) {
      derivedState.progress = newState.progress;
      progressListeners.forEach((listener) => listener());
    }

    // isUploading 변경 체크
    if (newState.isUploading !== derivedState.isUploading) {
      // 완료 시 모든 아이템의 progress를 undefined로 정리
      if (derivedState.isUploading && !newState.isUploading) {
        items.forEach((_, i) => {
          items[i] = { ...items[i], progress: undefined };
          notifyItem(i);
        });
      }
      derivedState.isUploading = newState.isUploading;
      isUploadingListeners.forEach((listener) => listener());
    }

    // errors 변경 체크 (길이와 index 비교)
    const errorsChanged =
      newState.errors.length !== derivedState.errors.length ||
      newState.errors.some((e, i) => e.index !== derivedState.errors[i]?.index);

    if (errorsChanged) {
      derivedState.errors = newState.errors;
      updateCachedCombinedErrors();
      errorsListeners.forEach((listener) => listener());
    }

    // isError 변경 체크
    const hasError = globalErrors.length > 0 || derivedState.errors.length > 0;
    if (hasError !== prevIsError) {
      prevIsError = hasError;
      isErrorListeners.forEach((listener) => listener());
    }
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
      updateDerivedState();
    },

    // 전체 목록 구독
    subscribe: createSubscriber(globalListeners),

    getItems: () => items,
    getLength: () => items.length,

    // progress 구독
    subscribeProgress: createSubscriber(progressListeners),
    getProgress: () => batchProgress ?? derivedState.progress,

    // isUploading 구독
    subscribeIsUploading: createSubscriber(isUploadingListeners),
    getIsUploading: () => checkIsItemUploading(batchProgress) || derivedState.isUploading,

    // 배치 progress 직접 설정
    getBatchProgress: () => batchProgress,
    setBatchProgress: (progress: Progress | null) => {
      const wasUploading = checkIsItemUploading(batchProgress) || derivedState.isUploading;
      batchProgress = progress;
      progressListeners.forEach((listener) => listener());

      const nowUploading = checkIsItemUploading(batchProgress) || derivedState.isUploading;
      if (wasUploading !== nowUploading) {
        isUploadingListeners.forEach((listener) => listener());
      }
    },

    // errors 구독
    subscribeErrors: createSubscriber(errorsListeners),
    getErrors: () => derivedState.errors,
    getGlobalErrors: () => cachedCombinedErrors,

    // isError 구독
    subscribeIsError: createSubscriber(isErrorListeners),
    getIsError: () => globalErrors.length > 0 || derivedState.errors.length > 0,

    // 전역 에러 추가
    addGlobalError: (error: FileUploaderError) => {
      const wasError = globalErrors.length > 0 || derivedState.errors.length > 0;
      globalErrors = [...globalErrors, error];
      updateCachedCombinedErrors();
      errorsListeners.forEach((listener) => listener());

      // isError 변경 체크
      const hasError = globalErrors.length > 0 || derivedState.errors.length > 0;
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
      updateDerivedState();
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
      updateDerivedState();
    },

    // 전체 리셋
    reset: (newItems: Item<T>[] = []) => {
      items = [...newItems];
      notifyGlobal();
      itemListeners.forEach((listeners) => {
        listeners.forEach((listener) => listener());
      });
      updateDerivedState();
    },
  };
};
