import React from 'react';
import * as CSS from 'csstype';
import { MDSThemeColorPath } from '../../../../types';
import { CustomProps } from './custom';

type IconSize = 'x-small' | 'small' | 'medium' | 'large';
type FallbackStyle = 'border' | 'tint';
type ErrorFallback = 'icon' | 'text' | 'both';
export type RemoveBorderRadius =
  | boolean
  | {
      topLeft?: boolean;
      topRight?: boolean;
      bottomLeft?: boolean;
      bottomRight?: boolean;
    };

export type Theme = {
  color: Record<
    FallbackStyle,
    {
      borderColor: MDSThemeColorPath;
      backgroundColor: MDSThemeColorPath;
      color: MDSThemeColorPath;
    }
  >;
  size: {
    iconSize: Record<IconSize, number>;
  };
};

type UseIcon = {
  /**
   * 에러 시 출력될 스타일을 지정합니다.
   * `icon`, `text` 또는 둘 다 출력 가능합니다.
   * @default 'icon'
   */
  errorFallback?: Extract<ErrorFallback, 'icon' | 'both'>;
  /**
   * loading 또는 error 시 노출 될 아이콘의 사이즈.
   * @default 'medium'
   */
  iconSize?: IconSize;
};

type NoIcon = {
  errorFallback: Exclude<ErrorFallback, 'icon' | 'both'>;
  iconSize?: never;
};

export type StyledHoverWrapperProps = {
  isOpen: boolean;
};

export type StyledErrorWrapperProps = {
  isDraggable: boolean;
  iconSize?: IconSize;
  fallbackStyle: FallbackStyle;
  isLoaded: boolean;
};

export type StyledImageWrapperProps = {
  isDraggable: boolean;
  borderColor?: MDSThemeColorPath;
};

export type ImageProps = {
  /**
   * isDraggable `true` 시 이미지 자체를 드래그 할 수 있습니다.
   * isDraggable `false` 시 이미지를 드래그 할 수 없습니다. (listing select 시 필요)
   * @default 'false'
   */
  isDraggable?: boolean;
  /**
   * 로딩 상태 시 MDSIcon.Image 가 표시됩니다.
   */
  isLoading?: boolean;
  /**
   * loading 또는 error 시의 스타일.
   * @default 'tint'
   */
  fallbackStyle?: FallbackStyle;
  /**
   * 이미지의 너비.
   */
  width?: string;
  /**
   * 이미지의 높이.
   */
  height?: string;
  /**
   * 이미지의 최소 너비.
   */
  minWidth?: string;
  /**
   * 이미지의 최소 높이.
   */
  minHeight?: string;
  /**
   * 이미지의 최대 너비.
   */
  maxWidth?: string;
  /**
   * 이미지의 최대 높이.
   */
  maxHeight?: string;
  /**
   * 이미지의 비율.
   */
  aspectRatio?: string;
  /**
   * 이미지에 objectFit 스타일을 전달합니다.
   * @default 'cover'
   */
  objectFit?: CSS.Properties['objectFit'];
  /**
   * 이미지에 objectPosition 스타일을 전달합니다.
   * @default 'center'
   */
  objectPosition?: CSS.Properties['objectPosition'];
  /**
   * 이미지에는 기본적으로 4px 의 border-radius 가 적용되어 있습니다.
   * 이 값을 지우고 싶을 때 사용합니다.
   * @removeBorderRadius `true` - 전체 border-radius 제거
   * @removeBorderRadius `object` - 부분 border-radius 제거
   */
  removeBorderRadius?: RemoveBorderRadius;
  /**
   * 컬러 값 전달 시 이미지 외부에 1px 의 테두리가 생깁니다.
   */
  borderColor?: MDSThemeColorPath;
  custom?: CustomProps | CustomProps[];
  children?: React.ReactNode;
} & (UseIcon | NoIcon) &
  Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'draggable'>;

export type StyledImageProps = {
  isLoaded: boolean;
} & Required<Pick<ImageProps, 'objectFit' | 'objectPosition'>>;

export type StyledWrapperProps = {
  borderRadius: { topLeft: string; topRight: string; bottomLeft: string; bottomRight: string };
} & Pick<ImageProps, 'width' | 'height' | 'aspectRatio' | 'maxWidth' | 'maxHeight' | 'minWidth' | 'minHeight'>;
