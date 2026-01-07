import React from 'react';
import { ERROR_CODE } from '../@constants';
import { FileData, FileUploaderController } from '../@types';
import { checkIsDroppable, isValidDropData } from '../@utils';

/**
 * Dropzone 이벤트 핸들러 생성 훅
 *
 * Dropzone 컴포넌트 내부에서 사용되며, controller를 받아
 * onDrop, onDragOver, onDragLeave, onPaste 핸들러를 생성합니다.
 */
export const useDropzoneHandlers = <T extends FileData = FileData>(
  controller: FileUploaderController<boolean, T> | undefined
) => {
  if (!controller) return undefined;

  const { store, options, actions } = controller;
  const { accept, dropKey, isDisabled } = options;
  const { addFiles, addItems, raiseError } = actions;

  // 수정 가능 여부 체크 (공통 가드)
  const checkCanModify = () => !isDisabled && !store.getIsUploading();

  return {
    onDrop: (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.currentTarget.classList.remove('isHighlighted');
      if (!checkCanModify()) return;

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
      if (!checkCanModify()) return;
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
      if (!checkCanModify()) return;
      const files = event.clipboardData?.files;
      if (files && files.length > 0) {
        event.preventDefault();
        addFiles(files);
      }
    },
  }
};
