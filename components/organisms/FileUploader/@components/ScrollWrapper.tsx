import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useOnScreen } from '../@hooks/useOnScreen';

const Styled = {
  Wrapper: styled.div`
    width: 100%;
    max-height: 100%;
    overflow-y: auto;
    position: relative;
  `,
  Sticky: styled.div<{ isOnScreen: boolean }>`
    position: sticky;
    bottom: 0;
    z-index: 100;
    overflow: hidden;
    interpolate-size: allow-keywords;
    transition: 300ms;
    pointer-events: none;

    ${({ theme, isOnScreen }) => css`
      transform: translateY(${isOnScreen ? '100%' : '0'});
      height: ${isOnScreen ? '0' : 'auto'};

      &:before {
        content: '';
        display: block;
        background: linear-gradient(180deg, transparent 0%, ${theme.color.bg.surface.neutral.default.normal} 100%);
        height: 48px;
      }
    `};
  `,
  StickyInner: styled.div`
    pointer-events: auto;
    background: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
  `,
  ObserveTarget: styled.div`
    height: 16px;
  `,
};

type Props = {
  isDisabled?: boolean;
  stickyElement?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const ScrollWrapper = (props: React.PropsWithChildren<Props>) => {
  const { children, stickyElement, isDisabled, className, style } = props;

  const { wrapperRef, targetRef, isOnScreen } = useOnScreen();

  return (
    <Styled.Wrapper ref={wrapperRef} className={className} style={style}>
      {children}

      <Styled.ObserveTarget ref={targetRef} />
      {!isDisabled && stickyElement && (
        <Styled.Sticky isOnScreen={isOnScreen}>
          <Styled.StickyInner>{stickyElement}</Styled.StickyInner>
        </Styled.Sticky>
      )}
    </Styled.Wrapper>
  );
};

ScrollWrapper.displayName = 'MDSFileUploader.ScrollWrapper';
