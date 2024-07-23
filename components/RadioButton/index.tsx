import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { theme as RadioButtonTheme } from './@constants';
import { Props, StyledWrapperProps } from './@types';
import { Selected, Unselected } from './Icons';

const Wrapper = styled.label<StyledWrapperProps>`
  display: inline-block;

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
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox={`0 0 24 24`}>
        {isChecked ? Selected : Unselected}
      </svg>
    </Wrapper>
  );
};
