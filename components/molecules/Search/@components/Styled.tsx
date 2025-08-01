import styled from '@emotion/styled';

export const Styled = {
  wrapper: styled.div`
    display: inline-flex;
  `,
  label: styled.div`
    display: flex;
    gap: 8px;
  `,
  parent: styled.span`
    color: ${({ theme }) => theme.color.content.neutral.secondary.normal};
  `,
};