import { keyframes, Theme } from '@emotion/react';
import { MDSIcon } from '../../../atoms/Icon';
import { SnackbarType } from '../@types';
import { SNACKBAR_EXIT_CONFIG, SNACKBAR_STACK_CONFIG, SnackbarContentColor } from '../@constants';

export const calculateSnackbarStackProperties = (stackIndex: number) => {
  const translateY = stackIndex * SNACKBAR_STACK_CONFIG.STACK_OFFSET;
  const scale = 1 - stackIndex * SNACKBAR_STACK_CONFIG.SCALE_REDUCTION;
  const opacity = Math.max(SNACKBAR_STACK_CONFIG.MIN_OPACITY, 1 - stackIndex * SNACKBAR_STACK_CONFIG.OPACITY_REDUCTION);
  const zIndex = SNACKBAR_STACK_CONFIG.BASE_Z_INDEX - stackIndex;

  return { translateY, scale, opacity, zIndex };
};

export const createSnackbarEnterAnimation = (targetY: number, targetScale: number) => keyframes`
    0% {
        opacity: 0;
        transform: translateY(100px) scale(0.95) perspective(1000px) rotateX(15deg) translateZ(-20px);
    }
    60% {
        opacity: 0.6;
        transform: translateY(${targetY - 5}px) scale(${
  targetScale * 1.02
}) perspective(1000px) rotateX(2deg) translateZ(2px);
    }
    100% {
        opacity: 1;
        transform: translateY(${targetY}px) scale(${targetScale}) perspective(1000px) rotateX(0deg) translateZ(0px);
    }
`;

export const createSnackbarExitAnimation = (
  currentY: number,
  currentOpacity: number,
  stackIndex = 0,
  currentScale = 1
) => {
  const isStackedSnackbar = stackIndex > 0;
  const exitDistance = isStackedSnackbar
    ? SNACKBAR_EXIT_CONFIG.BASE_EXIT_DISTANCE + stackIndex * SNACKBAR_EXIT_CONFIG.STACK_INCREMENT
    : SNACKBAR_EXIT_CONFIG.BASE_EXIT_DISTANCE;
  const finalY = currentY - exitDistance;

  return keyframes`
      0% {
          opacity: ${currentOpacity};
          transform: translateY(${currentY}px) scale(${currentScale});
      }
      100% {
          opacity: 0;
          transform: translateY(${finalY}px) scale(${currentScale});
      }
  `;
};

export const resolveSnackbarBackgroundColor = (theme: Theme, type: SnackbarType) => {
  if (type === 'success') {
    return theme.color.bg.surface.success.default.normal;
  }

  if (type === 'error') {
    return theme.color.bg.surface.critical.default.normal;
  }

  if (type === 'warning') {
    return theme.color.bg.surface.warning.default.normal;
  }

  return theme.color.bg.surface.inverse.dark;
};

export const getSnackbarIconByType = (type: SnackbarType) => {
  const color = SnackbarContentColor[type].mainColor;

  switch (type) {
    case 'success':
    case 'complete':
      return <MDSIcon.Check size={20} variant="outline" color={color} />;
    case 'error':
    case 'warning':
      return <MDSIcon.Info size={20} variant="border" color={color} />;
  }
};
