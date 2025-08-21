import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { THEME as RADIO_BUTTON_THEME } from './@constants';
import { Props, StyledWrapperProps } from './@types';
import { getColorSet } from './@utils';
import { Selected, Unselected } from './Icons';
import { Label } from './Label';

const Wrapper = styled.label<{ isClickable: boolean; gap: number }>`
  display: inline-flex;
  align-items: center;

  ${({ isClickable, gap }) => `
    gap: ${gap}px;
    ${isClickable ? 'cursor: pointer;' : ''}
  `}

  & input {
    display: none;
  }
`;

const IconWrapper = styled.div<StyledWrapperProps>`
  flex-shrink: 0;
  position: relative;
  font-size: 0;
  width: ${RADIO_BUTTON_THEME.size.boxSize}px;
  height: ${RADIO_BUTTON_THEME.size.boxSize}px;

  ${({ color, type, checked, theme }) => {
    const buttonStatus = checked ? 'selected' : 'unSelected';
    const mainColor = getColorSet(theme)[color][buttonStatus][`${type}Border`];
    const fill = getColorSet(theme)[color][buttonStatus][`${type}Fill`];

    return `
      color: ${mainColor};
      fill: ${fill || 'none'};
    `;
  }}

  &:after {
    position: absolute;
    display: inline-block;
    content: '';
    width: calc(100% + ${RADIO_BUTTON_THEME.size.padding * 2}px);
    height: calc(100% + ${RADIO_BUTTON_THEME.size.padding * 2}px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${RADIO_BUTTON_THEME.size.borderRadius}px;
    transition: 0.3s;
  }

  &:hover:after {
    ${({ theme, type }) => (type === 'normal' ? `background-color: ${theme.color.border.target.default};` : '')};
  }
`;

const Svg = styled.svg<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${({ isShow }) => (isShow ? '1' : '0')};
  transition: 0.3s;
`;

export const MDSRadioButton = forwardRef((props, ref) => {
  const { value, color = 'blue', selectedValue, onChange, isDisabled, label, gap = 4 } = props;

  const type = isDisabled ? 'disabled' : 'normal';
  const isChecked = selectedValue === value;

  const handleChange = () => {
    onChange(value);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.stopPropagation();
  };

  return (
    <Wrapper ref={ref} gap={gap} isClickable={!isDisabled} onClick={stopPropagation}>
      <input type="radio" checked={isChecked} disabled={isDisabled} onChange={handleChange} />
      <IconWrapper color={color} type={type} checked={isChecked}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={RADIO_BUTTON_THEME.size.boxSize}
          height={RADIO_BUTTON_THEME.size.boxSize}
          viewBox={`0 0 ${RADIO_BUTTON_THEME.size.boxSize} ${RADIO_BUTTON_THEME.size.boxSize}`}
          isShow={isChecked}
        >
          {Selected}
        </Svg>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={RADIO_BUTTON_THEME.size.boxSize}
          height={RADIO_BUTTON_THEME.size.boxSize}
          viewBox={`0 0 ${RADIO_BUTTON_THEME.size.boxSize} ${RADIO_BUTTON_THEME.size.boxSize}`}
          isShow={!isChecked}
        >
          {Unselected}
        </Svg>
      </IconWrapper>
      {label && <Label isDisabled={isDisabled} label={label} />}
    </Wrapper>
  );
}) as (<Value extends string | number>(props: Props<Value> & { ref?: React.Ref<HTMLLabelElement> }) => JSX.Element) & {
  displayName?: string;
};
MDSRadioButton.displayName = 'MDSRadioButton';
