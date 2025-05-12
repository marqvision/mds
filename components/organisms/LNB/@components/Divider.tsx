import styled from '@emotion/styled';

export const Divider = styled.hr<{ isOpen: boolean }>`
  ${({ theme }) => {

    return `
      margin: 4px 0;
      width: 100%;
      height: 1px;
      background-color: ${theme.comp.lnb.color.divider.default};
    `;
  }}
`;