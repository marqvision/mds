import { JSX, PropsWithChildren, ReactElement, ReactNode, MouseEvent } from 'react';
import { MDSThemeColorPath } from '../../../types';

export type TabTheme = 'light' | 'dark';
export type TabSize = 'small' | 'medium' | 'large' | 'x-large';

export type TabsProps<T> = PropsWithChildren<{
  size?: TabSize;
  withTitle?: boolean;
  value: T;
  onChange: (value: T) => void;
  theme?: TabTheme;
  bgColor?: MDSThemeColorPath;
}>;

export type PublicTextItemProps<T> = PropsWithChildren<{
  value: T;
  onClick?: (e: MouseEvent, value: T) => void;
  tags?: ReactElement | ReactElement[];
}>;

export type PublicCardItemProps<T> = {
  value: T;
  onClick?: (e: MouseEvent, value: T) => void;
  title: ReactNode;
  description: ReactNode;
  tags?: ReactElement | ReactElement[];
};

export type InternalTabProps = {
  size?: TabSize;
  isSelected?: boolean;
  withTitle?: boolean;
  theme?: TabTheme;
};

export type TextItemComp = <T>(props: PublicTextItemProps<T>) => JSX.Element;
export type CardItemComp = <T>(props: PublicCardItemProps<T>) => JSX.Element;
