import { ReactNode, SVGAttributes } from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { resolveColor } from '../../@system/resolvers';
import { Features } from './@types';
import * as Symbols from './Symbols';

export type MDSIconProps<IC = ''> = Features<IC> & SVGAttributes<SVGElement>;

const createIcon = <IC,>(Icon: (features: Features<IC>) => ReactNode) => {
  const IconComponent = ({ size = 24, color = 'color/content/neutral/default/normal', variant }: MDSIconProps<IC>) => {
    const props = {
      size: size || 24,
      color: resolveColor(color),
      variant,
    };
    return (
      <svg
        width={props.size}
        height={props.size}
        viewBox="0 0 24 24"
        fill={props.color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <Icon variant={props.variant} />
      </svg>
    );
  };

  return IconComponent;
};



type SymbolIconName = {
  [K in keyof typeof Symbols]: K extends `SVG${infer Name}` ? Name : never;
}[keyof typeof Symbols];
const SymbolsIcons = Object.entries(Symbols).reduce((acc, [key, value]) => {
  const displayName = key.replace('SVG', '') as SymbolIconName;
  const svgIcon = value as (features: Features<SymbolIconName>) => ReactNode;

  return {
    ...acc,
    [displayName]: createIcon(svgIcon),
  };
}, {} as Record<SymbolIconName, (props: MDSIconProps) => EmotionJSX.Element>);

const SymbolsIcons2 = {
  ...SymbolsIcons,
  Cards: createIcon(Symbols.SVGCards),
  EyesVisibility: createIcon(Symbols.SVGEyesVisibility),
  CommentAdd: createIcon(Symbols.SVGCommentAdd),
};

export const MDSIcon = {
  // ...ArrowIcons,
  ...SymbolsIcons2,
  // ...EditorIcons,
};
