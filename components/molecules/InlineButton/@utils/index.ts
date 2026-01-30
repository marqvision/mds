import { MDSTheme } from '../../../../types';
import { Color, StyledInlineButtonProps } from '../@types';

type ResolveColorResult = {
  content: {
    normal: string;
    hover: string;
    visited: string;
  };
};

const getColorTokens = (theme: MDSTheme, color: Color) => {
  const colorTokenMap = {
    bluegray: theme.color.content.neutral.default,
    'bluegray-secondary': theme.color.content.neutral.secondary,
    blue: theme.color.content.primary.default,
    white: theme.color.content.inverse.default,
  } as const;

  return colorTokenMap[color];
};

const getVisitedColor = (theme: MDSTheme, color: Color): string => {
  // inverse(white) 색상은 밝은 배경에서 사용되므로 밝은 indigo 사용
  return color === 'white' ? theme._raw_color.indigo200 : theme._raw_color.indigo700;
};

export const resolveColor = (
  theme: MDSTheme,
  { color, isDisabled, isClickable }: Pick<StyledInlineButtonProps, 'color' | 'isDisabled' | 'isClickable'>
): ResolveColorResult => {
  const colorTokens = getColorTokens(theme, color);
  const visitedColor = getVisitedColor(theme, color);

  // disabled 상태
  if (isDisabled) {
    return {
      content: {
        normal: colorTokens.disabled,
        hover: colorTokens.disabled,
        visited: colorTokens.disabled,
      },
    };
  }

  // 기본 상태
  return {
    content: {
      normal: colorTokens.normal,
      hover: isClickable ? colorTokens.hover : colorTokens.normal,
      visited: visitedColor,
    },
  };
};
