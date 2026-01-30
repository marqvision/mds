import { Fragment } from 'react';
import styled from '@emotion/styled';
import type { MDSHoverActionToolbarProps } from './@types';

export type { MDSHoverActionToolbarProps };

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  padding: 6px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12);
`;

const Divider = styled.div`
  width: 1px;
  align-self: stretch;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const MDSHoverActionToolbar = (props: MDSHoverActionToolbarProps) => {
  const { actions, className, style } = props;

  if (actions.length === 0) {
    return null;
  }

  return (
    <Container className={className} style={style}>
      {actions.map((action, index) => (
        <Fragment key={index}>
          {index > 0 && <Divider />}
          {action}
        </Fragment>
      ))}
    </Container>
  );
};
