import { useCallback, useSyncExternalStore } from 'react';
import { FileData, FileUploaderController, FileUploaderError, Item, Progress } from '../@types';

/**
 * FileUploader의 특정 상태를 구독하는 훅
 *
 * 이 훅은 불필요한 리렌더를 최소화하기 위해 상태를 분리하여 구독할 수 있도록 설계되었습니다.
 * progress, error, value가 출력되는 영역이 분리되어 있거나 해당 영역이 필요 없는 경우에 유용합니다.
 *
 * ## Key 옵션별 설명
 *
 * - **'progress'**: 파일 업로드 진행상황 (percentage, count, isUploading)
 *   - Dropzone 내에 상세 progress를 표시하고 싶을 때 사용
 *
 * - **'errors'**: 전체 에러 리스트 (FileUploaderError[])
 *   - 기본적으로 MDSSnackbar로 표시되나, 리스트 형태로 에러를 출력하고 싶을 때 사용
 *
 * - **'value'**: 전체 파일 리스트 (Item<T>[])
 *   - 각 아이템의 progress, error 상태가 포함됨
 *   - 테이블이나 Chip 리스트 형태에서 개별 아이템의 progress를 표시하고 싶을 때 사용
 *   - 주의: useFileUploader의 value는 length 변경 시에만 리렌더됨
 *
 * - **'value.{index}'**: 특정 인덱스의 파일 정보 (Item<T> | undefined)
 *   - 업로드할 파일이 아주 많은 경우, 개별 아이템의 progress를 분리하여 구독
 *   - 변경이 있는 아이템만 리렌더하여 성능 최적화
 *
 * ## 사용 시나리오
 *
 * 1. Button 업로드 (상세 progress 불필요): useFileUploader의 isUploading만 사용
 * 2. Dropzone 내 progress 표시: useFileUploaderState(controller, 'progress')
 * 3. 에러 리스트 표시: useFileUploaderState(controller, 'errors')
 * 4. 테이블/Chip 리스트: useFileUploaderState(controller, 'value')
 * 5. 대량 파일 최적화: useFileUploaderState(controller, 'value.{index}')
 *
 * @example
 * // 기본 사용법 - progress 구독
 * const { controller } = useMDSFileUploader();
 * const progress = useFileUploaderState(controller, 'progress');
 *
 * @example
 * // 에러 리스트 구독
 * const errors = useFileUploaderState(controller, 'errors');
 *
 * @example
 * // 전체 파일 리스트 구독 (개별 아이템 progress 포함)
 * const items = useFileUploaderState(controller, 'value');
 *
 * @example
 * // 특정 인덱스의 파일만 구독 (대량 파일 최적화)
 * const item = useFileUploaderState(controller, 'value.0');
 */
export function useFileUploadState<T extends FileData = FileData>(controller: FileUploaderController<boolean, T>, key: 'progress'): Progress;
export function useFileUploadState<T extends FileData = FileData>(controller: FileUploaderController<boolean, T>, key: 'errors'): FileUploaderError[];
export function useFileUploadState<T extends FileData = FileData>(controller: FileUploaderController<boolean, T>, key: 'value'): Item<T>[];
export function useFileUploadState<T extends FileData = FileData>(controller: FileUploaderController<boolean, T>, key: `value.${number}`): Item<T> | undefined;
export function useFileUploadState<T extends FileData = FileData>(
  controller: FileUploaderController<boolean, T>,
  key: 'progress' | 'errors' | 'value' | `value.${number}`
): Progress | FileUploaderError[] | Item<T>[] | Item<T> | undefined {
  const { store } = controller;
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
        return store.getGlobalErrors();
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
