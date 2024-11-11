import { useRef } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { MDSIcon } from '../Icon';
import { MDSTypography } from '../Typography';
import { borderRadius, theme } from './@constants';
import { useLazyLoad } from './@hooks/useLazyLoad';
import {
  ImageProps,
  RemoveBorderRadius,
  StyledErrorWrapperProps,
  StyledImageProps,
  StyledImageWrapperProps,
  StyledWrapperProps,
} from './@types';

const Wrapper = styled.div<StyledWrapperProps>`
  position: relative;
  display: grid;
  place-content: center;
  overflow: hidden;
  user-select: ${({ isDraggable }) => (isDraggable ? 'auto' : 'none')};
  pointer-events: ${({ isDraggable }) => (isDraggable ? 'auto' : 'none')};
  ${({ borderRadius }) => `
    border-radius: ${borderRadius.topLeft} ${borderRadius.topRight} ${borderRadius.bottomRight} ${borderRadius.bottomLeft};
  `}
  ${({ width, height, aspectRatio }) => `
    ${width ? `width: ${width};` : ''}
    ${height ? `height: ${height};` : ''}
    ${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
  `}
`;

const ErrorWrapper = styled.div<StyledErrorWrapperProps>`
  display: grid;
  place-content: center;
  justify-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  user-select: inherit;
  background-color: ${({ fallbackStyle }) => resolveColor(theme.color[fallbackStyle].backgroundColor)};
  ${({ fallbackStyle, iconSize }) => `
    border-style: solid;
    border-width: ${iconSize === 'x-small' || fallbackStyle === 'border' ? '1px' : '0'};
    border-color: ${resolveColor(theme.color[fallbackStyle].borderColor)};
  `}
`;

const ImageWrapper = styled.div<StyledImageWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: inherit;
  border-radius: inherit;
  background-color: ${resolveColor('color/bg/surface/neutral/default/normal')};
  ${({ borderColor }) => (borderColor ? `border: 1px solid ${resolveColor(borderColor)};` : '')}
`;

const Image = styled.img<StyledImageProps>`
  width: 100%;
  height: 100%;
  background-color: inherit;
  user-select: inherit;
  object-fit: ${({ objectFit }) => objectFit};
  object-position: ${({ objectPosition }) => objectPosition};
  filter: ${({ isLoaded }) => (isLoaded ? 'none' : `blur(10px)`)};
  transition: filter 0.3s;
`;

export const MDSImage = (props: ImageProps) => {
  const {
    children,
    isLoading,
    fallbackStyle,
    removeBorderRadius,
    iconSize: _iconSize,
    errorFallback = 'icon',
    src,
    alt,
    width,
    height,
    aspectRatio,
    objectFit = 'cover',
    objectPosition = 'center',
    borderColor,
    ...restProps
  } = props;

  const isIconVisible = errorFallback === 'icon' || errorFallback === 'both';
  const isTextVisible = errorFallback === 'text' || errorFallback === 'both';
  const iconSize = _iconSize && theme.size.iconSize[_iconSize];
  const color = theme.color[fallbackStyle].color;
  const borderRadius = getRadius(removeBorderRadius);

  const imageRef = useRef<HTMLImageElement>(null);

  const { isOnScreen, isLoaded, isError, onError, onLoad } = useLazyLoad(imageRef);

  return (
    <Wrapper width={width} height={height} aspectRatio={aspectRatio} borderRadius={borderRadius} {...restProps}>
      <ErrorWrapper fallbackStyle={fallbackStyle} iconSize={_iconSize}>
        {!isError ? (
          <MDSIcon.Image variant="outline" size={iconSize} color={color} />
        ) : (
          <>
            {isIconVisible && <MDSIcon.ImageNotSupported size={iconSize} color={color} />}
            {isTextVisible && (
              <MDSTypography variant="T20" weight="medium" color={color}>
                No image
              </MDSTypography>
            )}
          </>
        )}
      </ErrorWrapper>

      {!isLoading && !isError && (
        <ImageWrapper borderColor={borderColor}>
          <Image
            ref={imageRef}
            src={isOnScreen ? src : undefined}
            alt={alt}
            isLoaded={isLoaded}
            onLoad={onLoad}
            onError={onError}
            objectFit={objectFit}
            objectPosition={objectPosition}
            loading="lazy"
          />
          {children}
        </ImageWrapper>
      )}
    </Wrapper>
  );
};

const getRadius = (removeData?: RemoveBorderRadius) => {
  const topLeft = (typeof removeData !== 'boolean' && removeData?.topLeft) || removeData === true ? '0' : borderRadius;
  const topRight =
    (typeof removeData !== 'boolean' && removeData?.topRight) || removeData === true ? '0' : borderRadius;
  const bottomLeft =
    (typeof removeData !== 'boolean' && removeData?.bottomLeft) || removeData === true ? '0' : borderRadius;
  const bottomRight =
    (typeof removeData !== 'boolean' && removeData?.bottomRight) || removeData === true ? '0' : borderRadius;

  return { topLeft, topRight, bottomLeft, bottomRight };
};
