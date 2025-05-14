import { MDSTheme } from '../../../../types';
import { SIZE_ABBREVIATIONS, TOKEN_NAME, TYPOGRAPHY_SIZE } from '../@constants';
import { StyledPlainButtonProps } from '../@types';
import { BodySize } from '../../../atoms/Typography';

export const resolveColor = (
  theme: MDSTheme,
  { color, isDisabled, isClickable, isCompleted }: StyledPlainButtonProps
): {
  content: {
    normal: string;
    hover: string;
  };
} => {
  const colorTokenName = TOKEN_NAME[color];
  const currentColor = theme.color.content[colorTokenName];

  let normal = currentColor.default.normal;
  let hover = currentColor.default.normal;

  if (isClickable) {
    hover = currentColor.default.hover;
  }
  if (isDisabled) {
    normal = currentColor.default.disabled;
    hover = currentColor.default.disabled;
  }
  if (isCompleted) {
    normal = currentColor.default.completed;
    hover = currentColor.default.completed;
  }

  return {
    content: {
      normal: normal || 'inherit',
      hover: hover || 'inherit',
    },
  };
};

export const getSize = (
  theme: MDSTheme,
  { isIconButton, size }: Pick<StyledPlainButtonProps, 'size' | 'isIconButton'>
): {
  typography: BodySize;
  radius: string;
  gap: string;
  verticalPadding: string;
  horizontalPadding: string;
  icon: number;
} => {
  const sizeAbbreviation = SIZE_ABBREVIATIONS[size];

  const typography = TYPOGRAPHY_SIZE[size];
  const radius = theme.comp.plainButton.radius[sizeAbbreviation.twoLetters];
  const gap = theme.comp.plainButton.gap[sizeAbbreviation.twoLetters];

  const verticalPadding = theme.comp.plainButton.pddng[isIconButton ? 'icon' : 'v'][sizeAbbreviation.oneLetter];
  const horizontalPadding = theme.comp.plainButton.pddng[isIconButton ? 'icon' : 'h'][sizeAbbreviation.oneLetter];

  const iconSizeType = isIconButton ? 'standaloneIconSize' : 'withLabelIconSize';
  const icon = theme.comp.plainButton[iconSizeType][sizeAbbreviation.twoLetters];

  return {
    typography,
    radius,
    gap,
    verticalPadding,
    horizontalPadding,
    icon,
  };
};
