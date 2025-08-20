import React from 'react';
import { MDSIcon } from '../../atoms/Icon';
import { SortIconType } from './@types';
import type { MDSThemeColorPath } from '../../types';

/**
 * sortIcon prop을 기반으로 적절한 아이콘 엘리먼트를 렌더링합니다.
 *
 * @param sortIcon - MDSIcon 키 또는 null
 * @param size - 아이콘 크기 (기본값: 20px)
 * @param isDisabled - 비활성화 상태 여부
 * @param color - 아이콘 색상
 * @returns React 엘리먼트 또는 null
 */
export const renderSortIcon = (sortIcon: SortIconType, size: number, isDisabled?: boolean, color?: MDSThemeColorPath): React.ReactElement | null => {
  if (!sortIcon) return null;

  // 문자열인 경우 해당 MDSIcon 컴포넌트 렌더링
  if (typeof sortIcon === 'string' && isValidIconName(sortIcon)) {
    const IconComponent = MDSIcon[sortIcon] as React.ComponentType<any>;
    return React.createElement(IconComponent, { 
      size, 
      variant: 'outline',
      color: isDisabled ? 'color/content/neutral/default/disabled' : color
    });
  }

  return null;
};

/**
 * 주어진 문자열이 유효한 MDSIcon 키인지 확인합니다.
 *
 * @param iconName - 확인할 아이콘명
 * @returns MDSIcon에 존재하는 키인지 여부
 */
export const isValidIconName = (iconName: string): iconName is keyof typeof MDSIcon => {
  return iconName in MDSIcon;
};
