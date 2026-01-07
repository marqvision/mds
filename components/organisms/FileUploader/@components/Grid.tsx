import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { DEFAULT_COLUMN } from '../@constants';

const Styled = {
  Wrapper: styled.div<Props>`
    padding: 8px;
    width: 100%;
    height: 100%;
    display: grid;
    justify-content: center;
    align-content: center;
    gap: 4px;
    overflow: hidden;

    ${({ column = DEFAULT_COLUMN }) => css`
      grid-template-columns: repeat(${column}, 1fr);
      align-items: ${column === 1 ? 'start' : 'center'};
    `}
  `,
};

type Props = {
  column?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const Grid = (props: React.PropsWithChildren<Props>) => {
  const { children, ...restProps } = props;

  return <Styled.Wrapper {...restProps}>{children}</Styled.Wrapper>;
};

Grid.displayName = 'MDSFileUploader.Grid';
