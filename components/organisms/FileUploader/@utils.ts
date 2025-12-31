import React from 'react';
import { MDSSnackbar } from '../Snackbar';
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  FILE_CATEGORY,
  FILE_TYPE,
  IMAGE_EXTENSIONS,
  IMAGE_HEADER_MAP,
  VERIFY_MIME_TYPES,
} from './@constants';
import {
  AcceptType,
  DerivedState,
  DropData,
  ErrorCode,
  ErrorData,
  ErrorItem,
  FileCategory,
  FileData,
  FileType,
  FileUploaderError,
  FileUploaderStore,
  Item,
  Language,
  Listener,
  Progress,
  ValidationError,
} from './@types';

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

/** 파일을 S3에 업로드하는 함수 (progress 콜백 지원) */
export const uploadFileToS3 = async (
  file: File,
  presignedUrl: string,
  onProgress?: (percentage: number) => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = Math.round((event.loaded / event.total) * 100);
        onProgress?.(percentage);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Upload failed with status ${xhr.status}`));
      }
    };

    xhr.onerror = () => reject(new Error('Upload failed'));

    xhr.open('PUT', presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};

/** presigned URL에서 query string 제거 */
export const getBaseUrl = (presignedUrl: string): string => {
  return presignedUrl.split('?')[0];
};

/** 드래그 시작 시 사용할 drop 데이터 생성 헬퍼 */
export const createDropData = <T extends FileData>(items: Item<T> | Item<T>[], key?: string): string => {
  return JSON.stringify({
    key,
    items: Array.isArray(items) ? items : [items],
  } satisfies DropData<T>);
};

/** 드래그 시작 시 drop 데이터 설정 (MIME 타입에 key 포함) */
export const setDropData = <T extends FileData>(
  event: React.DragEvent,
  items: Item<T> | Item<T>[],
  key?: string
): void => {
  const jsonData = createDropData(items, key);
  event.dataTransfer.setData('application/json', jsonData);
  if (key) {
    event.dataTransfer.setData(`application/x-dropkey-${key}`, '');
  }
};

/** Accept 타입을 mimetype 문자열 배열로 변환 */
export const convertAcceptToMimeTypes = (accept?: AcceptType | AcceptType[]): string[] => {
  if (!accept) return [];
  const types = Array.isArray(accept) ? accept : [accept];
  return types.map((type) => FILE_TYPE[type as FileType] ?? FILE_CATEGORY[type as FileCategory] ?? type);
};

/** Accept 타입을 input accept 속성 문자열로 변환 */
export const convertAcceptToInputAccept = (accept?: AcceptType | AcceptType[]): string | undefined => {
  if (!accept) return undefined;
  const mimeTypes = convertAcceptToMimeTypes(accept);
  return mimeTypes.join(',');
};

/** 파일 바이너리 헤더에서 실제 mimetype 추출 */
export const getMimeTypeFromHeader = async (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      if (!e.target?.result || typeof e.target.result === 'string') {
        resolve(undefined);
        return;
      }
      const arr = new Uint8Array(e.target.result).subarray(0, 4);
      const header = Array.from(arr, (n) => n.toString(16).padStart(2, '0')).join('');
      resolve(IMAGE_HEADER_MAP[header]);
    };
    reader.readAsArrayBuffer(file.slice(0, 4));
  });
};

/** 파일이 accept 타입에 맞는지 확인 (async - magic number 검증 포함) */
export const checkIsFileAccepted = async (file: File, accept?: AcceptType | AcceptType[]): Promise<boolean> => {
  if (!accept) return true;

  const mimeTypes = convertAcceptToMimeTypes(accept);

  // 카테고리 체크 (image/*, video/* 등)
  const categoryMatch = mimeTypes.some((type) => {
    if (type.endsWith('/*')) {
      const [category] = type.split('/');
      return file.type.startsWith(`${category}/`);
    }
    return false;
  });
  if (categoryMatch) return true;

  // 특정 mimetype 체크
  const targetMimeTypes = mimeTypes.filter((type) => !type.endsWith('/*'));
  if (targetMimeTypes.length === 0) return false;

  // 검증이 필요한 타입이 있는지 확인
  const needsVerification = targetMimeTypes.some((type) => VERIFY_MIME_TYPES.includes(type));

  if (needsVerification) {
    // jpg, png, gif는 magic number로 검증
    const actualMimeType = await getMimeTypeFromHeader(file);
    return actualMimeType !== undefined && targetMimeTypes.includes(actualMimeType);
  }

  // 그 외는 file.type으로 체크
  return targetMimeTypes.includes(file.type);
};

/** 파일 크기를 읽기 쉬운 형식으로 변환 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * 파일명에서 HTML 특수문자 이스케이프
 * 에러 메시지 파라미터에서 사용됨 (React 자동 이스케이프와 중복되나 방어적 코딩)
 */
export const sanitizeFileName = (fileName: string): string => {
  return fileName
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
};

/** URL이 Blob URL인지 확인 */
export const isBlobUrl = (url: string): boolean => {
  return url.startsWith('blob:');
};

/** Blob URL 정리 (메모리 해제) */
export const revokeBlobUrl = (url: string): void => {
  if (isBlobUrl(url)) {
    URL.revokeObjectURL(url);
  }
};

/** 파일명에서 확장자 추출 */
export const getExtensionFromFileName = (fileName: string): string | undefined => {
  const match = fileName.match(/\.([^.]+)$/);
  return match ? match[1].toLowerCase() : undefined;
};

/** FileData가 이미지인지 판단 (file.type 우선, 없으면 fileName 확장자로 판단) */
export const checkIsImage = (data: FileData): boolean => {
  // 1. file.type 우선
  if (data.file?.type) {
    return data.file.type.startsWith('image/');
  }
  // 2. fileName 확장자로 판단
  const ext = getExtensionFromFileName(data.fileName);
  return ext ? IMAGE_EXTENSIONS.includes(ext) : false;
};

/** 파일 목록 검증 (accept, size 체크) */
export const validateFiles = async (
  files: File[],
  options: { accept?: AcceptType | AcceptType[]; maxFileSize?: number }
): Promise<{
  valid: File[];
  errors: ValidationError[];
}> => {
  const { accept, maxFileSize } = options;

  const acceptResults = await Promise.all(
    files.map(async (file) => ({
      file,
      accepted: await checkIsFileAccepted(file, accept),
    }))
  );

  const accepted = acceptResults.filter((r) => r.accepted).map((r) => r.file);
  const invalidType = acceptResults.filter((r) => !r.accepted).map((r) => r.file);
  const empty = accepted.filter((f) => f.size === 0);
  const oversized = maxFileSize ? accepted.filter((f) => f.size > maxFileSize) : [];
  const valid = accepted.filter((f) => f.size > 0 && (!maxFileSize || f.size <= maxFileSize));

  // 에러 생성
  const errors: ValidationError[] = [];
  if (invalidType.length > 0) {
    errors.push({
      code: ERROR_CODE.INVALID_FILE_TYPE,
      files: invalidType,
      params: { filename: invalidType.map((f) => sanitizeFileName(f.name)).join(', ') },
    });
  }
  if (empty.length > 0) {
    errors.push({
      code: ERROR_CODE.EMPTY_FILE,
      files: empty,
      params: { filename: empty.map((f) => sanitizeFileName(f.name)).join(', ') },
    });
  }
  if (oversized.length > 0 && maxFileSize) {
    errors.push({
      code: ERROR_CODE.FILE_SIZE_EXCEEDED,
      files: oversized,
      params: { maxFileSize: formatFileSize(maxFileSize) },
    });
  }

  return { valid, errors };
};

/** subscribe 헬퍼 함수 생성 */
const createSubscriber = (listeners: Set<Listener>) => (listener: Listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** 드래그 중인 데이터가 드롭 가능한지 확인 (동기 - DataTransfer 기반) */
export const checkIsDroppable = (
  event: React.DragEvent,
  accept?: AcceptType | AcceptType[],
  dropKey?: string
): boolean => {
  const types = event.dataTransfer?.types || [];

  // JSON 데이터 (Item 객체) 드롭
  if (types.includes('application/json')) {
    if (!dropKey) return true; // dropKey 없으면 모든 JSON 허용

    // dropKey 검증: MIME 타입에서 key 확인
    const keyType = types.find((t) => t.startsWith('application/x-dropkey-'));
    if (!keyType) return false; // key 없는 JSON은 거부

    const dragKey = keyType.replace('application/x-dropkey-', '');
    return dragKey === dropKey; // key 일치 시에만 허용
  }

  // 파일이 없으면 드롭 불가
  if (!types.includes('Files')) return false;

  // accept가 없으면 모든 파일 허용
  if (!accept) return true;

  // DataTransfer.items에서 파일 타입 확인
  const items = event.dataTransfer?.items;
  if (!items || items.length === 0) return true; // items가 없으면 일단 허용

  const mimeTypes = convertAcceptToMimeTypes(accept);

  // 드래그 중인 모든 파일이 accept에 맞는지 확인
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.kind !== 'file') continue;

    const itemType = item.type;
    if (!itemType) continue; // 타입을 알 수 없으면 일단 통과

    // 카테고리 체크 (image/*, video/* 등)
    const categoryMatch = mimeTypes.some((type) => {
      if (type.endsWith('/*')) {
        const [category] = type.split('/');
        return itemType.startsWith(`${category}/`);
      }
      return false;
    });
    if (categoryMatch) continue;

    // 특정 mimetype 체크
    const specificTypes = mimeTypes.filter((type) => !type.endsWith('/*'));
    if (specificTypes.length > 0 && !specificTypes.includes(itemType)) {
      return false;
    }
  }

  return true;
};

/** DropData 구조 런타임 검증 (타입 가드) */
export const isValidDropData = <T extends FileData>(data: unknown): data is DropData<T> => {
  if (!data || typeof data !== 'object') return false;
  const obj = data as Record<string, unknown>;

  // items 배열 필수
  if (!Array.isArray(obj.items)) return false;

  // 각 item 검증
  return obj.items.every((item) => {
    if (!item || typeof item !== 'object') return false;
    const itemObj = item as Record<string, unknown>;

    // data 객체 필수
    if (!itemObj.data || typeof itemObj.data !== 'object') return false;
    const dataObj = itemObj.data as Record<string, unknown>;

    // url, fileName 필수
    return typeof dataObj.url === 'string' && typeof dataObj.fileName === 'string';
  });
};

/** 파일을 Item 객체로 변환 */
export const createItemFromFile = (file: File, hasPresignedUrl: boolean): Item => ({
  data: {
    file,
    url: '',
    fileName: sanitizeFileName(file.name),
  },
  progress: hasPresignedUrl ? { percentage: 0, isUploading: true } : undefined,
});

export const toastMDSSnackbarError = (error: FileUploaderError) =>
  MDSSnackbar({ type: 'error', title: error.message });

export const getErrorData = (language: Language, code?: ErrorCode): ErrorData | undefined => {
  if (!code) return undefined;
  return { code, message: ERROR_MESSAGE[code]()[language] };
};
