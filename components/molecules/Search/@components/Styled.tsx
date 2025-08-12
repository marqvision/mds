import styled from '@emotion/styled';

export const Styled = {
  wrapper: styled.div<{ width?: string }>`
    display: inline-grid;
    grid-template-columns: auto 1fr;
    ${({ width }) => (width ? `width: ${width};` : '')};
  `,
  label: styled.div`
    display: flex;
    gap: 8px;
  `,
  parent: styled.span`
    color: ${({ theme }) => theme.color.content.neutral.secondary.normal};
  `,
};