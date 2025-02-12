import { ReactElement, ReactNode } from 'react';
import { MDSThemeColorPath } from '../../foundation';

// Figma https://www.figma.com/file/3UJ0kZhf62nuG9erDNzLc6/MDS?type=design&node-id=8140-3261&mode=design&t=WFZGdzrmqN5f7Llc-0

type OrientationRequiredProps =
  | {
      orientation: 'vertical';
      orientationType: 'fixed';
      fixedHeightValue: number;
      fixedWidthValue?: never;
    }
  | {
      orientation?: 'horizontal';
      orientationType: 'fixed';
      fixedWidthValue: number;
      fixedHeightValue?: never;
    }
  | {
      orientation: 'horizontal' | 'vertical';
      orientationType: 'fit' | 'hug';
      fixedHeightValue?: never;
      fixedWidthValue?: never;
    }
  | {
      orientation?: never;
      orientationType?: never;
      fixedHeightValue?: never;
      fixedWidthValue?: never;
    };

type ContainerFeatures<T> = OrientationRequiredProps & {
  value: T;
  children: ReactElement | ReactElement[];
  variant?: 'left' | 'center';
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
  orientationType?: 'fit' | 'fixed' | 'hug';
  fixedHeightValue?: number;
  fixedWidthValue?: number;
};

export type SelectContainerItemFeatures = {
  disabled?: boolean;
  isSelected?: boolean;
  isVariantCenter?: boolean;
  orientation?: 'horizontal' | 'vertical';
  orientationType?: 'fit' | 'fixed' | 'hug';
  fixedHeightValue?: number;
  fixedWidthValue?: number;
};

export type UnwrapArray<T> = T extends (infer U)[] ? U : T;

export type MDSSelectContainerProps<T> = ContainerFeatures<T>;
export type MDSSelectContainerItemProps<T> = ItemFeatures<T>;
