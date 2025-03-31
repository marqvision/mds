import { isValidElement, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useAtom, useAtomValue } from 'jotai';
import { keyframes } from '@emotion/react';
import clsx from 'clsx';
import { MDSDimmed } from '../Dimmed';
import { MDSIcon } from '../Icon';
import { MDSTypography2 } from '../Typography2';
import { MDSPanelActionProps, MDSPanelBodyProps, MDSPanelHeaderProps, MDSPanelProps, PanelDirection } from './@type';
import { panelAtom } from './@atom';

// todo-@matthew 추후 공통 transition 으로 변경
const transition = '300ms ease';

const animations = {
  right: {
    in: keyframes`from { transform: translateX(50px); } to { transform: translateX(0); }`,
    out: keyframes`from { transform: translateX(0); } to { transform: translateX(50px); }`,
  },
  left: {
    in: keyframes`from { transform: translateX(-50px); } to { transform: translateX(0); }`,
    out: keyframes`from { transform: translateX(0); } to { transform: translateX(-50px); }`,
  },
  bottom: {
    in: keyframes`from { transform: translateY(50px); } to { transform: translateY(0); }`,
    out: keyframes`from { transform: translateY(0); } to { transform: translateY(50px); }`,
  },
  top: {
    in: keyframes`from { transform: translateY(-50px); } to { transform: translateY(0); }`,
    out: keyframes`from { transform: translateY(0); } to { transform: translateY(-50px); }`,
  },
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
  animation: ${({ isOpen, direction }: { isOpen: boolean; direction: PanelDirection }) =>
      isOpen ? animations[direction].in : animations[direction].out}
    ${transition} forwards;
`;

const StyledSplitPanel = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  transition: flex-basis ${transition};
  border-radius: 16px 16px 0 0;
  & > div {
    height: 100%;
    overflow: auto;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  flex: 0;
  padding: 16px 20px;
  gap: 16px;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
`;

const StyledClose = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const StyledBody = styled.div`
  flex: 1;
  overflow: auto;
  position: relative;
`;

const StyledObserver = styled.div`
  position: absolute;
  height: 1px;
  width: 100%;
  margin-top: -1px;
  z-index: -1;
`;

const StyledActions = styled.div`
  padding: 16px;
  flex: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  transition: box-shadow ${transition};
  box-shadow: 0 1px 8px 0 #0000001f, 0 1px 2px 0 #0000000a;
`;

/**
 * @param props.isDimmed (default: `true`)
 * - `true`: dimmed 위에 패널이 그려짐
 * - `false`: dimmed 없이 패널이 그려짐
 * @param props.width
 * - `isDimmed: true`: default: 540px
 * - `isDimmed: false`: default: 50%
 */

const Wrapper = (props: MDSPanelProps) => {
  const { style, width, onClose, children, isOpen = false, isDimmed = true, direction = 'right' } = props;
  const contentWidth = isDimmed ? width || '540px' : 'auto';

  const wrapperElement = (
    <StyledWrapper
      isOpen={isOpen}
      direction={direction}
      className={clsx('mds-panel', {
        isIn: isDimmed && isOpen,
        isOut: isDimmed && !isOpen,
      })}
      style={{ width: contentWidth }}
    >
      {children}
    </StyledWrapper>
  );

  if (isDimmed)
    return (
      <MDSDimmed isOpen={isOpen} onClose={onClose} style={{ padding: 0, justifyContent: 'flex-end' }}>
        {wrapperElement}
      </MDSDimmed>
    );

  const outerBoxWidth = typeof width === 'string' && /^\d+$/.test(width) ? parseInt(width) : width || '50%';
  const innerBoxWidth = typeof width === 'number' || (width && /\d+px/.test(width)) ? width : '100%';

  return (
    <StyledSplitPanel
      style={{
        flexBasis: isOpen ? outerBoxWidth : 0,
        marginLeft: isOpen ? '4px' : 0,
        ...style,
      }}
    >
      <div style={{ width: innerBoxWidth }}>{wrapperElement}</div>
    </StyledSplitPanel>
  );
};

const Header = (props: MDSPanelHeaderProps) => {
  const { children, onClose, style } = props;

  const isElement = isValidElement(children);

  return (
    <StyledHeader style={{ ...style }}>
      <div style={{ flex: 'auto' }}>
        {!isElement ? (
          <MDSTypography2 variant="title" size="xl" weight="semibold">
            {children}
          </MDSTypography2>
        ) : (
          children
        )}
      </div>
      {onClose && (
        <StyledClose>
          <MDSIcon.CloseDelete onClick={onClose} size={24} variant="outline" style={{ flexShrink: 0 }} />
        </StyledClose>
      )}
    </StyledHeader>
  );
};

const Content = (props: MDSPanelBodyProps) => {
  const { children, style } = props;

  const [, setAtom] = useAtom(panelAtom);

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      setAtom((ps) => ({
        ...ps,
        isScrollBottom: entries[0].isIntersecting,
      }));
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [setAtom]);

  return (
    <StyledBody>
      <div style={{ ...style }}>{children}</div>
      <StyledObserver ref={observerRef}></StyledObserver>
    </StyledBody>
  );
};

const Action = (props: MDSPanelActionProps) => {
  const { children, justifyContent = 'flex-end', persistentShadow = false, style } = props;

  const atom = useAtomValue(panelAtom);

  return (
    <StyledActions
      style={{ justifyContent, boxShadow: !persistentShadow && atom.isScrollBottom ? 'none' : undefined, ...style }}
    >
      {children}
    </StyledActions>
  );
};

export const MDSPanel = {
  Wrapper,
  Header,
  Content,
  Action,
};
