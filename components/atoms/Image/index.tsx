import React, { forwardRef, useRef } from 'react';
import styled from '@emotion/styled';
import { resolveColor } from '../../../utils';
import { MDSIcon } from '../Icon';
import { MDSTypography } from '../Typography';
import { BORDER_RADIUS, THEME } from './@constants';
import { useHover } from './@hooks/useHover';
import { useLazyLoad } from './@hooks/useLazyLoad';
import { useThumbnail } from './@hooks/useThumbnail';
import {
  ImageProps,
  RemoveBorderRadius,
  StyledErrorWrapperProps,
  StyledHoverWrapperProps,
  StyledImageProps,
  StyledImageWrapperProps,
  StyledWrapperProps,
} from './@types';

export type MDSImageProps = ImageProps;

const Wrapper = styled.div<StyledWrapperProps>`
  position: relative;
  display: grid;
  place-content: center;
  overflow: hidden;
  ${({ borderRadius }) => `
    border-radius: ${borderRadius.topLeft} ${borderRadius.topRight} ${borderRadius.bottomRight} ${borderRadius.bottomLeft};
  `}
  ${({ width, height, aspectRatio, minWidth, minHeight, maxWidth, maxHeight }) => `
    ${width ? `width: ${width};` : ''}
    ${height ? `height: ${height};` : ''}
    ${aspectRatio ? `aspect-ratio: ${aspectRatio};` : ''}
    ${minWidth ? `min-width: ${minWidth};` : ''}
    ${minHeight ? `min-height: ${minHeight};` : ''}
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
    ${maxHeight ? `max-height: ${maxHeight};` : ''}
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
  pointer-events: ${({ isDraggable }) => (isDraggable ? 'auto' : 'none')};
  background-color: ${({ fallbackStyle }) => resolveColor(THEME.color[fallbackStyle].backgroundColor)};
  ${({ fallbackStyle, iconSize }) => `
    border-style: solid;
    border-width: ${iconSize === 'x-small' || fallbackStyle === 'border' ? '1px' : '0'};
    border-color: ${resolveColor(THEME.color[fallbackStyle].borderColor)};
  `}
  opacity: ${({ isLoaded }) => (isLoaded ? '0' : '1')};
  transition: opacity 0.3s;
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
  pointer-events: ${({ isDraggable }) => (isDraggable ? 'auto' : 'none')};
  ${({ borderColor }) => (borderColor ? `border: 1px solid ${resolveColor(borderColor)};` : '')}
`;

const HoverWrapper = styled.div<StyledHoverWrapperProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme._raw_color.blackAlpha50};
  transition: opacity 0.3s;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  user-select: none;
  @starting-style {
    opacity: 0;
  }
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

export const MDSImage = forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    children,
    isLoading,
    fallbackStyle = 'tint',
    removeBorderRadius,
    iconSize: _iconSize = 'medium',
    errorFallback = 'icon',
    src,
    alt,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    aspectRatio,
    objectFit = 'cover',
    objectPosition = 'center',
    borderColor,
    custom,
    isDraggable = false,
    onLoad: _onLoad,
    onError: _onError,
    ...restProps
  } = props;

  const isIconVisible = errorFallback === 'icon' || errorFallback === 'both';
  const isTextVisible = errorFallback === 'text' || errorFallback === 'both';
  const iconSize = _iconSize && THEME.size.iconSize[_iconSize];
  const color = THEME.color[fallbackStyle].color;
  const borderRadius = getRadius(removeBorderRadius);

  const imageRef = useRef<HTMLImageElement>(null);

  const { isOnScreen, isLoaded, isError: isLoadError, onError, onLoad, size } = useLazyLoad(imageRef);
  const { Element: HoverElement, hoverWrapperProps, wrapperProps } = useHover(custom);
  const { thumbnailSrc, thumbnailState, handleThumbnailError, handleThumbnailLoad } = useThumbnail({ src, custom });

  const isError = isLoadError || (!isLoading && !src);
  const wrapperWidth = width || (!aspectRatio ? `${size?.width}px` : undefined);
  const wrapperHeight = width && height ? height || (!aspectRatio ? `${size?.height}px` : undefined) : undefined;
  const wrapperAspectRatio = aspectRatio || `${size?.width}/${size?.height}`;

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    _onLoad?.(event);
    onLoad(event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    _onError?.(event);
    onError();
  };

  const imageWrapperProps: StyledImageWrapperProps = {
    isDraggable,
    borderColor,
  };

  const commonImageProps = {
    alt,
    objectFit,
    objectPosition,
    loading: 'lazy',
  } satisfies Partial<StyledImageProps & React.ImgHTMLAttributes<HTMLImageElement>>;

  return (
    <Wrapper
      ref={ref}
      width={wrapperWidth}
      height={wrapperHeight}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      aspectRatio={wrapperAspectRatio}
      borderRadius={borderRadius}
      {...restProps}
      {...wrapperProps}
    >
      <ErrorWrapper
        isDraggable={isDraggable}
        fallbackStyle={fallbackStyle}
        iconSize={_iconSize}
        isLoaded={!isLoading && isLoaded}
      >
        {!isError ? (
          <MDSIcon.Image variant="outline" size={iconSize} color={color} />
        ) : (
          <>
            {isIconVisible && <MDSIcon.ImageNotSupported size={iconSize} color={color} />}
            {isTextVisible && (
              <MDSTypography variant="title" size="xl" weight="medium" color={color}>
                No image
              </MDSTypography>
            )}
          </>
        )}
      </ErrorWrapper>

      {!isLoading && thumbnailSrc && thumbnailState !== 'error' ? (
        <ImageWrapper {...imageWrapperProps}>
          <Image
            ref={imageRef}
            src={isOnScreen ? thumbnailSrc : undefined}
            isLoaded={thumbnailState === 'loaded'}
            onLoad={handleThumbnailLoad}
            onError={handleThumbnailError}
            {...commonImageProps}
          />
        </ImageWrapper>
      ) : (
        !isLoading &&
        !isError && (
          <ImageWrapper {...imageWrapperProps}>
            <Image
              ref={imageRef}
              src={isOnScreen ? src : undefined}
              isLoaded={isLoaded}
              onLoad={handleLoad}
              onError={handleError}
              {...commonImageProps}
            />
          </ImageWrapper>
        )
      )}
      {children}
      {HoverElement && <HoverWrapper {...hoverWrapperProps}>{HoverElement}</HoverWrapper>}
    </Wrapper>
  );
});
MDSImage.displayName = 'MDSImage';

const getRadius = (removeData?: RemoveBorderRadius) => {
  const topLeft = (typeof removeData !== 'boolean' && removeData?.topLeft) || removeData === true ? '0' : BORDER_RADIUS;
  const topRight =
    (typeof removeData !== 'boolean' && removeData?.topRight) || removeData === true ? '0' : BORDER_RADIUS;
  const bottomLeft =
    (typeof removeData !== 'boolean' && removeData?.bottomLeft) || removeData === true ? '0' : BORDER_RADIUS;
  const bottomRight =
    (typeof removeData !== 'boolean' && removeData?.bottomRight) || removeData === true ? '0' : BORDER_RADIUS;

  return { topLeft, topRight, bottomLeft, bottomRight };
};
