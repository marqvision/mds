import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const DateInputGroupLayout = styled.div<{ hasLabel: boolean; hasError: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 8px;

  & .mds2-empty-label {
    width: 10px;
    height: 21px;
  }

  & [data-role='separator'] {
    ${({ hasLabel, hasError }) => {
      let marginTop = 4;
      let marginBottom = 0;
      if (hasLabel) {
        marginTop += 26;
      }
      if (hasError) {
        marginBottom += 12;
      }
      return css`
        margin: ${marginTop}px 8px ${marginBottom}px 8px;
      `;
    }}
  }
`;
