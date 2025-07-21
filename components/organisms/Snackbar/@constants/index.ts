import { MDSThemeColorPath } from '../../../../types';
import { SnackbarType } from '../@types';

export const SNACKBAR_STACK_CONFIG = {
  STACK_OFFSET: 8, // 스택 레벨당 Y 오프셋 (음수는 위로 이동)
  SCALE_REDUCTION: 0.05, // 각 스택 레벨마다 축소되는 비율
  OPACITY_REDUCTION: 0.15, // 스택 레벨당 투명도 감소량
  MIN_OPACITY: 0.7, // 스택된 토스트의 최소 투명도
  BASE_Z_INDEX: 1000, // 최상위 토스트의 기본 z-index
} as const;

export const SNACKBAR_EXIT_CONFIG = {
  BASE_EXIT_DISTANCE: 30, // 종료 이동 거리
  STACK_INCREMENT: 15, // 스택 인덱스당 추가 이동 거리
} as const;

// 스낵바 타임아웃 설정
export const SNACKBAR_TIMEOUTS = {
  BLUR_FADE_DURATION: 200, // 스낵바 블러 효과 페이드 지속 시간 (milliseconds)
  ENTER_ANIMATION_DURATION: 450, // 스낵바 진입 애니메이션 지속 시간 (milliseconds)
  EXIT_ANIMATION_DURATION: 300, // 스낵바 종료 애니메이션 지속 시간 (milliseconds)
  DEFAULT_SNACKBAR_DURATION: 7000, // 스낵바 default 표시 시간 (milliseconds)
} as const;

export const MAX_SNACKBARS = 15;

export const SnackbarContentColor: Record<
  SnackbarType,
  {
    mainColor: MDSThemeColorPath;
    messageTextColor: MDSThemeColorPath;
    closeIconColor: MDSThemeColorPath;
    undoButtonTextColor?: MDSThemeColorPath;
  }
> = {
  success: {
    mainColor: 'color/content/success/default/normal',
    messageTextColor: 'color/content/neutral/default/normal',
    closeIconColor: 'color/content/neutral/default/normal',
    undoButtonTextColor: 'color/content/primary/default/normal',
  },
  error: {
    mainColor: 'color/content/critical/default/normal',
    messageTextColor: 'color/content/neutral/default/normal',
    closeIconColor: 'color/content/neutral/default/normal',
    undoButtonTextColor: 'color/content/primary/default/normal',
  },
  warning: {
    mainColor: 'color/content/warning/default/normal',
    messageTextColor: 'color/content/neutral/default/normal',
    closeIconColor: 'color/content/neutral/default/normal',
    undoButtonTextColor: 'color/content/primary/default/normal',
  },
  complete: {
    mainColor: 'color/content/inverse/default/normal',
    messageTextColor: 'color/content/inverse/default/normal',
    closeIconColor: 'color/content/inverse/default/normal',
    undoButtonTextColor: 'color/content/inverse/primary',
  },
};
