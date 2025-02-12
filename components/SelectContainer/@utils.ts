import { MDSThemeValue } from '../../foundation';

export const getCorrectContainerStyle = (disabled?: boolean, isSelected?: boolean) => {
  const styles = {
    base: `
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
      outline: 1px solid ${MDSThemeValue.color.border.neutral.default.normal};
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.normal};
      }
      
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};
        .checked-icon-wrapper path {
          fill: ${MDSThemeValue.color.content.primary.default.hover};
        }
      }
    `,

    disabled: `
      outline: 1px solid ${MDSThemeValue.color.border.neutral.default.normal};
      
      p {
        color: ${MDSThemeValue.color.content.neutral.default.disabled};
      }
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.disabled};
      }
      
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.disabled};
      }
    `,

    disabledSelected: `
      outline: 2px solid ${MDSThemeValue.color.border.primary.default.disabled};
      
      p {
        color: ${MDSThemeValue.color.content.neutral.default.disabled};
      }
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.disabled};
      }
      
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.disabled};
        .checked-icon-wrapper path {
          fill: ${MDSThemeValue.color.content.primary.default.disabled};
        }
      }
    `,

    selected: `
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
      outline: 2px solid ${MDSThemeValue.color.border.primary.default.normal};
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.normal};
      }
      
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};
        outline: 2px solid ${MDSThemeValue.color.border.primary.default.hover};
        .checked-icon-wrapper path {
          fill: ${MDSThemeValue.color.content.primary.default.hover};
        }
      }
    `,
  };

  if (disabled && isSelected) return styles.disabledSelected;
  if (disabled) return styles.disabled;
  if (isSelected) return styles.selected;

  return styles.base;
};

export const getLayoutStyle = (type?: 'fit' | 'fixed' | 'hug', isCenter?: boolean) => {
  let additionalStyle = '';

  if (isCenter) {
    additionalStyle = 'justify-content: center;';
  }

  if (type === 'fit') {
    additionalStyle = 'flex: 1;';
  }

  return `display: flex; ${additionalStyle}`;
};

export const getSizeStyle = (
  orientation?: 'horizontal' | 'vertical',
  fixedHeightValue?: number,
  fixedWidthValue?: number
) => {
  const heightStyle =
    orientation === 'horizontal'
      ? 'height: fit-content;'
      : `height: ${fixedHeightValue ? `${fixedHeightValue}px` : 'auto'};`;

  const widthStyle =
    orientation === 'vertical' ? 'width: fit-content;' : `width: ${fixedWidthValue ? `${fixedWidthValue}px` : 'auto'};`;

  return `${heightStyle} ${widthStyle}`;
};
