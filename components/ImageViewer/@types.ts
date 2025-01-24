import React from 'react';

type ImageData = {
  src: string;
  overlay?: React.ReactElement;
};

type ReturnObject = {
  open: () => void;
  defaultButton: React.ReactElement;
};

export type ImageViewerProps = {
  /**
   * 뷰어에서 표시할 이미지의 URL 또는 URL 을 포함한 이미지 관련 데이터 객체.
   */
  image: string | ImageData;
  /**
   * 뷰어를 열기 위한 버튼 요소를 출력합니다.
   */
  renderAnchor: (returnObject: ReturnObject) => React.ReactNode;
};
