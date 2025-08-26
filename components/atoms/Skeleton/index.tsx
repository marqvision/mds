import { CircleProps, Props, RectProps, TextProps, Variant } from './@types';
import { Styled } from './Styled';
import { checkVariantCircle, checkVariantRect, checkVariantText } from './@utils';

export const MDSSkeleton = <V extends Variant>(_props: Props<V>) => {
  // 전체 props 에 대한 기본값 설정
  const props = {
    ..._props,
    display: _props.display || 'block',
    variant: _props.variant || 'body',
  } satisfies Props<V>;

  if (checkVariantText(props)) {
    // Text variant 에 대한 기본값 설정
    const defaultProps: Required<TextProps> = {
      ...props,
      width: props.width || '100%',
      size: props.size || 'm',
    };
    return <Styled.text {...defaultProps} />;
  }

  if (checkVariantCircle(props)) {
    // Circle variant 에 대한 기본값 설정
    const defaultProps: Required<CircleProps> = {
      ...props,
      size: props.size || '100%',
    };
    return <Styled.circle {...defaultProps} />;
  }

  if (checkVariantRect(props)) {
    // Rect variant 에 대한 기본값 설정
    const defaultProps: Required<RectProps> = {
      ...props,
      width: props.width || '100%',
      height: props.height || '100%',
      borderRadius: props.borderRadius || '4px',
    };
    return <Styled.rect {...defaultProps} />;
  }
};

export type { Props as MDSSkeletonProps } from './@types';
