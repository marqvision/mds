import styled from '@emotion/styled';
import { MDSImage } from '../../../atoms/Image';
import { MDSTypography } from '../../../atoms/Typography';
import { ImageGalleryProps, ImageProps, ImageData } from '../@types';

const Image = (props: ImageProps) => {
  const { src, width, children, ...restProps } = props;
  const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(src as string);

  if (isValidUrl) {
    return (
      <MDSImage width={width} aspectRatio="1" src={src} {...restProps}>
        {children}
      </MDSImage>
    );
  }

  return <MDSImage width="64px" iconSize="small" aspectRatio="1" src="" />;
};

const normalizeImageData = (image: string | ImageData, width: string): ImageProps => {
  if (typeof image === 'string') {
    return { src: image, width };
  }

  return {
    width,
    ...image,
  };
};

export const ImageGallery = (props: ImageGalleryProps) => {
  const { images } = props;
  const imageCount = images.length;

  return (
    <ImageWrapper>
      <Image {...normalizeImageData(images[0], '66px')} />
      {imageCount > 1 && (
        <ImageStack>
          <Image {...normalizeImageData(images[1], '32px')} />
          {imageCount > 2 && (
            <Image {...normalizeImageData(images[2], '32px')}>
              {imageCount > 3 && (
                <ImageOverlay>
                  <MDSTypography variant="body" size="l" weight="medium" color="color/content/on_default_color">
                    +{imageCount - 3}
                  </MDSTypography>
                </ImageOverlay>
              )}
            </Image>
          )}
        </ImageStack>
      )}
    </ImageWrapper>
  );
};

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const ImageStack = styled.div`
  display: inline-grid;
  margin-left: 2px;
  gap: 2px;
`;
