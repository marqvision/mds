import { useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from 'react';
import { CONCURRENT_UPLOAD_LIMIT, ERROR_CODE, ERROR_MESSAGE } from '../@constants';
import {
  ErrorCode,
  FileData,
  FileUploaderController,
  FileUploaderError,
  FileUploaderStore,
  Item,
  PresignedUrlConfig,
  Progress,
  UseFileUploaderOptions,
  UseFileUploaderReturn,
} from '../@types';
import {
  convertAcceptToInputAccept,
  createFileUploaderStore,
  createItemFromFile,
  getBaseUrl,
  getErrorData,
  revokeBlobUrl,
  toastMDSSnackbarError,
  uploadFileToS3,
  validateFiles,
} from '../@utils';
import { getIsValueEqual, getNormalizedValue } from '../@utils/helpers';

/**
 * 파일 업로드를 위한 상태와 액션을 제공하는 훅
 *
 * ## 역할 (Hook의 책임)
 * - **비즈니스 로직**: 파일 검증, 업로드 orchestration
 * - **부수효과 처리**: data 변경 시 error 클리어, globalErrors 클리어
 * - **UI 이벤트 처리**: 파일 선택
 * - **콜백 연동**: onChange, onUploadComplete, onError
 * - **가드 조건**: isDisabled, isUploading 체크
 *
 * ## 반환값
 * - **controller**: 하위 컴포넌트 전달용 (store, options, actions)
 * - **files**: 파일 관련 값과 액션 (value, length, open, remove, setValue, reset)
 * - **progress**: 진행 상태 관련 (isUploading, setProgress, clearProgress)
 * - **error**: 에러 관련 (isError, setError, clearError)
 *
 * @see createFileUploaderStore - 순수 상태 저장소
 *
 * @example
 * // 기본 사용법
 * const { files, progress, controller } = useMDSFileUploader();
 * const { value, open, remove } = files;
 * const { isUploading } = progress;
 *
 * @example
 * // 상세 progress가 필요한 경우
 * const { controller } = useMDSFileUploader();
 * const progress = useMDSFileUploadState(controller, 'progress');
 */
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
    presignedUrl,
    dropKey,
    isDisabled,
    language = 'en',
    onChange,
    onError,
  } = options;

  // presignedUrl 옵션 정규화
  const presignedUrlConfig = useMemo((): PresignedUrlConfig | null => {
    if (!presignedUrl) return null;
    if (typeof presignedUrl === 'function') {
      return {
        getUrl: presignedUrl,
        onSuccess: undefined,
        failedFile: 'remove',
      };
    }
    return {
      getUrl: presignedUrl.getUrl,
      onSuccess: presignedUrl.onSuccess,
      failedFile: presignedUrl.failedFile ?? 'remove',
    };
  }, [presignedUrl]);

  const multiple = limit !== 1;

  // defaultValue를 Item[]로 정규화
  const normalizedDefaultValue = useRef<Item<T>[]>(getNormalizedValue(defaultValue));

  // store는 한 번만 생성
  const storeRef = useRef<FileUploaderStore<T>>();
  if (!storeRef.current) {
    storeRef.current = createFileUploaderStore<T>(normalizedDefaultValue.current);
  }
  const store = storeRef.current;

  // 파일 추가 처리 중 플래그 (경합 조건 방지)
  const isProcessingRef = useRef(false);

  // 수정 가능 여부 체크 (공통 가드)
  const checkCanModify = useCallback(() => !isDisabled && !store.getIsUploading(), [isDisabled, store]);

  // 파일 추가 가능 여부 체크
  const checkCanAddFiles = useCallback(
    () => !isProcessingRef.current && checkCanModify(),
    [checkCanModify]
  );

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
        message: ERROR_MESSAGE[error.code](params)[language],
      };
      store.addGlobalError(fullError);

      if (onError === false) return;
      const toastError = onError || toastMDSSnackbarError;
      toastError?.(fullError);
    },
    [store, onError, language]
  );

  // error 클리어 (index 없으면 전체 아이템 error + 전역 globalErrors)
  const clearError = useCallback(
    (index?: number) => {
      if (index !== undefined) {
        store.setItem(index, (prev) => ({ ...prev, error: undefined }));
      } else {
        store.getItems().forEach((_, i) => {
          store.setItem(i, (prev) => ({ ...prev, error: undefined }));
        });
        store.clearGlobalErrors();
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
      const prevItem = store.getItem(index);
      store.setItem(index, item);

      // data 변경 시 해당 아이템 error + globalErrors 명시적 클리어
      const newItem = store.getItem(index);
      if (prevItem && newItem && prevItem.data !== newItem.data) {
        if (newItem.error) {
          store.setItem(index, (prev) => ({ ...prev, error: undefined }));
        }
        store.clearGlobalErrors();
      }

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
          store.setProgress(indexOrProgress);
        }
      };
    } else {
      return (progress: Progress | null) => {
        store.setProgress(progress);
      };
    }
  }, [multiple, setValueAt, store]);

  // error 상태 업데이트 헬퍼 (multiple에 따라 시그니처 변경)
  const setError = useMemo(
    () =>
      multiple
        ? (index: number, error?: ErrorCode) =>
            setValueAt(index, (prev) => ({ ...prev, error: getErrorData(language, error) }))
        : (error?: ErrorCode) => setValueAt(0, (prev) => ({ ...prev, error: getErrorData(language, error) })),
    [multiple, setValueAt, language]
  );

  // 아이템 삭제
  const remove = useCallback(
    (index: number) => {
      const targetIndex = index > 0 ? index : 0;
      const item = store.getItem(targetIndex);
      if (item?.data.url) {
        revokeBlobUrl(item.data.url);
      }
      store.clearGlobalErrors();
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
      store.clearGlobalErrors();
      const newItems = newValue ? (Array.isArray(newValue) ? newValue : [newValue]) : normalizedDefaultValue.current;
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

      store.clearGlobalErrors();

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
      if (!presignedUrlConfig) return;

      try {
        const presignedUrl = await presignedUrlConfig.getUrl(file.name);

        await uploadFileToS3(file, presignedUrl, (percentage) => {
          if (!store.getItem(index)) return;
          setValueAt(index, (prev) => ({ ...prev, progress: { percentage, isUploading: true } }));
        });

        const finalUrl = getBaseUrl(presignedUrl);

        if (!store.getItem(index)) return;

        setValueAt(index, (prev) => ({
          ...prev,
          data: { ...prev.data, url: finalUrl },
          progress: { percentage: 100, isUploading: false },
        }));
        presignedUrlConfig.onSuccess?.(index, finalUrl);
      } catch (error) {
        if (!store.getItem(index)) return;

        switch (presignedUrlConfig.failedFile) {
          case 'remove': {
            // 실패 시 파일 제거
            store.removeItem(index);
            notifyChange(store.getItems());
            break;
          }
          case 'keep': {
            // 실패 시 에러 표시하고 파일 유지
            setValueAt(index, (prev) => ({
              ...prev,
              error: getErrorData(language, ERROR_CODE.UPLOAD_FAILED),
              progress: { percentage: 0, isUploading: false },
            }));
          }
        }
      }
    },
    [presignedUrlConfig, store, setValueAt, notifyChange, language]
  );

  // 파일 추가 공통 로직
  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      if (!checkCanAddFiles()) return;

      const fileArray = Array.from(files);
      if (fileArray.length === 0) return;

      // 처리 시작
      isProcessingRef.current = true;
      if (presignedUrlConfig) {
        store.setIsProcessing(true);
      }

      try {
        // 1. 파일 검증
        const { valid, errors: validationErrors } = await validateFiles(fileArray, { accept, maxFileSize });

        // 2. 유효한 파일이 없으면 에러만 리포트
        if (valid.length === 0) {
          validationErrors.forEach(raiseError);
          return;
        }

        // 3. limit 초과 체크
        if (limit && store.getLength() + valid.length > limit) {
          validationErrors.forEach(raiseError);
          raiseError({ code: ERROR_CODE.LIMIT_EXCEEDED, files: valid, params: { limit } });
          return;
        }

        // 4. Item 생성 및 적용
        const newItems = valid.map((file) => createItemFromFile(file, !!presignedUrlConfig) as Item<T>);
        const { added, startIndex } = applyItems(newItems);

        // 5. 에러 리포트 (아이템 추가 후에 실행해야 클리어되지 않음)
        validationErrors.forEach(raiseError);

        // 6. 업로드 시작
        if (added.length > 0 && presignedUrlConfig) {
          const uploadQueue = added.map((item, i) => ({
            file: item.data.file,
            index: multiple ? startIndex + i : 0,
          }));

          let queueIndex = 0;

          const uploadNext = async (): Promise<void> => {
            if (queueIndex >= uploadQueue.length) return;

            const current = uploadQueue[queueIndex];
            queueIndex++;

            if (current.file) {
              await uploadFile(current.file, current.index);
            }

            await uploadNext();
          };

          // 동시 업로드 제한 적용
          const workerCount = Math.min(CONCURRENT_UPLOAD_LIMIT, uploadQueue.length);
          await Promise.all(Array.from({ length: workerCount }, () => uploadNext()));
        }
      } finally {
        // 처리 완료
        isProcessingRef.current = false;
        if (presignedUrlConfig) {
          store.setIsProcessing(false);
        }
      }
    },
    [checkCanAddFiles, multiple, limit, maxFileSize, store, accept, applyItems, raiseError, presignedUrlConfig, uploadFile]
  );

  // 파일 선택창 열기
  const open = useCallback(() => {
    if (!checkCanModify()) return;

    const input = document.createElement('input');
    input.type = 'file';
    const inputAccept = convertAcceptToInputAccept(accept);
    if (inputAccept) input.accept = inputAccept;
    input.multiple = multiple;
    input.onchange = () => input.files && addFiles(input.files);
    input.click();
  }, [checkCanModify, accept, multiple, addFiles]);

  // Item 객체 추가 (업로드 없이)
  const addItems = useCallback(
    (items: Item<T>[]) => {
      if (store.getProgress().isUploading) return;
      if (items.length === 0) return;
      applyItems(items);
    },
    [store, applyItems]
  );

  // controller 객체 구성 (하위 컴포넌트용)
  const controller: FileUploaderController<boolean, T> = useMemo(
    () => ({
      store,
      options: {
        language,
        accept,
        dropKey,
        isDisabled,
        presignedUrl,
      },
      actions: {
        open,
        addFiles,
        addItems,
        raiseError,
        remove,
      },
    }),
    [store, language, accept, dropKey, isDisabled, presignedUrl, open, addFiles, addItems, raiseError, remove]
  );

  useEffect(() => {
    // 외부 주입 값 변경 시 store 연동
    const normalizedDefaultValue = getNormalizedValue(defaultValue);
    if (getIsValueEqual(normalizedDefaultValue, store)) return;
    store.reset(normalizedDefaultValue);
  }, [defaultValue, store]);

  return {
    controller,
    file: { value, length, open, remove, setValue, reset },
    progress: { isUploading, setProgress, clearProgress },
    error: { isError, setError, clearError },
  };
}
