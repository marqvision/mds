import { CSSProperties } from 'react';
import { MDSThemeColorPath } from '../../../foundation';

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
  color?: MDSThemeColorPath;
};

type BaseProps = {
  /**
   * variant=line 인 경우 선의 방향을, dot 인 경우 정렬 방향을 나타냅니다.
   * @default 'horizontal'
   */
  orientation?: Orientation;
  /**
   * * variant=line 인 경우 선의 두께를 나타냅니다.
   * * variant=dot 인 경우 점의 크기를 나타냅니다.
   * @default 1
   */
  thickness?: number;
  style?: CSSProperties;
};

type LineProps = BaseProps & {
  variant?: 'line';
  length?: number | string;
} & ({
  intensity?: Intensity;
  color?: never;
} | {
  intensity?: never;
  color?: MDSThemeColorPath;
});

type DotProps = BaseProps & {
  /**
   * Divider 의 모양을 나타냅니다.
   * @default 'line'
   */
  variant: 'dot';
  /**
   * * variant=line 인 경우 Divider 의 강도를 나타냅니다. 이 값에 따라 색상이 변합니다.
   * * variant=dot 인 경우에는 이 속성을 사용하지 않고 bluegray[400]으로 고정됩니다.
   */
  intensity?: never;
  /**
   * * custom color 를 지정합니다.
   * * variant=line 인 경우 intensity 와 동시에 사용할 수 없습니다.
   */
  color?: MDSThemeColorPath;
  /**
   * * variant=line 인 경우 선의 길이를 나타냅니다. px 단위와 %단위를 사용할 수 있습니다.
   * * variant=dot 인 경우 사용하지 않습니다.
   * @default '100%'
   */
  length?: never;
};

export type Props = DotProps | LineProps;
