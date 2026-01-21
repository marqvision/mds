import React from 'react';
import isEqual from 'lodash/isEqual';
import { MDSSnackbar } from '../../Snackbar';
import {
  ERROR_CODE,
  ERROR_MESSAGE,
  FILE_CATEGORY,
  FILE_TYPE,
  IMAGE_EXTENSIONS,
  IMAGE_HEADER_MAP,
  VERIFY_MIME_TYPES,
} from '../@constants';
import {
  AcceptType,
  DropData,
  ErrorCode,
  ErrorData,
  FileCategory,
  FileData,
  FileType,
  FileUploaderError,
  FileUploaderStore,
  Item,
  Language,
  ValidationError,
} from '../@types';

/** 파일을 S3에 업로드하는 함수 (progress 콜백 지원) */
export const uploadFileToS3 = async (
  file: File,
  uploadUrl: string,
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

    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};

/** URL에서 query string 제거 */
export const getBaseUrl = (url: string): string => {
  return url.split('?')[0];
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

export const toastMDSSnackbarError = (error: FileUploaderError) => MDSSnackbar({ type: 'error', title: error.message });

export const getErrorData = (language: Language, code?: ErrorCode): ErrorData | undefined => {
  if (!code) return undefined;
  return { code, message: ERROR_MESSAGE[code]()[language] };
};

export const getNormalizedValue = <T extends FileData = FileData>(value?: Item<T> | Item<T>[]): Item<T>[] => {
  return value ? (Array.isArray(value) ? value : [value]) : [];
};

/** 외부에서 주입하는 value 변경 확인 */
export const getIsValueEqual = <T extends FileData = FileData>(
  value: Item<T>[],
  store: FileUploaderStore<T>
): boolean => {
  return isEqual(
    value.map(({ data: { url } }) => url),
    store.getItems().map(({ data: { url } }) => url)
  );
};
