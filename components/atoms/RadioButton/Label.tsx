import { isValidElement } from 'react';
import { MDSTypography } from '../Typography';
import { THEME as RADIO_BUTTON_THEME } from './@constants';
import { LabelProps } from './@types';

export const Label = (props: LabelProps) => {
  const { isDisabled = false, label } = props;

  const fontSize = RADIO_BUTTON_THEME.size.fontSize;
  const fontColor = RADIO_BUTTON_THEME.size.fontColor[isDisabled ? 'disabled' : 'default'];

  const commonProps = {
    size: fontSize,
    color: fontColor,
  };

  return (
    <MDSTypography as={isValidElement(label) ? 'div' : undefined} {...commonProps}>
      {label}
    </MDSTypography>
  );
};
