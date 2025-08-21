import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { Props, StyledWrapperProps } from './@types';
import { Checked, Indeterminate, UnChecked } from './Icons';
import { THEME as CHECKBOX_THEME } from './@constants';
import { getColorSet } from './@utils';
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

  ${({ size }) => `
    width: ${CHECKBOX_THEME.size[size].boxSize}px;
    height: ${CHECKBOX_THEME.size[size].boxSize}px;
  `}

  ${({ color, type, value, isTranslucent, theme }) => {
    const mainColor = getColorSet(theme)[color][value ? 'default' : 'unChecked'][`${type}Border`];
    const fill = getColorSet(theme)[color][value ? 'default' : 'unChecked'][`${type}Fill`];

    return `
      color: ${mainColor};
      fill: ${fill || 'none'};
      ${isTranslucent ? `opacity: 0.5;` : ''};
    `;
  }}
  
  &:after {
    position: absolute;
    display: block;
    content: '';
    width: ${({ size }) => `calc(100% + ${CHECKBOX_THEME.size[size].padding * 2}px)`};
    height: ${({ size }) => `calc(100% + ${CHECKBOX_THEME.size[size].padding * 2}px)`};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${({ size }) => `${CHECKBOX_THEME.size[size].borderRadius}px`};
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

export const MDSCheckbox = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { value, color = 'blue', size = 'medium', onChange, isDisabled = false, label, gap = 4 } = props;

  const type = isDisabled ? 'disabled' : 'normal';
  const boxSize = CHECKBOX_THEME.size[size].boxSize;
  const isTranslucent = isDisabled && !value && color === 'white';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLLabelElement>) => {
    // grid 나 table 내에서 쓰이는 경우가 많을 것이라고 예상되어 이벤트 전파 방지함.
    event.stopPropagation();
  };

  return (
    <Wrapper ref={ref} gap={gap} isClickable={!isDisabled} onClick={stopPropagation}>
      <input type="checkbox" checked={!!value} disabled={isDisabled} onChange={handleChange} />
      <IconWrapper size={size} type={type} color={color} value={value} isTranslucent={isTranslucent}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={boxSize}
          height={boxSize}
          viewBox={`0 0 ${boxSize} ${boxSize}`}
          isShow={value === true}
        >
          {Checked[size]}
        </Svg>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={boxSize}
          height={boxSize}
          viewBox={`0 0 ${boxSize} ${boxSize}`}
          isShow={value === 'indeterminate'}
        >
          {Indeterminate[size]}
        </Svg>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width={boxSize}
          height={boxSize}
          viewBox={`0 0 ${boxSize} ${boxSize}`}
          isShow={!value}
        >
          {UnChecked[size]}
        </Svg>
      </IconWrapper>
      {label && <Label label={label} size={size} isDisabled={isDisabled} />}
    </Wrapper>
  );
});

export type MDSCheckboxProps = Props;

MDSCheckbox.displayName = 'MDSCheckbox';
