import { ReactElement, ReactNode } from 'react';
import { MDSThemeColorPath } from '../../../types';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

type ContainerFeatures<T> = {
  value: T;
  children: ReactElement | ReactElement[];
  variant?: 'left' | 'center';
  orientation: 'horizontal' | 'vertical';
  itemSizing?: 'fit' | number;
};

export type StyledWrapperProps = {
  orientation: 'horizontal' | 'vertical';
};

type ItemFeatures<T> = {
  main?: {
    icon: ReactNode;
    color: MDSThemeColorPath;
  };
  title: {
    label: string;
    icon?: ReactNode;
    color?: MDSThemeColorPath;
    tag?: ReactNode;
  };
  value: T;
  onClick: (value: T) => void;
  content?: ReactNode;
  disabled?: boolean;
  isSelected?: boolean;
  isVariantCenter?: boolean;
  orientation?: 'horizontal' | 'vertical';
  itemSizing?: 'fit' | number;
};

export type SelectContainerItemFeatures = {
  disabled?: boolean;
  isSelected?: boolean;
  isVariantCenter?: boolean;
  orientation?: 'horizontal' | 'vertical';
  itemSizing?: 'fit' | number;
};

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export type MDSSelectContainerProps<T> = ContainerFeatures<T>;
export type MDSSelectContainerItemProps<T> = ItemFeatures<T>;
