import { LogoProps, SymbolTypeProps } from './@types';

export const checkIsSymbol = (props: LogoProps): props is SymbolTypeProps => {
  return props.variant === 'symbol';
};