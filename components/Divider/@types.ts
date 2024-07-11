import { CSSProperties } from 'react';

type Variant = 'line' | 'dot';
type Orientation = 'horizontal' | 'vertical';
type Intensity = 'default' | 'strong' | 'weak';

export type Theme = Record<'color', Record<Variant, Partial<Record<Intensity, string>>>>;

export type StyledProps = {
  variant: Variant;
  intensity: Intensity;
  orientation: Orientation;
  length: string;
  thickness: string;
};

export type Props = {
  /**
   * Divider의 모양을 나타냅니다.
   * @default 'line'
   */
  variant?: Variant;

  /**
   * variant=line인 경우 Divider의 강도를 나타냅니다. 이 값에 따라 색상이 변합니다.
   * variant=dot인 경우에는 bluegray[400]으로 고정됩니다.
   * @default 'default'
   */
  intensity?: Intensity;
  /**
   * variant=line인 경우 선의 방향을 나타냅니다.
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /**
   * variant=line인 경우 선의 길이를 나타냅니다. px단위와 %단위를 사용할 수 있습니다.
   * @default '100%'
   */
  length?: number | string;

  /**
   * variant=line인 경우 선의 두께를 나타냅니다.
   * shpe=dot인 경우 점의 크기를 나타냅니다.
   * @default 1
   */
  thickness?: number;
  style?: CSSProperties;
};
