import styled from '@emotion/styled';
import { MDSImage } from '../../../atoms/Image';
import { MDSTypography } from '../../../atoms/Typography';
import { ImageGalleryProps, ImageProps } from '../@types';
import { normalizeImageData } from '../@utils';
import { ImageSizes } from '../@constants';

const Image = (props: ImageProps) => {
  const { src, width, children, ...restProps } = props;
  const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(src as string);

  return isValidUrl ? (
    <MDSImage width={width} aspectRatio="1" src={src} {...restProps}>
      {children}
    </MDSImage>
  ) : (
    <MDSImage width="64px" iconSize="small" aspectRatio="1" src="" />
  );
};

export const ImageGallery = (props: ImageGalleryProps) => {
  const { images, size = 'default' } = props;
  const imageCount = images.length;
  const currentSizes = ImageSizes[size];

  return (
    <ImageWrapper>
      <Image {...normalizeImageData(images[0], currentSizes.big)} />
      {imageCount > 1 && (
        <ImageStack>
          <Image {...normalizeImageData(images[1], currentSizes.small)} />
          {imageCount > 2 && (
            <Image {...normalizeImageData(images[2], currentSizes.small)}>
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
