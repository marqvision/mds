import styled from '@emotion/styled';
import { resolveColor } from '../../../@system';
import { theme as RadioButtonTheme } from './@constants';
import { Props, StyledWrapperProps } from './@types';
import { Selected, Unselected } from './Icons';

const Wrapper = styled.label<StyledWrapperProps>`
  display: inline-block;
  position: relative;
  font-size: 0;
  width: ${RadioButtonTheme.size.boxSize}px;
  height: ${RadioButtonTheme.size.boxSize}px;

  & input {
    display: none;
  }

  ${({ color, type, checked }) => {
    const buttonStatus = checked ? 'selected' : 'unSelected';
    const mainColor = RadioButtonTheme.color[color][buttonStatus].border[type];
    const fill = RadioButtonTheme.color[color][buttonStatus].fill[type];

    return `
      color: ${resolveColor(mainColor)};
      ${fill ? `fill: ${resolveColor(fill)};` : 'fill: none'};
    `;
  }}

  &:after {
    position: absolute;
    display: inline-block;
    content: '';
    width: calc(100% + ${RadioButtonTheme.size.padding * 2}px);
    height: calc(100% + ${RadioButtonTheme.size.padding * 2}px);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${RadioButtonTheme.size.borderRadius}px;
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

export const MDSRadioButton = <Value extends string | number>(props: Props<Value>) => {
  const { value, color = 'blue', selectedValue, onChange, isDisabled } = props;

  const type = isDisabled ? 'disabled' : 'normal';
  const isChecked = selectedValue === value;

  const handleChange = () => {
    onChange(value);
  };

  return (
    <Wrapper color={color} type={type} checked={isChecked}>
      <input type="radio" checked={isChecked} disabled={isDisabled} onChange={handleChange} />
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={RadioButtonTheme.size.boxSize}
        height={RadioButtonTheme.size.boxSize}
        viewBox={`0 0 ${RadioButtonTheme.size.boxSize} ${RadioButtonTheme.size.boxSize}`}
        isShow={isChecked}
      >
        {Selected}
      </Svg>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={RadioButtonTheme.size.boxSize}
        height={RadioButtonTheme.size.boxSize}
        viewBox={`0 0 ${RadioButtonTheme.size.boxSize} ${RadioButtonTheme.size.boxSize}`}
        isShow={!isChecked}
      >
        {Unselected}
      </Svg>
    </Wrapper>
  );
};
