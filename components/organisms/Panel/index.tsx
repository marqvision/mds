import { forwardRef, isValidElement } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { MDSDimmed } from '../Dimmed';
import { MDSIcon } from '../../atoms/Icon';
import { MDSTypography } from '../../atoms/Typography';
import { MDSPanelActionProps, MDSPanelBodyProps, MDSPanelHeaderProps, MDSPanelProps, PanelDirection } from './@type';

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
  animation: ${({ isOpen, direction, isDimmed }: { isOpen: boolean; direction: PanelDirection; isDimmed: boolean }) =>
      isDimmed ? (isOpen ? animations[direction].in : animations[direction].out) : undefined}
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

const StyledActions = styled.div`
  padding: 16px;
  flex: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.comp.divider.color.default};
`;

/**
 * @param props.isDimmed (default: `true`)
 * - `true`: dimmed 위에 패널이 그려짐
 * - `false`: dimmed 없이 패널이 그려짐
 * @param props.width
 * - `isDimmed: true`: default: 540px
 * - `isDimmed: false`: default: 50%
 */

const Wrapper = forwardRef<HTMLDivElement, MDSPanelProps>((props, ref) => {
  const { style, width, onClose, children, isOpen = false, isDimmed = true, direction = 'right' } = props;
  const contentWidth = isDimmed ? width || '540px' : 'auto';

  const wrapperElement = (
    <StyledWrapper
      ref={ref}
      isOpen={isOpen}
      direction={direction}
      isDimmed={isDimmed}
      className="mds-panel"
      style={{ width: contentWidth }}
    >
      {children}
    </StyledWrapper>
  );

  const justifyContent = direction === 'left' ? 'flex-start' : direction === 'right' ? 'flex-end' : undefined;

  if (isDimmed)
    return (
      <MDSDimmed isOpen={isOpen} onClose={onClose} style={{ padding: 0, justifyContent, ...style }}>
        {wrapperElement}
      </MDSDimmed>
    );

  const outerBoxWidth = typeof width === 'string' && /^\d+$/.test(width) ? parseInt(width) : width || '50%';
  const innerBoxWidth = typeof width === 'number' || (width && /\d+px/.test(width)) ? width : '100%';

  return (
    <StyledSplitPanel
      ref={ref}
      style={{
        flexBasis: isOpen ? outerBoxWidth : 0,
        marginLeft: isOpen ? '4px' : 0,
        ...style,
      }}
    >
      <div style={{ width: innerBoxWidth }}>{wrapperElement}</div>
    </StyledSplitPanel>
  );
});

Wrapper.displayName = 'MDSPanel.Wrapper';

const Header = forwardRef<HTMLDivElement, MDSPanelHeaderProps>((props, ref) => {
  const { children, onClose, style } = props;

  const isElement = isValidElement(children);

  return (
    <StyledHeader ref={ref} style={{ ...style }}>
      <div style={{ flex: 'auto' }}>
        {!isElement ? (
          <MDSTypography variant="title" size="xl" weight="semibold">
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
});

Header.displayName = 'MDSPanel.Header';

const Content = forwardRef<HTMLDivElement, MDSPanelBodyProps>((props, ref) => {
  const { children, style } = props;

  return (
    <StyledBody ref={ref} style={{ ...style }}>
      {children}
    </StyledBody>
  );
});

Content.displayName = 'MDSPanel.Content';

const Action = forwardRef<HTMLDivElement, MDSPanelActionProps>((props, ref) => {
  const { children, justifyContent = 'flex-end', style } = props;

  return (
    <StyledActions ref={ref} style={{ justifyContent, ...style }}>
      {children}
    </StyledActions>
  );
});

Action.displayName = 'MDSPanel.Action';

export const MDSPanel = {
  Wrapper,
  Header,
  Content,
  Action,
};
