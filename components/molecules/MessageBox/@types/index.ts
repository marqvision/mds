import React, { ReactNode } from 'react';
import { MDSImageProps } from '../../../atoms/Image';
import { MDSThemeColorPath } from '../../../../types';
import { MDSPlainButtonProps } from '../../PlainButton';

export type MessageColorType = 'white' | 'bluegray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'teal';
export type MessageVariantType = 'default' | 'small';

export type MessageBoxCTA = React.ReactElement | { label: string; onClick: () => void };

export type MessageBoxActionButton = {
  label: string | ReactNode;
} & Omit<MDSPlainButtonProps, 'children' | 'icon'>;

export type ImageData = MDSImageProps & {
  src: string;
};

export type ImageProps = MDSImageProps & {
  src: string;
  width?: string;
  height?: string;
};

export type ImageGalleryProps = {
  images: (string | ImageData)[];
  size?: MessageVariantType;
};

export type ImageSizesType = {
  readonly [K in MessageVariantType]: {
    readonly big: string;
    readonly small: string;
  };
};

export type MessageBoxProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  color?: MessageColorType;
  titleIcon?: ReactNode;
  size?: MessageVariantType;
  title: string | React.ReactNode;
  message?: string | React.ReactNode;
  titleCTA?: MessageBoxCTA;
  messageCTA?: MessageBoxCTA;
  width?: number;
  images?: (string | ImageData)[];
  closeControl?: {
    showButton: boolean;
    isVisible: boolean;
    onClose: () => void;
  };
  actionButton?: MessageBoxActionButton;
};

export type MessageBoxStyleProps = {
  color?: MessageColorType;
  width?: number;
  size?: MessageVariantType;
};

export type MessageBoxContentColorMap = {
  [key in MessageColorType]: {
    mainColor: MDSThemeColorPath;
  };
};
