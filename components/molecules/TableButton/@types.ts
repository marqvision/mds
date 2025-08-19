import React from 'react';
import { MDSIcon } from '../../atoms/Icon';

export interface TableButtonProps {
  /**
   * 라벨 텍스트 (문자열만 허용, 필수)
   */
  label: string;

  /**
   * 앞쪽에 표시할 아이콘
   * - 문자열: MDSIcon의 키 (예: 'Sort', 'Calendar', 'Flag')
   * - null: 아이콘 표시하지 않음
   */
  icon?: keyof typeof MDSIcon | null;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * 비활성화 상태
   */
  isDisabled?: boolean;

  /**
   * 변경 가능 여부
   */
  isChangeable?: boolean;
}

export type SortIconType = TableButtonProps['icon'];
