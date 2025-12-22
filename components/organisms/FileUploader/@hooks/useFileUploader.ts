import React, { useCallback, useMemo, useRef, useSyncExternalStore } from 'react';
import { ERROR_CODE, ERROR_MESSAGE } from '../@constants';
import {
  DropzoneHandlers,
  ErrorCode,
  FileData,
  FileUploaderError,
  FileUploaderStore,
  Item,
  Progress,
  UseFileUploaderOptions,
  UseFileUploaderReturn,
} from '../@types';
import {
  checkIsDroppable,
  convertAcceptToInputAccept,
  createFileUploaderStore,
  createItemFromFile,
  createValidationErrors,
  getBaseUrl,
  isValidDropData,
  revokeBlobUrl,
  uploadFileToS3,
  validateFiles,
} from '../@utils';

// 오버로드 시그니처
export function useFileUploader(): UseFileUploaderReturn<true, FileData>;
export function useFileUploader<T extends FileData>(
  options: Omit<UseFileUploaderOptions<false, T>, 'limit'> & { limit: 1 }
): UseFileUploaderReturn<false, T>;
export function useFileUploader<T extends FileData>(
  options: UseFileUploaderOptions<true, T>
): UseFileUploaderReturn<true, T>;

// 구현
export function useFileUploader<T extends FileData = FileData>(
  options: UseFileUploaderOptions<true, T> | (Omit<UseFileUploaderOptions<false, T>, 'limit'> & { limit: 1 }) = {}
): UseFileUploaderReturn<boolean, T> {
  const {
    defaultValue,
    accept,
    limit,
    maxFileSize,
    getPresignedUrl,
    dropKey,
    isDisabled,
    onChange,
    onUploadComplete,
    onError,
  } = options;

  const multiple = limit !== 1;

  // defaultValue를 Item[]로 정규화
  const normalizedDefaultValue = useRef<Item<T>[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );

  // store는 한 번만 생성
  const storeRef = useRef<FileUploaderStore<T>>();
  if (!storeRef.current) {
    storeRef.current = createFileUploaderStore<T>(normalizedDefaultValue.current);
  }
  const store = storeRef.current;

  // 파일 추가 처리 중 플래그 (경합 조건 방지)
  const isProcessingRef = useRef(false);

  // 내부에서 사용할 getValue 헬퍼
  const getValue = useCallback((items: Item<T>[]) => (multiple ? items : items[0]), [multiple]);

  // onChange 호출 헬퍼
  const notifyChange = useCallback(
    (items: Item<T>[]) => {
      (onChange as ((value: Item<T> | Item<T>[]) => void) | undefined)?.(getValue(items));
    },
    [onChange, getValue]
  );

  // 에러 발생 헬퍼
  const raiseError = useCallback(
    (error: Omit<FileUploaderError, 'message'> & { params?: Record<string, string | number> }) => {
      const { params, ...rest } = error;
      const fullError: FileUploaderError = {
        ...rest,
        message: ERROR_MESSAGE[error.code](params),
      };
      store.setGlobalError(fullError);
      onError?.(fullError);
    },
    [store, onError]
  );

  // error 클리어 (index 없으면 전체 아이템 error + 전역 globalError)
  const clearError = useCallback(
    (index?: number) => {
      if (index !== undefined) {
        store.setItem(index, (prev) => ({ ...prev, error: undefined }));
      } else {
        store.getItems().forEach((_, i) => {
          store.setItem(i, (prev) => ({ ...prev, error: undefined }));
        });
        store.setGlobalError(null);
      }
      notifyChange(store.getItems());
    },
    [store, notifyChange]
  );

  // isError 구독 (boolean 변경 시에만 리렌더)
  const isError = useSyncExternalStore(store.subscribeIsError, store.getIsError, store.getIsError);

  // isUploading 구독 (boolean 변경 시에만 리렌더)
  const isUploading = useSyncExternalStore(store.subscribeIsUploading, store.getIsUploading, store.getIsUploading);

  // 전체 목록 구독 (아이템 추가/삭제만 감지)
  const length = useSyncExternalStore(store.subscribe, store.getLength, store.getLength);

  // value는 length 변경 시에만 재계산 (개별 item progress 변경 시 리렌더 안 됨)
  const value = useMemo(() => getValue(store.getItems()), [store, length, getValue]);

  // 아이템 업데이트 (내부 구현)
  const setValueAt = useCallback(
    (index: number, item: Item<T> | ((prev: Item<T>) => Item<T>)) => {
      store.setItem(index, item);
      notifyChange(store.getItems());
    },
    [store, notifyChange]
  );

  // 아이템 업데이트 헬퍼 (multiple에 따라 시그니처 변경)
  const setValue = useMemo(
    () => (multiple ? setValueAt : (item: Item<T> | ((prev: Item<T>) => Item<T>)) => setValueAt(0, item)),
    [multiple, setValueAt]
  );

  // progress 업데이트 헬퍼 (index 있으면 개별, 없으면 배치)
  const setProgress = useMemo(() => {
    if (multiple) {
      return (indexOrProgress: number | Progress | null, progress?: Progress | undefined) => {
        if (typeof indexOrProgress === 'number') {
          setValueAt(indexOrProgress, (prev) => ({ ...prev, progress }));
        } else {
          store.setBatchProgress(indexOrProgress);
        }
      };
    } else {
      return (progress: Progress | null) => {
        store.setBatchProgress(progress);
      };
    }
  }, [multiple, setValueAt, store]);

  // error 상태 업데이트 헬퍼 (multiple에 따라 시그니처 변경)
  const setError = useMemo(
    () =>
      multiple
        ? (index: number, error?: ErrorCode) => setValueAt(index, (prev) => ({ ...prev, error }))
        : (error?: ErrorCode) => setValueAt(0, (prev) => ({ ...prev, error })),
    [multiple, setValueAt]
  );

  // 아이템 삭제
  const remove = useCallback(
    (index: number) => {
      const targetIndex = index > 0 ? index : 0;
      const item = store.getItem(targetIndex);
      if (item?.data.url) {
        revokeBlobUrl(item.data.url);
      }
      store.removeItem(targetIndex);
      notifyChange(store.getItems());
    },
    [store, notifyChange]
  );

  // 전체 리셋
  const reset = useCallback(
    (newValue?: Item<T> | Item<T>[]) => {
      store.getItems().forEach((item) => {
        revokeBlobUrl(item.data.url);
      });
      const newItems = newValue ? (Array.isArray(newValue) ? newValue : [newValue]) : undefined;
      store.reset(newItems);
      notifyChange(store.getItems());
    },
    [store, notifyChange]
  );

  // progress 클리어 (index 없으면 전체)
  const clearProgress = useCallback(
    (index?: number) => {
      if (index !== undefined) {
        store.setItem(index, (prev) => ({ ...prev, progress: undefined }));
      } else {
        store.getItems().forEach((_, i) => {
          store.setItem(i, (prev) => ({ ...prev, progress: undefined }));
        });
      }
      notifyChange(store.getItems());
    },
    [store, notifyChange]
  );

  // 아이템 추가 공통 로직 (limit 체크 + multiple 분기)
  const applyItems = useCallback(
    (newItems: Item<T>[]): { added: Item<T>[]; rejected: Item<T>[]; startIndex: number } => {
      const availableSlots = limit ? Math.max(0, limit - store.getLength()) : newItems.length;
      const itemsToAdd = newItems.slice(0, availableSlots);
      const rejectedItems = newItems.slice(availableSlots);

      if (itemsToAdd.length === 0) return { added: [], rejected: rejectedItems, startIndex: 0 };

      const startIndex = store.getLength();
      if (multiple) {
        store.addItems(itemsToAdd);
      } else {
        store.reset(itemsToAdd.slice(0, 1));
      }
      notifyChange(store.getItems());
      return { added: multiple ? itemsToAdd : itemsToAdd.slice(0, 1), rejected: rejectedItems, startIndex };
    },
    [multiple, limit, store, notifyChange]
  );

  // 단일 파일 업로드 처리
  const uploadFile = useCallback(
    async (file: File, index: number) => {
      if (!getPresignedUrl) return;

      try {
        const finalUrl = await (async () => {
          const presignedUrl = await getPresignedUrl(file.name);

          await uploadFileToS3(file, presignedUrl, (percentage) => {
            if (!store.getItem(index)) return;
            store.setItem(index, (prev) => ({ ...prev, progress: { percentage, isUploading: true } }));
            notifyChange(store.getItems());
          });

          return getBaseUrl(presignedUrl);
        })();

        if (!store.getItem(index)) return;

        store.setItem(index, (prev) => ({
          ...prev,
          data: { ...prev.data, url: finalUrl },
          progress: { percentage: 100, isUploading: false },
        }));
        notifyChange(store.getItems());
        onUploadComplete?.(index, finalUrl);
      } catch (error) {
        if (!store.getItem(index)) return;

        store.setItem(index, (prev) => ({
          ...prev,
          error: ERROR_CODE.UPLOAD_FAILED,
          progress: { percentage: 0, isUploading: false },
        }));
        notifyChange(store.getItems());
        raiseError({ code: ERROR_CODE.UPLOAD_FAILED, files: [file], index });
      }
    },
    [getPresignedUrl, store, notifyChange, onUploadComplete, raiseError]
  );

  // 파일 추가 공통 로직
  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      if (isProcessingRef.current) return;
      if (isDisabled || store.getProgress().isUploading) return;

      const fileArray = Array.from(files);
      if (fileArray.length === 0) return;

      // 처리 시작
      isProcessingRef.current = true;

      try {
        // 1. 파일 검증
        const validationResult = await validateFiles(fileArray, { accept, maxFileSize });

        // 2. 에러 리포트
        createValidationErrors(validationResult, maxFileSize).forEach(raiseError);

        const { valid } = validationResult;
        if (valid.length === 0) return;

        // 3. limit 초과 체크
        if (limit && store.getLength() + valid.length > limit) {
          raiseError({ code: ERROR_CODE.LIMIT_EXCEEDED, files: valid, params: { limit } });
          return;
        }

        // 4. Item 생성 및 적용
        const newItems = valid.map((file) => createItemFromFile(file, !!getPresignedUrl) as Item<T>);
        const { added, startIndex } = applyItems(newItems);

        // 5. 업로드 시작
        if (added.length > 0 && getPresignedUrl) {
          added.forEach((item, i) => {
            const index = multiple ? startIndex + i : 0;
            item.data.file && uploadFile(item.data.file, index);
          });
        }
      } finally {
        // 처리 완료
        isProcessingRef.current = false;
      }
    },
    [isDisabled, multiple, limit, maxFileSize, store, accept, applyItems, raiseError, getPresignedUrl, uploadFile]
  );

  // 파일 선택창 열기
  const add = useCallback(() => {
    if (isDisabled) return;
    if (store.getProgress().isUploading) return;

    const input = document.createElement('input');
    input.type = 'file';
    const inputAccept = convertAcceptToInputAccept(accept);
    if (inputAccept) input.accept = inputAccept;
    input.multiple = multiple;
    input.onchange = () => input.files && addFiles(input.files);
    input.click();
  }, [isDisabled, accept, multiple, store, addFiles]);

  // Item 객체 추가 (업로드 없이)
  const addItems = useCallback(
    (items: Item<T>[]) => {
      if (store.getProgress().isUploading) return;
      if (items.length === 0) return;
      applyItems(items);
    },
    [store, applyItems]
  );

  // Dropzone 이벤트 핸들러 (onDrop, onDragOver, onDragLeave, onPaste)
  const dropzoneHandlers: DropzoneHandlers = useMemo(
    () => ({
      onDrop: (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.currentTarget.classList.remove('isHighlighted');
        if (isDisabled || store.getIsUploading()) return;
        const jsonData = event.dataTransfer?.getData('application/json');
        if (jsonData) {
          try {
            const parsed: unknown = JSON.parse(jsonData);
            // 런타임 구조 검증
            if (!isValidDropData<T>(parsed)) {
              // 잘못된 구조면 무시하고 파일 드롭으로 처리
              event.dataTransfer?.files && addFiles(event.dataTransfer.files);
              return;
            }
            if (dropKey && parsed.key !== dropKey) {
              raiseError({ code: ERROR_CODE.INVALID_DROP_KEY });
              return;
            }
            addItems(parsed.items);
            return;
          } catch {
            // JSON 파싱 실패
          }
        }
        event.dataTransfer?.files && addFiles(event.dataTransfer.files);
      },
      onDragOver: (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (isDisabled || store.getIsUploading()) return;
        if (checkIsDroppable(event, accept, dropKey)) {
          event.currentTarget.classList.add('isHighlighted');
        }
      },
      onDragLeave: (event: React.DragEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          event.currentTarget.classList.remove('isHighlighted');
        }
      },
      onPaste: (event: React.ClipboardEvent<HTMLDivElement>) => {
        if (store.getIsUploading()) return;
        const files = event.clipboardData?.files;
        if (files && files.length > 0) {
          event.preventDefault();
          addFiles(files);
        }
      },
    }),
    [isDisabled, store, dropKey, raiseError, addItems, addFiles, accept]
  );

  return {
    store,
    value,
    length,
    isUploading,
    isError,
    setValue,
    setProgress,
    setError,
    remove,
    reset,
    add,
    dropzoneHandlers,
    clearProgress,
    clearError,
  };
}
