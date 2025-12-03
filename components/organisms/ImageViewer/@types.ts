import React from 'react';

export type ImageData = {
  src: string;
  overlay?: React.ReactElement;
};

type ReturnObject = {
  open: () => void;
  defaultButton: React.ReactElement;
};

export type ImageViewerProps<Image extends string | ImageData> = {
  /**
   * 뷰어에서 표시할 이미지의 URL 또는 URL 을 포함한 이미지 관련 데이터 객체.
   */
  image: Image;
  /**
   * 뷰어 내에서 이전 또는 다음 이미지를 보여주기 위한 전체 이미지 리스트.
   */
  list?: Image[];
  /**
   * 뷰어를 열기 위한 버튼 요소를 출력합니다.
   */
  renderAnchor: (returnObject: ReturnObject) => React.ReactNode;
};

export type InnerProps<Image extends string | ImageData> = {
  onClose: () => void;
} & Omit<ImageViewerProps<Image>, 'renderAnchor'>;