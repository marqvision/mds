import { isValidElement, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { Provider, useAtom, useAtomValue } from 'jotai';
import clsx from 'clsx';
import { keyframes } from '@emotion/react';
import { MDSDimmed } from '../Dimmed';
import { MDSIcon } from '../Icon';
import { MDSTypography } from '../Typography';
import { MDSPanelActionProps, MDSPanelBodyProps, MDSPanelHeaderProps, MDSPanelProps } from './@type';
import { panelAtom } from './@atom';

const slideIn = keyframes`
  from {
    transform: translateX(50px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  to {
    transform: translateX(50px);
  }
  from {
    transform: translateX(0);
  }
`;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
  &.isIn {
    animation: ${slideIn} 300ms ease forwards;
  }
  &.isOut {
    animation: ${slideOut} 300ms ease forwards;
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
  transition: box-shadow 300ms ease;
  box-shadow: 0 1px 8px 0 #0000001f, 0 1px 2px 0 #0000000a;
`;

/**
 * @param props.isDimmed (default: `true`)
 * - `true`: dimmed 위에 패널이 그려짐
 * - `false`: dimmed 없이 패널이 그려짐
 */
const Wrapper = (props: MDSPanelProps) => {
  const { isDimmed = true, isOpen = false, children, width: _width, onClose } = props;

  const width = isDimmed ? _width || '540px' : 'auto';

  const wrapperElement = (
    <Provider>
      <StyledWrapper
        className={clsx('mds-panel', {
          isIn: isDimmed && isOpen,
          isOut: isDimmed && !isOpen,
        })}
        style={{ width }}
      >
        {children}
      </StyledWrapper>
    </Provider>
  );

  const clearBodyStyle = () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  useEffect(() => {
    if (!isDimmed) {
      return;
    }
    const scrollbarWidth = window.innerWidth - window.document.body.offsetWidth;

    const panelLength = document.querySelectorAll('.mds-panel').length;
    if (isOpen && panelLength === 0) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else if (!isOpen && panelLength === 1) {
      clearBodyStyle();
    }
  }, [isOpen, isDimmed]);

  useEffect(() => {
    return () => {
      clearBodyStyle();
    };
  }, []);

  if (isDimmed)
    return (
      <MDSDimmed isOpen={isOpen} onClose={onClose} style={{ padding: 0, justifyContent: 'flex-end' }}>
        {wrapperElement}
      </MDSDimmed>
    );

  return wrapperElement;
};

const Header = (props: MDSPanelHeaderProps) => {
  const { children, onClose, style } = props;

  const isElement = isValidElement(children);

  return (
    <StyledHeader style={{ ...style }}>
      <div style={{ flex: 'auto' }}>
        {!isElement ? (
          <MDSTypography variant="T20" weight="bold">
            {children}
          </MDSTypography>
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
