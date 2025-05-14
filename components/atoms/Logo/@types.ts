type Variant = 'symbol' | 'logo';
type logoType = 'vision' | 'ai' | 'folio';
type Color = 'white' | 'black';

export type StyledLogoProps = {
  size: number;
  color: Color;
};

type CommonProps = {
  /*
   * 로고의 높이(px)
   * @default 20
   */
  size?: number;
  /*
   * 로고 색상
   */
  color: Color;
};

export type LogoTypeProps = CommonProps & {
  /** 'logo'일 경우 (생략 가능) */
  variant?: Extract<Variant, 'logo'>;
  /** 표시할 로고의 타입 (vision, ai, folio 중 하나) */
  logoType: logoType;
};

export type SymbolTypeProps = CommonProps & {
  /** 'symbol'을 명시적으로 지정 */
  variant: Extract<Variant, 'symbol'>;

  logoType?: never;
};

export type LogoProps = LogoTypeProps | SymbolTypeProps;
