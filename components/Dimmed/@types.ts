import React from 'react';

type Intensity = 'default' | 'strong';

export type Theme = Record<'color', Record<Intensity, { backgroundColor: string }>>;

export type StyledProps = {
  padding: string;
  intensity: Intensity;
};

/**
 * 컴포넌트의 Props로, 커스터마이징과 기능 설정을 위한 옵션을 포함합니다.
 */
export type Props = React.PropsWithChildren<{
  /**
   * 컴포넌트가 열려 있는지 여부를 나타냅니다.
   * @type {boolean}
   */
  isOpen: boolean;

  /**
   * @type {React.CSSProperties | undefined}
   */
  style?: React.CSSProperties;

  /**
   * 컴포넌트가 닫힐 때 호출되는 선택적 콜백 함수.
   * @type {(event: React.MouseEvent<HTMLDivElement>) => void | undefined}
   */
  onClose?: (event: React.MouseEvent<HTMLDivElement>) => void;

  /**
   * 배경의 강도 수준.
   * @type {'default' | 'strong' | undefined}
   * @default 'default'
   */
  intensity?: Intensity;

  /**
   * @type {string}
   * @default '20px'
   */
  padding?: string;
}>;
