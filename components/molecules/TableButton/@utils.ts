import React from 'react';
import { IconType } from './@types';
import type { MDSThemeColorPath } from '../../../types';

/**
 * icon prop을 기반으로 적절한 아이콘 엘리먼트를 렌더링합니다.
 *
 * @param icon - React 아이콘 엘리먼트 또는 null
 * @param size - 아이콘 크기 (기본값: 20px)
 * @param isDisabled - 비활성화 상태 여부
 * @param color - 아이콘 색상
 * @returns React 엘리먼트 또는 null
 */
export const renderIcon = (
  icon: IconType,
  size: number,
  isDisabled?: boolean,
  color?: MDSThemeColorPath
): React.ReactElement | null => {
  if (!icon) return null;

  // ReactElement인 경우 size와 color props를 덮어써서 복제
  if (React.isValidElement(icon)) {
    return React.cloneElement(icon as React.ReactElement<Record<string, unknown>>, {
      ...(icon.props || {}),
      size,
      color: isDisabled ? 'color/content/neutral/default/disabled' : color,
    });
  }

  return null;
};
