import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Path } from '../../@system/types';
import { MDSTheme } from '../../foundation';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

export type ContainerFeatures<T> = {
  value: T;
  children: ReactElement | ReactElement[];
};

export type ItemFeatures<T> = {
  main?: {
    icon: ReactNode;
    color: Path<Pick<MDSTheme, 'color'>>;
  };
  title: {
    label: string;
    icon?: ReactNode;
    color?: Path<Pick<MDSTheme, 'color'>>;
  };
  value: T;
  onClick: (value: T) => void;
  content: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
};

export type MDSSelectContainerProps<T> = ContainerFeatures<T>;
export type MDSSelectContainerItemProps<T> = ItemFeatures<T>;
