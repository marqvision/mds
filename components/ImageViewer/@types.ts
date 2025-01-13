import React from 'react';
import { MDSImageProps } from '../Image';

/**
 * 뷰어의 기본 트리거로 MDSImage 가 출력됩니다.
 * MDSImage 의 prop 인 src 를 전달하면, 미리보기 이미지와 뷰어로 출력할 이미지를 별도로 지정할 수 있습니다.
 */
type WithoutCustomElement = {
  children?: never;
} & MDSImageProps;

/**
 * 트리거로 커스텀 요소를 사용할 수 있습니다.
 * `open` 함수는 뷰어를 열기 위한 콜백입니다.
 */
type WithCustomElement = {
  children: (open: () => void) => React.ReactNode;
};

export type ImageViewerProps = {
  /**
   * 뷰어에서 표시할 이미지의 URL.
   */
  url: string;
} & (WithCustomElement | WithoutCustomElement);
