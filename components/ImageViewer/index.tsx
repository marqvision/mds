import React, { useState } from 'react';
import styled from '@emotion/styled';
import { MDSDimmed } from '../Dimmed';
import { MDSIcon } from '../Icon';
import { MDSImage } from '../Image';
import { ImageViewerProps } from './@types';

export type MDSImageViewerProps = ImageViewerProps;

const StyledScrollWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  text-align: center;
  overflow-y: auto;
  font-size: 0;
`;

const StyledImageWrapper = styled.div`
  display: inline-block;
  max-width: min(100%, 1280px + 80px);
  padding: 40px;
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
  const { url, children, ...restProps } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget !== event.target) return;
    setIsOpen(false);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      <MDSDimmed intensity="strong" padding="0" isOpen={isOpen} onClose={handleClose}>
        <StyledScrollWrapper onClick={handleClose}>
          <StyledImageWrapper onClick={handleClose}>
            {!isLoaded && <MDSIcon.Image variant="outline" size={46} color="color/content/inverse/default/normal" />}
            <MDSImage
              src={url}
              errorFallback="both"
              iconSize="large"
              maxWidth="100%"
              onLoad={handleLoad}
              onError={handleLoad}
            />
          </StyledImageWrapper>
        </StyledScrollWrapper>
      </MDSDimmed>
      {children ? (
        children(handleOpen)
      ) : (
        <MDSImage
          src={url}
          {...restProps}
          custom={{
            type: 'hover',
            element: (
              <StyledZoomButton onClick={handleOpen}>
                <MDSIcon.ZoomIn />
              </StyledZoomButton>
            ),
          }}
        />
      )}
    </>
  );
};
