import { ReactElement } from 'react';
import { ImageProps as MDSImageProps } from '../../../atoms/Image/@types';

export type SnackbarType = 'success' | 'error' | 'warning' | 'complete';

export type ImageData = MDSImageProps & {
  src: string;
};

export type SnackbarCommonProps = {
  /*
   * 스낵바의 타입입니다. ('success' | 'error' | 'warning' | 'complete')
   */
  type?: SnackbarType;

  /*
   * 스낵바의 제목입니다.
   */
  title: string;

  /*
   * 스낵바에 표시될 메시지입니다.
   */
  message?: string;

  /*
   * 스낵바의 너비를 설정합니다. 기본값은 'auto'이며, px 단위로 전달할 수 있습니다.
   */
  width?: number;

  /*
   * 스낵바가 표시되는 시간(ms)입니다.
   */
  duration?: number;

  /*
   * 커스텀 스낵바 아이콘을 설정합니다.
   */
  customIcon?: ReactElement;

  /*
   * 이미지 list - 문자열 또는 ImageData 객체 배열
   * 예: enforcement listing images 등
   */
  images?: (string | ImageData)[];

  /*
   * 스낵바 닫기 버튼을 보여줄지 여부를 설정합니다.
   */
  showCloseButton?: boolean;

  /*
   * 새로운 스낵바를 가장 뒤에 추가할지 여부를 설정합니다.
   */
  pushToEnd?: boolean;

  /*
   * 기존에 큐에 쌓여 있는 모든 스낵바를 제거할지 여부를 설정합니다.
   */
  dismissAllPreviousSnackbar?: boolean;

  /*
   * 스낵바에 표시될 액션 버튼입니다. (optional)
   */
  actionButton?: {
    dismissBefore?: boolean;
    text: string;
    event: () => void;
  };
};

export type SnackbarData = SnackbarCommonProps & {
  id: number;
  type: SnackbarType;
};

export type SnackbarItemStyleProps = {
  type: SnackbarType;
  translateY: number;
  scale: number;
  opacity: number;
  zIndex: number;
  stackIndex?: number;
  width?: number;
};

export type SnackbarProps = {
  snackbar: SnackbarData;
  stackIndex: number;
  isHidden: boolean;
  onRemove: (id: number) => void;
};

export type ImageProps = MDSImageProps & {
  src: string;
  width?: string;
  height?: string;
};

export type ImageGalleryProps = {
  images: (string | ImageData)[];
};

export type SnackbarListener = (snackbars: SnackbarData[]) => void;
