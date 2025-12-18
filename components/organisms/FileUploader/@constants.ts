import { ErrorCode, Language } from './@types';

export const TRANSITION_TIMING = '225ms';
export const DEFAULT_COLUMN = 3;

// 개별 파일 타입
export const FILE_TYPE = {
  // 이미지
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif',
  webp: 'image/webp',
  svg: 'image/svg+xml',
  // 문서
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // 압축
  zip: 'application/zip',
  // 텍스트
  csv: 'text/csv',
  txt: 'text/plain',
} as const;

// 카테고리 타입
export const FILE_CATEGORY = {
  image: 'image/*',
  video: 'video/*',
  audio: 'audio/*',
  text: 'text/*',
  application: 'application/*',
} as const;

// magic number로 검증할 이미지 타입 매핑
export const IMAGE_HEADER_MAP: Record<string, string> = {
  '89504e47': 'image/png',
  ffd8ffe0: 'image/jpeg',
  ffd8ffe1: 'image/jpeg',
  ffd8ffe2: 'image/jpeg',
  ffd8ffe3: 'image/jpeg',
  ffd8ffe8: 'image/jpeg',
  ffd8ffdb: 'image/jpeg',
  '47494638': 'image/gif',
};

// magic number 검증이 필요한 mimetype
export const VERIFY_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'];

export const ERROR_CODE = {
  UPLOAD_FAILED: 'UPLOAD_FAILED',
  LIMIT_EXCEEDED: 'LIMIT_EXCEEDED',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  INVALID_DROP_KEY: 'INVALID_DROP_KEY',
  FILE_SIZE_EXCEEDED: 'FILE_SIZE_EXCEEDED',
  EMPTY_FILE: 'EMPTY_FILE',
} as const;

export const ERROR_MESSAGE: Record<ErrorCode, (params?: Record<string, string | number>) => Record<Language, string>> = {
  UPLOAD_FAILED: () => ({
    en: 'An error occurred. Please try again.',
    ko: '오류가 발생했습니다. 다시 시도해주세요.',
  }),
  LIMIT_EXCEEDED: (params) => ({
    en: `A maximum of ${params?.limit} ${params?.limit === 1 ? 'file' : 'files'} can be attached.`,
    ko: `최대 ${params?.limit}개의 파일까지 첨부할 수 있습니다.`,
  }),
  INVALID_FILE_TYPE: (params) => ({
    en: params?.filename
      ? `"${params.filename}" is not an allowed file type.`
      : 'This file type is not allowed.',
    ko: params?.filename
      ? `"${params.filename}" 파일은 허용되지 않는 형식입니다.`
      : '허용되지 않는 파일 형식입니다.',
  }),
  INVALID_DROP_KEY: () => ({
    en: 'This item cannot be dropped here.',
    ko: '이 항목은 여기에 추가할 수 없습니다.',
  }),
  FILE_SIZE_EXCEEDED: (params) => ({
    en: `The file exceeds ${params?.maxFileSize ?? ''}`,
    ko: `파일크기는 ${params?.maxFileSize ?? ''}를 넘지 않아야 합니다.`,
  }),
  EMPTY_FILE: (params) => ({
    en: `"${params?.filename ?? ''}" was not uploaded because it is empty (0KB).`,
    ko: `"${params?.filename ?? ''}" 파일은 0KB로 비어 있어 업로드되지 않았습니다.`,
  }),
};

export const DEFAULT_DISPLAY_MESSAGE = {
  en: {
    dragAndDrop: 'Drag and drop or',
    browse: 'Browse',
    disabled: 'Drag and drop unavailable',
    uploadingFiles: 'Uploading file...',
  },
  ko: {
    dragAndDrop: '파일을 끌어서 놓거나',
    browse: '선택해주세요',
    disabled: '비활성화됨: 이 필드는 수정할 수 없습니다',
    uploadingFiles: '파일 업로드 중...',
  },
} satisfies Record<Language, Record<string, string>>;

export const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];