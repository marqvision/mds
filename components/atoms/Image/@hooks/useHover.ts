import { useRef, useState } from 'react';
import { ImageProps } from '../@types';
import { Hover, UnwrapArray } from '../@types/custom';

export const useHover = (custom: ImageProps['custom']) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hoverProps, setHoverProps] = useState<Hover>();

  const mouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoverProps(getCustomHover(custom));
    setIsHover(true);
  };

  const mouseLeave = () => {
    setIsHover(false);
    timeoutRef.current = setTimeout(() => {
      setHoverProps(undefined);
    }, 300);
  };

  return {
    Element: hoverProps?.element,
    wrapperProps: {
      onMouseEnter: mouseEnter,
      onMouseLeave: mouseLeave,
    },
    hoverWrapperProps: {
      isOpen: isHover,
      style: hoverProps?.style,
    },
  };
};

const checkIsCustomHover = (custom: UnwrapArray<ImageProps['custom']>): custom is Hover => {
  return !!custom && 'type' in custom && custom.type === 'hover';
};

const getCustomHover = (custom: ImageProps['custom']): Hover | undefined => {
  return Array.isArray(custom)
    ? (custom.find(checkIsCustomHover))
    : checkIsCustomHover(custom)
    ? custom
    : undefined;
};
