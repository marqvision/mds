import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useSnackbar } from '../@hooks/useSnackbarManager';
import {
  createSnackbarEnterAnimation,
  createSnackbarExitAnimation,
  getSnackbarIconByType,
  resolveSnackbarBackgroundColor,
} from '../@utils';
import { SnackbarItemStyleProps, SnackbarProps } from '../@types';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { SNACKBAR_TIMEOUTS, SnackbarContentColor } from '../@constants';
import { ImageGallery } from './ImageGallery';

export const SnackbarItem = (props: SnackbarProps) => {
  const { snackbar, isHidden, stackIndex, onRemove } = props;
  const { width, images, customIcon, showCloseButton, type, title, message, actionButton } = snackbar;
  const { isEntering, isExiting, translateY, scale, opacity, zIndex, handleCloseClick } = useSnackbar(
    snackbar,
    stackIndex,
    onRemove
  );

  const [shouldBlur, setShouldBlur] = useState(isHidden);
  const [isBlurFadingOut, setIsBlurFadingOut] = useState(false);

  useEffect(() => {
    if (isHidden && !shouldBlur) {
      setShouldBlur(true);
      setIsBlurFadingOut(false);
    } else if (!isHidden && shouldBlur) {
      setIsBlurFadingOut(true);

      const timer = setTimeout(() => {
        setShouldBlur(false);
        setIsBlurFadingOut(false);
      }, SNACKBAR_TIMEOUTS.BLUR_FADE_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isHidden, shouldBlur]);

  const handleActionButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (actionButton?.dismissBefore) {
      handleCloseClick(e);
    }

    if (actionButton?.event) {
      actionButton.event();
    }
  };

  const mainColor = SnackbarContentColor[type].mainColor;
  const closeIconColor = SnackbarContentColor[type].closeIconColor;
  const messageTextColor = SnackbarContentColor[type].messageTextColor;
  const undoButtonTextColor = SnackbarContentColor[type].undoButtonTextColor;
  const resolvedIcon = getSnackbarIconByType(type);

  const className = `${isEntering ? 'snackbar-entering' : ''} ${isExiting ? 'snackbar-exiting' : ''}`.trim();

  return (
    <SnackbarItemStyles
      width={width}
      type={type}
      translateY={translateY}
      scale={scale}
      opacity={opacity}
      zIndex={zIndex}
      stackIndex={stackIndex}
      className={className}
    >
      <SnackbarInnerContainer isHidden={shouldBlur} isBlurFadingOut={isBlurFadingOut}>
        <SnackbarContentWrapper>
          {images && <ImageGallery images={images} />}
          <SnackbarTextContainer>
            <SnackbarTitleContainer>
              {customIcon || resolvedIcon}

              <MDSTypography variant="title" weight="medium" color={mainColor}>
                {title}
              </MDSTypography>
            </SnackbarTitleContainer>
            {message && (
              <MDSTypography variant="body" lineClamp={2} wordBreak="break-all" color={messageTextColor}>
                {message}
              </MDSTypography>
            )}
          </SnackbarTextContainer>
        </SnackbarContentWrapper>
        <SnackbarActionsContainer>
          {actionButton && (
            <MDSPlainButton color="blue" onClick={handleActionButtonClick}>
              <MDSTypography weight="medium" color={undoButtonTextColor}>
                {actionButton.text}
              </MDSTypography>
            </MDSPlainButton>
          )}
          {showCloseButton && (
            <MDSPlainButton onClick={handleCloseClick}>
              <MDSIcon.CloseDelete variant="border" size={20} color={closeIconColor} />
            </MDSPlainButton>
          )}
        </SnackbarActionsContainer>
      </SnackbarInnerContainer>
      {shouldBlur && <BlurOverlay isBlurFadingOut={isBlurFadingOut} />}
    </SnackbarItemStyles>
  );
};

const SnackbarItemStyles = styled.div<SnackbarItemStyleProps>`
  ${({ theme, width, type, translateY, stackIndex, scale, opacity, zIndex }) => {
    const backgroundColor = resolveSnackbarBackgroundColor(theme, type);
    const enterAnimation = createSnackbarEnterAnimation(translateY, scale);
    const exitAnimation = createSnackbarExitAnimation(translateY, opacity, stackIndex, scale);

    return css`
      position: fixed;
      bottom: 24px;
      margin: 0 16px;
      padding: 12px 16px;
      border-radius: 8px;
      background-color: ${backgroundColor};
      box-shadow: 0px 8px 16px 0px #00000033, 0px 0px 2px 0px #00000029;
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 320px;
      width: ${width ? `${width}px` : 'auto'};
      max-width: 800px;
      z-index: ${zIndex};
      transform: translateY(${translateY}px) scale(${scale});
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &.snackbar-entering {
        opacity: 0;
        transform: translateY(100px) scale(0.95);
        animation: ${enterAnimation} 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }

      &.snackbar-exiting {
        animation: ${exitAnimation} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      }
    `;
  }}
`;

const BlurOverlay = styled.div<{ isBlurFadingOut?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(1px);
  -webkit-backdrop-filter: blur(1px);
  border-radius: 8px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-out, backdrop-filter 0.2s ease-out, -webkit-backdrop-filter 0.2s ease-out;

  ${({ isBlurFadingOut }) =>
    isBlurFadingOut &&
    css`
      opacity: 0;
      backdrop-filter: blur(0px);
      -webkit-backdrop-filter: blur(0px);
    `}
`;

const SnackbarInnerContainer = styled.div<{ isHidden?: boolean; isBlurFadingOut?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 16px;
  justify-content: space-between;
  position: relative;
  transition: filter 0.2s ease-out;

  ${({ isHidden, isBlurFadingOut }) =>
    isHidden &&
    css`
      filter: blur(1px);

      ${isBlurFadingOut &&
      css`
        filter: blur(0px);
      `}
    `}
`;

const SnackbarContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 100%;
  flex: 1;
`;

const SnackbarTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const SnackbarTitleContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const SnackbarActionsContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
