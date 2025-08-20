import React, { ReactNode } from 'react';
import type { MDSThemeColorPath } from '../../../types';

export type TableButtonProps = {
  /**
   * 버튼에 표시될 내용 (문자열만 허용, 필수)
   */
  children: ReactNode;

  /**
   * 앞쪽에 표시할 아이콘
   * - ReactElement: 커스텀 아이콘 컴포넌트 (size, color는 TableButton에서 자동 설정)
   * - null: 아이콘 표시하지 않음
   */
  icon?: React.ReactElement | null;

  /**
   * 클릭 이벤트 핸들러
   */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;

  /**
   * 비활성화 상태
   * - true: 버튼이 비활성화되며 클릭할 수 없고, 모든 요소의 색상이 disabled 색상으로 변경됩니다
   * - false: 버튼이 활성화됩니다
   */
  isDisabled?: boolean;

  /**
   * 변경 가능 여부 (드롭다운 화살표 표시 및 클릭 가능 여부 제어)
   * - true: 오른쪽에 ArrowDown 아이콘이 표시되며 클릭 가능한 상태입니다
   * - false: 화살표 아이콘이 숨겨지고 클릭이 불가능한 정적 표시 버튼이 됩니다 (disabled와는 다름)
   */
  isChangeable?: boolean;

  /**
   * 텍스트 및 아이콘 색상
   */
  color?: MDSThemeColorPath;
};

export type IconType = TableButtonProps['icon'];
