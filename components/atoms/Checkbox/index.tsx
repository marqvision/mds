import React from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../../@system';
import { Props, StyledWrapperProps } from './@types';
import { Checked, Indeterminate, UnChecked } from './Icons';
import { theme as CheckboxTheme } from './@constants';

const Wrapper = styled.label<StyledWrapperProps>`
  display: inline-block;
  position: relative;
  font-size: 0;

  & input {
    display: none;
  }

  ${({ size }) => `
    width: ${CheckboxTheme.size[size].boxSize}px;
    height: ${CheckboxTheme.size[size].boxSize}px;
  `}

  ${({ color, type, value, isTranslucent }) => {
    const mainColor =
      value === false ? CheckboxTheme.color[color].unChecked.border[type] : CheckboxTheme.color[color].default[type];
    const fill = CheckboxTheme.color[color].unChecked.fill[type];

    return `
      color: ${resolveColor(mainColor)};
      ${fill ? `fill: ${resolveColor(fill)};` : 'fill: none'};
      ${isTranslucent ? `opacity: 0.5;` : ''};
    `;
  }}

  &:after {
    position: absolute;
    display: inline-block;
    content: '';
    width: ${({ size }) => `calc(100% + ${CheckboxTheme.size[size].padding * 2}px)`};
    height: ${({ size }) => `calc(100% + ${CheckboxTheme.size[size].padding * 2}px)`};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${({ size }) => `${CheckboxTheme.size[size].borderRadius}px`};
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

export const MDSCheckbox = (props: Props) => {
  const { value, color = 'blue', size = 'medium', onChange, isDisabled = false } = props;

  const type = isDisabled ? 'disabled' : 'normal';
  const boxSize = CheckboxTheme.size[size].boxSize;
  const isTranslucent = isDisabled && !value && color === 'white';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const stopPropagation = (event: React.MouseEvent<HTMLLabelElement>) => {
    // grid 나 table 내에서 쓰이는 경우가 많을 것이라고 예상되어 이벤트 전파 방지함.
    event.stopPropagation();
  };

  return (
    <Wrapper
      color={color}
      size={size}
      type={type}
      value={value}
      isTranslucent={isTranslucent}
      onClick={stopPropagation}
    >
      <input type="checkbox" checked={!!value} disabled={isDisabled} onChange={handleChange} />
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
    </Wrapper>
  );
};
