import { ReactElement, ReactNode } from 'react';
import { Path } from '../../@system/types';
import { MDSTheme } from '../../foundation';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

type ContainerFeatures<T> = {
  value: T;
  children: ReactElement | ReactElement[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'left' | 'center';
};

export type StyledWrapperProps = {
  orientation: 'horizontal' | 'vertical';
};

type ItemFeatures<T> = {
  main?: {
    icon: ReactNode;
    color: Path<Pick<MDSTheme, 'color'>>;
  };
  title: {
    label: string;
    icon?: ReactNode;
    color?: Path<Pick<MDSTheme, 'color'>>;
    tag?: ReactNode;
  };
  value: T;
  onClick: (value: T) => void;
  content?: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  isVariantCenter?: boolean;
};

export type SelectContainerItemFeatures = {
  disabled?: boolean;
  isSelected?: boolean;
  isVariantCenter?: boolean;
};

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export type MDSSelectContainerProps<T> = ContainerFeatures<T>;
export type MDSSelectContainerItemProps<T> = ItemFeatures<T>;
