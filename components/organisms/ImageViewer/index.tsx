import { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../atoms/Icon';
import { MDSImage } from '../../atoms/Image';
import { MDSDimmed } from '../Dimmed';
import { Header } from './@components/Header';
import { useImageNavigation } from './@hooks/useImageNavigation';
import { ImageData, ImageViewerProps, InnerProps } from './@types';
import { getImageData } from './@utils';

const Styled = {
  Wrapper: styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
    overflow-y: auto;
  `,
  ScrollWrapper: styled.div`
    width: 100%;
    min-height: 100%;
    height: max-content;
    display: grid;
    place-items: center;
    text-align: center;
    font-size: 0;
    padding: 0 40px 40px;
  `,
  ImageWrapper: styled.div`
    margin: auto 0;
    display: inline-block;
    max-width: min(100%, 1280px + 80px);
    overflow: hidden;
  `,
  Loading: styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  `,
  ZoomButton: styled.div`
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
  `,
  Image: styled(MDSImage)<{ isLoaded: boolean }>`
    transition: opacity 200ms;
    opacity: ${({ isLoaded }) => isLoaded ? 1 : 0};
  `,
};

export type MDSImageViewerProps<Image extends string | ImageData> = ImageViewerProps<Image>;

const Inner = <Image extends string | ImageData>(props: InnerProps<Image>) => {
  const { image, list: _list, onClose } = props;

  const list = useMemo<Image[]>(() => {
    const list = _list || [];
    const hasImage = list.some((item) => getImageData(item).src === getImageData(image).src);
    // 타겟 이미지가 리스트 내에 없으면 첫번째 아이템으로 추가
    return hasImage ? list : [image, ...list];
  }, [_list, image]);

  const imageNavigation = useImageNavigation(list, image);
  const { currentIndex, isLoading, changeLoading } = imageNavigation;

  const currentImage = getImageData(list[currentIndex]);

  const handleLoad = () => {
    changeLoading(false);
  };

  return (
    <>
      <Styled.Wrapper>
        <Header currentImage={currentImage} {...imageNavigation} onClose={onClose} />
        <Styled.ScrollWrapper onClick={onClose}>
          <Styled.ImageWrapper onClick={(event) => event.stopPropagation()}>
            <Styled.Image
              src={currentImage.src}
              errorFallback="both"
              iconSize="large"
              maxWidth="100%"
              onLoad={handleLoad}
              onError={handleLoad}
              isLoaded={!isLoading}
            >
              {currentImage.overlay}
            </Styled.Image>
          </Styled.ImageWrapper>
        </Styled.ScrollWrapper>
      </Styled.Wrapper>
      {isLoading && (
        <Styled.Loading>
          <MDSIcon.Image variant="outline" size={46} color="color/content/inverse/default/normal" />
        </Styled.Loading>
      )}
    </>
  );
};

export const MDSImageViewer = <Image extends string | ImageData>(props: ImageViewerProps<Image>) => {
  const { renderAnchor } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <MDSDimmed
        intensity="strong"
        padding="0"
        isOpen={isOpen}
        onClose={handleClose}
        style={{ flexDirection: 'column' }}
      >
        <Inner onClose={handleClose} {...props} />
      </MDSDimmed>
      {renderAnchor({
        open: handleOpen,
        defaultButton: (
          <Styled.ZoomButton onClick={handleOpen}>
            <MDSIcon.ZoomIn />
          </Styled.ZoomButton>
        ),
      })}
    </>
  );
};
