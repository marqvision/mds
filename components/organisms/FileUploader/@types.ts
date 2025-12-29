import React from 'react';
import { ERROR_CODE, FILE_CATEGORY, FILE_TYPE } from './@constants';

type WithTitle<T> = T & { title: React.ReactNode; language?: never };
type WithLanguage<T> = T & { language?: Language; title?: never };
export type TitleOrLanguage<TitleProps = unknown, LanguageProps = unknown> =
  | WithTitle<TitleProps>
  | WithLanguage<LanguageProps>;

export type Progress = {
  count?: { current: number; total: number };
  percentage?: number;
  isUploading?: boolean;
};
export type Language = 'en' | 'ko';
export type LabelType = string | { main?: string; sub?: React.ReactNode; right?: React.ReactNode };

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
export type FileType = keyof typeof FILE_TYPE;
export type FileCategory = keyof typeof FILE_CATEGORY;
export type AcceptType = FileType | FileCategory;

export type FileData = {
  file?: File;
  url: string;
  fileName: string;
};
export type ErrorData = {
  code: ErrorCode;
  message: string;
};

export type Item<T extends FileData = FileData> = {
  data: T;
  progress?: Progress;
  error?: ErrorData;
};

export type Value<T extends FileData = FileData> = Item<T> | Item<T>[];

export type DropData<T extends FileData = FileData> = {
  key?: string;
  items: Item<T>[];
};

export type GridItemProps = {
  isReadonly?: boolean;
  isDisabled?: boolean;
  action?: React.ReactNode;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
};

export type PlaceholderProps = {
  icon?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
} & TitleOrLanguage<{ onAdd?: never }, { onAdd: React.MouseEventHandler<HTMLButtonElement> }>;

export type ErrorItem<T extends FileData = FileData> = { index: number; item: Item<T> };

export type FileUploaderError = ErrorData & {
  files?: File[];
  index?: number;
};

export type ValidationError = {
  code: ErrorCode;
  files: File[];
  params?: Record<string, string | number>;
};

export type Listener = () => void;

export type DerivedState<T extends FileData = FileData> = {
  progress: Progress;
  isUploading: boolean;
  errors: ErrorItem<T>[];
};

export type FileUploaderStore<T extends FileData = FileData> = {
  // 개별 아이템 구독
  subscribeItem: (index: number, listener: Listener) => () => void;
  getItem: (index: number) => Item<T> | undefined;
  setItem: (index: number, item: Item<T> | ((prev: Item<T>) => Item<T>)) => void;

  // 전체 목록 구독
  subscribe: (listener: Listener) => () => void;
  getItems: () => Item<T>[];
  getLength: () => number;

  // 파생 상태 구독 (progress, isUploading, errors)
  subscribeProgress: (listener: Listener) => () => void;
  getProgress: () => Progress;

  subscribeIsUploading: (listener: Listener) => () => void;
  getIsUploading: () => boolean;

  // 배치 progress 직접 설정
  getBatchProgress: () => Progress | null;
  setBatchProgress: (progress: Progress | null) => void;

  subscribeErrors: (listener: Listener) => () => void;
  getErrors: () => ErrorItem<T>[];
  getGlobalErrors: () => FileUploaderError[];

  // isError 구독
  subscribeIsError: (listener: Listener) => () => void;
  getIsError: () => boolean;

  // 전역 에러 설정
  addGlobalError: (error: FileUploaderError) => void;
  clearGlobalErrors: () => void;

  // 아이템 추가/삭제
  addItems: (items: Item<T>[]) => void;
  removeItem: (index: number) => void;
  reset: (items?: Item<T>[]) => void;
};

export type UseFileUploaderOptions<Multiple extends boolean = true, T extends FileData = FileData> = {
  defaultValue?: Multiple extends true ? Item<T>[] : Item<T>;
  /** 허용할 파일 타입 (예: 'jpg', 'image', ['jpg', 'png', 'gif']) */
  accept?: AcceptType | AcceptType[];
  /** 최대 아이템 개수 (1이면 단일 파일 모드) */
  limit?: number;
  /** 개별 파일 최대 크기 (bytes) */
  maxFileSize?: number;
  /** presigned URL을 받아오는 함수 (있으면 자동 업로드) */
  getPresignedUrl?: (fileName: string) => Promise<string>;
  /** Item 객체 drop 허용 key (설정하면 해당 key만 허용, 파일 drop은 항상 허용) */
  dropKey?: string;
  /** 파일 업로드 비활성화 여부 */
  isDisabled?: boolean;
  /** 언어 (기본값: 'en') */
  language?: Language;
  /** 아이템 변경 시 콜백 */
  onChange?: (value: Multiple extends true ? Item<T>[] : Item<T>) => void;
  /** 업로드 완료 시 콜백 */
  onUploadComplete?: (index: number, url: string) => void;
  /** 에러 발생 시 콜백 (`false`: 기본 이벤트 실행 방지) */
  onError?: ((error: FileUploaderError) => void) | false;
};

export type DropzoneHandlers = {
  onDrop: React.DragEventHandler<HTMLDivElement>;
  onDragOver: React.DragEventHandler<HTMLDivElement>;
  onDragLeave: React.DragEventHandler<HTMLDivElement>;
  onPaste: React.ClipboardEventHandler<HTMLDivElement>;
};

export type UseFileUploaderReturn<Multiple extends boolean = true, T extends FileData = FileData> = {
  /** store (useMDSFileUploaderState에서 사용) */
  store: FileUploaderStore<T>;
  /** 값 (multiple: false면 Item, true면 Item[]) */
  value: Multiple extends true ? Item<T>[] : Item<T> | undefined;
  /** 아이템 개수 */
  length: number;
  /** 업로드 진행 중 여부 */
  isUploading: boolean;
  /** 아이템 업데이트 */
  setValue: Multiple extends true
    ? (index: number, item: Item<T> | ((prev: Item<T>) => Item<T>)) => void
    : (item: Item<T> | ((prev: Item<T>) => Item<T>)) => void;
  /** progress 업데이트 */
  setProgress: Multiple extends true
    ? {
        (index: number, progress: Progress | undefined): void;
        (progress: Progress | null): void;
      }
    : (progress: Progress | null) => void;
  /** error 상태 업데이트 */
  setError: Multiple extends true ? (index: number, error?: ErrorCode) => void : (error?: ErrorCode) => void;
  /** 파일 선택창 열어서 아이템 추가 */
  add: () => void;
  /** 아이템 삭제 */
  remove: Multiple extends true ? (index: number) => void : () => void;
  /** 전체 리셋 */
  reset: (value?: Multiple extends true ? Item<T>[] : Item<T>) => void;
  /** Dropzone 이벤트 핸들러 (onDrop, onDragOver, onDragLeave, onPaste) */
  dropzoneHandlers: DropzoneHandlers;
  /** 에러 유무 */
  isError: boolean;
  /** progress 클리어 (index 없으면 전체) */
  clearProgress: Multiple extends true ? (index?: number) => void : () => void;
  /** error 클리어 (index 없으면 전체 아이템 error + 전역 globalError) */
  clearError: Multiple extends true ? (index?: number) => void : () => void;
};
