import { MDSThemeValue } from '../../foundation';

export const getCorrectContainerStyle = (disabled?: boolean, isSelected?: boolean) => {
  if (disabled && isSelected) {
    return `
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
    `;
  }

  if (!isSelected) {
    return `
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
    `;
  }

  if (isSelected) {
    return `
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
      outline: 2px solid ${MDSThemeValue.color.border.primary.default.normal};
  
      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.normal};
      }
  
      &:hover {
        background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};
  
        .checked-icon-wrapper path {
          fill: ${MDSThemeValue.color.content.primary.default.hover};
        }
      }
    `;
  }

  if (disabled) {
    return ` 
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
    `;
  }
};
