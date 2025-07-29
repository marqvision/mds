import { MessageBoxContentColorMap } from '../@types';

export const MessageBoxContentColor: MessageBoxContentColorMap = {
  neutral: {
    mainColor: 'color/content/neutral/default/normal',
  },
  default: {
    mainColor: 'color/content/neutral/default/normal',
  },
  primary: {
    mainColor: 'color/content/neutral/default/normal',
  },
  success: {
    mainColor: 'color/content/success/default/normal',
  },
  warning: {
    mainColor: 'color/content/warning/default/normal',
  },
  critical: {
    mainColor: 'color/content/critical/default/normal',
  },
} as const;
