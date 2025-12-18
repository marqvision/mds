import { useCallback, useSyncExternalStore } from 'react';
import { FileData, FileUploaderError, FileUploaderStore, Item, Progress } from '../@types';

/**
 * FileUploader의 특정 상태를 구독하는 훅
 * 해당 상태가 변경될 때만 리렌더링됩니다.
 *
 * @example
 * const { store } = useMDSFileUploader();
 * const progress = useFileUploaderState(store, 'progress');
 * const errors = useFileUploaderState(store, 'errors');
 * const value = useFileUploaderState(store, 'value');
 * const item = useFileUploaderState(store, 'value.0');
 */
export function useFileUploadState<T extends FileData = FileData>(store: FileUploaderStore<T>, key: 'progress'): Progress;
export function useFileUploadState<T extends FileData = FileData>(store: FileUploaderStore<T>, key: 'errors'): FileUploaderError | null;
export function useFileUploadState<T extends FileData = FileData>(store: FileUploaderStore<T>, key: 'value'): Item<T>[];
export function useFileUploadState<T extends FileData = FileData>(store: FileUploaderStore<T>, key: `value.${number}`): Item<T> | undefined;
export function useFileUploadState<T extends FileData = FileData>(
  store: FileUploaderStore<T>,
  key: 'progress' | 'errors' | 'value' | `value.${number}`
): Progress | FileUploaderError | null | Item<T>[] | Item<T> | undefined {
  const subscribe = useCallback(
    (listener: () => void) => {
      switch (key) {
        case 'progress':
          return store.subscribeProgress(listener);
        case 'errors':
          return store.subscribeErrors(listener);
        case 'value':
          return store.subscribe(listener);
        default: {
          const index = Number(key.split('.').at(1));
          return store.subscribeItem(index ?? 0, listener);
        }
      }
    },
    [store, key]
  );

  const getSnapshot = useCallback(() => {
    switch (key) {
      case 'progress':
        return store.getProgress();
      case 'errors':
        return store.getErrorsState();
      case 'value':
        return store.getItems();
      default: {
        const index = Number(key.split('.').at(1));
        return store.getItem(index ?? 0);
      }
    }
  }, [store, key]);

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
