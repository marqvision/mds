import React, { ReactNode } from 'react';
import { MDSImageProps } from '../../../atoms/Image';
import { MDSThemeColorPath } from '../../../../types';
import { MDSPlainButtonProps } from '../../PlainButton';

export type MessageBoxType = 'neutral' | 'default' | 'primary' | 'success' | 'warning' | 'critical';

export type MessageBoxCTA = React.ReactElement | { label: string; onClick: () => void };

export type MessageBoxActionButton = {
  label: string | ReactNode;
  dismissBefore?: boolean;
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
};

export type MessageBoxProps = {
  type?: MessageBoxType;
  titleIcon?: ReactNode;

  title: string;
  message?: string;
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
