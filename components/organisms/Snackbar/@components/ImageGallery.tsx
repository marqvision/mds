import styled from '@emotion/styled';
import { MDSImage } from '../../../atoms/Image';
import { MDSTypography } from '../../../atoms/Typography';
import { ImageGalleryProps, ImageProps } from '../@types';

const Image = (props: ImageProps) => {
  const { src, size } = props;
  const isValidUrl = /^(http|https):\/\/[^ "]+$/.test(src);

  return isValidUrl ? (
    <MDSImage width={`${size.width}px`} height={`${size.height}px`} iconSize="small" aspectRatio="1" src={src} />
  ) : (
    <MDSImage width="64px" height="64px" iconSize="small" aspectRatio="1" src="" />
  );
};

export const ImageGallery = (props: ImageGalleryProps) => {
  const { images } = props;
  const imageCount = images.length;

  return (
    <ImageWrapper>
      <Image src={images[0]} size={{ width: 66, height: 66 }} />
      {imageCount > 1 && (
        <ImageStack>
          <Image src={images[1]} size={{ width: 32, height: 32 }} />
          {imageCount > 2 && (
            <>
              <Image src={images[2]} size={{ width: 32, height: 32 }} />
              {imageCount > 3 && (
                <ImageOverlay>
                  <MDSTypography variant="body" size="l" weight="medium" color="color/content/on_default_color">
                    +{imageCount - 3}
                  </MDSTypography>
                </ImageOverlay>
              )}
            </>
          )}
        </ImageStack>
      )}
    </ImageWrapper>
  );
};

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(Aux-Oiseaux_MOOD_Ay);
`;

const ImageWrapper = styled.div`
  display: flex;
`;

const ImageStack = styled.div`
  display: inline-grid;
  min-width: 32px;
  margin-left: 2px;
  gap: 2px;
`;
