import React from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { Props, StyledWrapperProps } from './@types';
import { Checked, Indeterminate, UnChecked } from './Icons';
import { theme as CheckboxTheme } from './@constants';

const Wrapper = styled.label<StyledWrapperProps>`
  display: inline-block;

  & input {
    display: none;
  }

  ${({ size }) => `
    width: ${CheckboxTheme.size[size]}px;
    height: ${CheckboxTheme.size[size]}px;
    overflow: hidden;
  `}

  ${({ color, type, isChecked, isTranslucent }) => {
    const mainColor = isChecked
      ? CheckboxTheme.color[color].default[type]
      : CheckboxTheme.color[color].unChecked.border[type];
    const fill = CheckboxTheme.color[color].unChecked.fill[type];

    return `
      color: ${resolveColor(mainColor)};
      ${fill ? `fill: ${resolveColor(fill)};` : 'fill: none'};
      ${isTranslucent ? `opacity: 0.5;` : ''};
    `;
  }}
`;

export const MDSCheckbox = (props: Props) => {
  const { isChecked, color = 'blue', size = 'medium', onChange, isDisabled = false, isIndeterminate = false } = props;

  const type = isDisabled ? 'disabled' : 'normal';
  const wrapperSize = CheckboxTheme.size[size];
  const isTranslucent = isDisabled && !isChecked && color === 'white';

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
      isChecked={isChecked || isIndeterminate}
      isTranslucent={isTranslucent}
      onClick={stopPropagation}
    >
      <input type="checkbox" disabled={isDisabled} onChange={handleChange} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={wrapperSize}
        height={wrapperSize}
        viewBox={`0 0 ${wrapperSize} ${wrapperSize}`}
      >
        {isChecked ? Checked[size] : isIndeterminate ? Indeterminate[size] : UnChecked[size]}
      </svg>
    </Wrapper>
  );
};
