import { ImageData } from './@types';

export const getInitialIndex = <Image extends string | ImageData>(list: Image[], value: Image) => {
  return list.findIndex((item) =>
    typeof value !== 'string' && typeof item !== 'string'
      ? item.src === value.src
      : item === value
  );
};

export const getImageData = <Image extends string | ImageData>(image: Image): ImageData => {
  if (typeof image === 'string') return { src: image };
  return image;
};

export const downloadImage = async (src: string) => {
  try {
    const response = await fetch(src);
    if (!response.ok) throw new Error('Fetch failed');

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = src.split('/').pop() || 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch {
    window.open(src, '_blank');
  }
};