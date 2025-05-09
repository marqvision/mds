import styled from '@emotion/styled';

export const Divider = styled.hr<{ isOpen: boolean }>`
  ${({ theme, ...props }) => {
    const width = props.isOpen ? 'calc(100% - 16px)' : '100%';

    return `
      margin: 4px 0;
      width: ${width};
      height: 1px;
      background-color: ${theme.comp.lnb.color.divider.default};
    `;
  }}
`;