import { forwardRef } from 'react';
import { LogoProps } from './@types';
import { MarqFolioLogo } from './@components/MarqFolioLogo';
import { MarqAiLogo } from './@components/MarqAiLogo';
import { MarqVisionLogo } from './@components/MarqVisionLogo';
import { Symbol } from './@components/Symbol';
import { DEFAULT_SIZE } from './@constants';
import { checkIsSymbol } from './@utils';

const Logo = forwardRef<SVGSVGElement, LogoProps>((props, ref) => {
  const { size = DEFAULT_SIZE, logoType } = props;
  const isSymbol = checkIsSymbol(props);

  if (isSymbol) {
    return <Symbol {...props} variant="symbol" size={size} ref={ref} />;
  }

  const logoProps = {
    ...props,
    size,
    ref,
  };

  switch (logoType) {
    case 'vision':
      return <MarqVisionLogo {...logoProps} />;
    case 'folio':
      return <MarqFolioLogo {...logoProps} />;
    case 'ai':
      return <MarqAiLogo {...logoProps} />;
  }
});
Logo.displayName = 'MDSLogo';

export const MDSLogo = Logo;
export type { LogoTypeProps as MDSLogoProps } from './@types';