import { isValidElement } from 'react';
import { MDSTypography } from '../Typography';
import { THEME as CHECKBOX_THEME } from './@constants';
import { LabelProps } from './@types';

export const Label = (props: LabelProps) => {
  const { isDisabled = false, size, label } = props;

  const fontSize = CHECKBOX_THEME.size[size].fontSize;
  const fontColor = CHECKBOX_THEME.size[size].fontColor[isDisabled ? 'disabled' : 'default'];

  const commonProps = {
    size: fontSize,
    color: fontColor,
  };

  if (typeof label === 'object' && 'main' in label) {
    return (
      <>
        <MDSTypography {...commonProps} weight="medium">
          {label.main}
        </MDSTypography>
        <MDSTypography {...commonProps}>{label.sub}</MDSTypography>
      </>
    );
  }

  return (
    <MDSTypography as={isValidElement(label) ? 'div' : undefined} {...commonProps}>
      {label}
    </MDSTypography>
  );
};
