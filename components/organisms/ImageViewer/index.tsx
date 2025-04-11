import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MDSDimmed } from '../Dimmed';
import { MDSIcon } from '../../atoms/Icon';
import { MDSImage } from '../../atoms/Image';
import { ImageViewerProps } from './@types';

export type MDSImageViewerProps = ImageViewerProps;

const StyledScrollWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  text-align: center;
  overflow-y: auto;
  font-size: 0;
  padding: 40px;
`;

const StyledImageWrapper = styled.div`
  display: inline-block;
  max-width: min(100%, 1280px + 80px);
`;

const StyledLoading = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledZoomButton = styled.div`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};

  &:hover {
    background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.hover};
  }
`;

export const MDSImageViewer = (props: ImageViewerProps) => {
  const { image, renderAnchor } = props;

  const timeoutRef = useRef<NodeJS.Timeout>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const imageSrc = typeof image === 'string' ? image : image.src;
  const imageChildren = typeof image === 'string' ? undefined : image.overlay;

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    timeoutRef.current = setTimeout(() => {
      setIsLoaded(false);
    }, 350);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <MDSDimmed intensity="strong" padding="0" isOpen={isOpen} onClose={handleClose}>
        <StyledScrollWrapper onClick={handleClose}>
          <StyledImageWrapper onClick={(event) => event.stopPropagation()}>
            <MDSImage
              src={imageSrc}
              errorFallback="both"
              iconSize="large"
              maxWidth="100%"
              onLoad={handleLoad}
              onError={handleLoad}
            >
              {imageChildren}
            </MDSImage>
            {!isLoaded && (
              <StyledLoading>
                <MDSIcon.Image variant="outline" size={46} color="color/content/inverse/default/normal" />
              </StyledLoading>
            )}
          </StyledImageWrapper>
        </StyledScrollWrapper>
      </MDSDimmed>
      {renderAnchor({
        open: handleOpen,
        defaultButton: (
          <StyledZoomButton onClick={handleOpen}>
            <MDSIcon.ZoomIn />
          </StyledZoomButton>
        ),
      })}
    </>
  );
};
