import styled from '@emotion/styled';
import { StyledLogoProps } from '../@types';

export const Wrapper = styled.svg<StyledLogoProps>`
  ${({ theme, size, ...props }) => {
  const color = props.color === 'white' ? theme._raw_color.white : theme._raw_color.black;

  return `
      width: auto;
      height: ${size}px;
      color: ${color};
    `;
}}
`;