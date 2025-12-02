import { MDSTheme } from '../../../../types';
import { BodySize } from '../../../atoms/Typography';
import { SIZE_ABBREVIATIONS, TOKEN_NAME, TYPOGRAPHY_SIZE } from '../@constants';
import { StyledPlainButtonProps } from '../@types';

export const resolveColor = (
  theme: MDSTheme,
  { color, isDisabled, isClickable, isCompleted }: StyledPlainButtonProps
): {
  content: {
    normal: string;
    hover: string;
  };
} => {
  const currentColor =
    color === 'bluegray-secondary'
      ? theme.color.content.neutral.secondary
      : theme.color.content[TOKEN_NAME[color]].default;

  let normal = currentColor.normal;
  let hover = currentColor.normal;

  if (isClickable) {
    hover = currentColor.hover;
  }
  if (isDisabled) {
    normal = currentColor.disabled;
    hover = currentColor.disabled;
  }
  if (isCompleted) {
    normal = theme.color.content.neutral.default.completed;
    hover = theme.color.content.neutral.default.completed;
  }

  return {
    content: {
      normal: normal || 'inherit',
      hover: hover || 'inherit',
    },
  };
};

export const resolveSize = (
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
