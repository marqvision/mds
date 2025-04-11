import React from 'react';
import * as CSS from 'csstype';

// Modal Context
export type ModalContext = {
  // content 내에서 스크롤바를 내리면 header 하단에 boxShadow 를 출력하기 위한 값입니다. header 에 주입됩니다.
  isScrollTop: boolean;
  // content 내 스크롤 상태를 감지하기 위한 이벤트입니다. content 에 주입됩니다.
  onScrollContent: (event: React.UIEvent<HTMLElement>) => void;
};

// Modal Wrapper
type ModalCommonProps = {
  // 기본값: 420px, modal 의 가로 크기를 지정합니다.
  width?: string;
  // modal 의 최소 가로 크기를 지정합니다.
  minWidth?: string;
  // 기본값: 100%, modal 의 최대 가로 크기를 지정합니다.
  maxWidth?: string;
  // modal 의 세로 크기를 지정합니다.
  height?: string;
  // modal 의 최소 세로 크기를 지정합니다.
  minHeight?: string;
  // 기본값: 100%, modal 의 최대 세로 크기를 지정합니다.
  maxHeight?: string;
};

export type ModalWrapperProps = React.PropsWithChildren<
  ModalCommonProps & {
    // 이 값의 상태에 따라 Modal 이 열립니다. transition 적용을 위해 이 값을 사용 해 주세요.
    isOpen: boolean;
    // overlay 클릭 시 실행 할 이벤트입니다.
    onClose?: () => void;
  }
>;
export type StyledModalWrapperProps = ModalCommonProps;

// Modal Header
export type ModalHeaderProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    // title 앞에 icon 을 표시합니다.
    icon?: React.ReactElement;
    // header 가장 오른쪽에 close 버튼을 출력하고 이 이벤트를 실행합니다.
    onClose?: () => void;
    // close 버튼의 좌측에 element 를 출력합니다.
    rightSideElement?: React.ReactElement;
    // 기본값: true, header 하단에 border 출력 여부를 결정합니다.
    isBorderBottom?: boolean;
  }
>;
export type StyledModalHeaderProps = { isBorderBottom: boolean; isScrollTop: boolean };

// Modal Content
export type ModalContentProps = React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

// Modal Action
export type ModalActionProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLDivElement> & {
    // 기본값: flex-end
    justifyContent?: CSS.Properties['justifyContent'];
  }
>;
