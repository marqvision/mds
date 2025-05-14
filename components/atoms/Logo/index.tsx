import { LogoProps } from './@types';
import { MarqFolioLogo } from './@components/MarqFolioLogo';
import { MarqAiLogo } from './@components/MarqAiLogo';
import { MarVisionLogo } from './@components/MarqVisionLogo';
import { Symbol } from './@components/Symbol';
import { DEFAULT_SIZE } from './@constants';
import { checkIsSymbol } from './@utils';

const Logo = (props: LogoProps) => {
  const { size = DEFAULT_SIZE, logoType } = props;
  const isSymbol = checkIsSymbol(props);

  if (isSymbol) {
    return <Symbol {...props} variant="symbol" size={size} />;
  }

  const logoProps = {
    ...props,
    size,
  };

  switch (logoType) {
    case 'vision':
      return <MarVisionLogo {...logoProps} />;
    case 'folio':
      return <MarqFolioLogo {...logoProps} />;
    case 'ai':
      return <MarqAiLogo {...logoProps} />;
  }
};

export const MDSLogo = Logo;
export type { LogoTypeProps as MDSLogoProps } from './@types';