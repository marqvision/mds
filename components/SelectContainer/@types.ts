import { HTMLAttributes, ReactElement, ReactNode } from 'react';
import { Path } from '../../@system/types';
import { MDSTheme } from '../../foundation';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

export type ContainerFeatures<T> = {
  selectedValue: string | string[];
  onClick: (value: T) => void;
  children: ReactElement | ReactElement[];
};

export type ItemFeatures = {
  main?: {
    icon: ReactNode;
    color: Path<Pick<MDSTheme, 'color'>>;
  };
  title: {
    label: string;
    icon?: ReactNode;
    color?: Path<Pick<MDSTheme, 'color'>>;
  };
  isSelected?: boolean;
  value: string;
  content: ReactNode;
  disabled?: boolean;
};

export type MDSSelectContainerProps<T = unknown> = ContainerFeatures<T> & HTMLAttributes<HTMLDivElement>;
export type MDSSelectContainerItemProps = ItemFeatures;
