import { CircleProps, Props, RectProps, TextProps, Variant } from './@types';

export const parsePixelSize = (size: string | number): string => {
  if (typeof size === 'number') {
    return `${size}px`;
  }
  return size;
};

export const checkVariantText = (props: Props<Variant>): props is TextProps => {
  return props.variant === 'title' || props.variant === 'body';
};

export const checkVariantCircle = (props: Props<Variant>): props is CircleProps => {
  return props.variant === 'circle';
};

export const checkVariantRect = (props: Props<Variant>): props is RectProps => {
  return props.variant === 'rect';
};