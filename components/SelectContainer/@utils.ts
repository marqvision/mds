import { MDSThemeValue } from '../../foundation';

export const getCorrectContainerStyle = (disabled?: boolean, isSelected?: boolean) => {
  const styles = {
    base: `
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
      box-shadow: inset 0 0 0 1px ${MDSThemeValue.color.border.neutral.default.normal};
      
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
      box-shadow: inset 0 0 0 1px ${MDSThemeValue.color.border.neutral.default.normal};
      
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
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.disabled};
      box-shadow: inset 0 0 0 2px ${MDSThemeValue.color.border.primary.default.disabled};
      
      p {
        color: ${MDSThemeValue.color.content.neutral.default.disabled};
      }
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.disabled};
      }
      
      &:hover {
        .checked-icon-wrapper path {
          fill: ${MDSThemeValue.color.content.primary.default.disabled};
        }
      }
    `,

    selected: `
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
      box-shadow: inset 0 0 0 2px ${MDSThemeValue.color.border.primary.default.normal};
      
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.normal};
      }
      
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};
        box-shadow: inset 0 0 0 2px ${MDSThemeValue.color.border.primary.default.hover};
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

export const getLayoutStyle = (type?: 'fit' | number, isCenter?: boolean) => {
  let additionalStyle = '';

  if (isCenter) {
    additionalStyle = 'justify-content: center;';
  }

  if (type === 'fit') {
    additionalStyle += 'flex: 1;';
  }

  return `display: flex; ${additionalStyle}`;
};

export const getSizeStyle = (itemSizing?: 'fit' | number, orientation?: 'horizontal' | 'vertical') => {
  if (typeof itemSizing !== 'number') return;

  return orientation === 'horizontal'
    ? `height: fit-content; width: ${itemSizing}px;`
    : `width: fit-content; height: ${itemSizing}px;`;
};
