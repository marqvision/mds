import { useState } from 'react';
import { ImageProps } from '../@types';
import { Thumbnail, UnwrapArray } from '../@types/custom';

export const useThumbnail = (props: Pick<ImageProps, 'src' | 'custom'>) => {
  const { src, custom } = props;
  const thumbnailProps = getCustomThumbnail(custom);

  const [thumbnailState, setThumbnailState] = useState<undefined | 'loaded' | 'error'>();

  if (!src || !thumbnailProps) return {};

  const filename = src.match(/([^/]+?)(?=\.\w+$)|([^/]+)$/) ?? [''];  // 확장자를 제외한 파일 이름만 추출
  const thumbnailSrc = src.replace(filename[0], filename[0] + thumbnailProps.suffix);

  const handleThumbnailLoad = () => {
    setThumbnailState('loaded');
  };

  const handleThumbnailError = () => {
    setThumbnailState('error');
  };

  return {
    thumbnailState,
    thumbnailSrc,
    handleThumbnailLoad,
    handleThumbnailError,
  };
};

const checkIsCustomThumbnail = (custom: UnwrapArray<ImageProps['custom']>): custom is Thumbnail => {
  return !!custom && 'type' in custom && custom.type === 'thumbnail';
};

const getCustomThumbnail = (custom: ImageProps['custom']): Thumbnail | undefined => {
  return Array.isArray(custom)
    ? (custom.find(checkIsCustomThumbnail))
    : checkIsCustomThumbnail(custom)
      ? custom
      : undefined;
};
