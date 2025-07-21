import React from 'react';
import { MDSImageProps } from '../../../atoms/Image';
import { MDSThemeColorPath } from '../../../../types';

export type MessageBoxType = 'neutral' | 'default' | 'primary' | 'success' | 'warning' | 'critical';

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
};

export type MessageBoxProps = {
  type?: MessageBoxType;
  title: string;
  titleCTA?: {
    label: string | React.ReactElement;
    onClick?: () => void;
  };
  message?: string;
  messageCTA?: {
    label: string | React.ReactElement;
    onClick?: () => void;
  };
  width?: number;
  images?: (string | ImageData)[];
  closeControl?: {
    showButton: boolean;
    isVisible: boolean;
    onClose: () => void;
  };
  actionButton?: {
    dismissBefore?: boolean;
    text: string;
    onClick: () => void;
  };
} & React.HTMLAttributes<HTMLDivElement>;

export type MessageBoxStyleProps = {
  type?: MessageBoxType;
  width?: number;
};

export type MessageBoxContentColorMap = {
  [key in MessageBoxType]: {
    mainColor: MDSThemeColorPath;
  };
};
