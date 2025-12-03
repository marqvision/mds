import { useCallback, useEffect, useMemo, useState } from 'react';
import { ImageData } from '../@types';

export const useImageNavigation = <Image extends string | ImageData>(list: Image[], value: Image) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(list.findIndex((item) => typeof value !== 'string' && typeof item !== 'string' ? item.src === value.src : item === value));

  const { isPrevDisabled, isNextDisabled } = useMemo(() => {
    return {
      isPrevDisabled: !currentIndex,
      isNextDisabled: !list.at(currentIndex + 1),
    }
  }, [currentIndex, list]);

  const prev = useCallback(() => {
    if (isPrevDisabled) return;
    setIsLoading(true);
    setCurrentIndex((prev) => prev - 1);
  }, [isPrevDisabled]);

  const next = useCallback(() => {
    if (isNextDisabled) return;
    setIsLoading(true);
    setCurrentIndex((prev) => prev + 1);
  }, [isNextDisabled]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.stopImmediatePropagation(); // 기존 키보드 이벤트 실행 방지

      if (event.key === 'ArrowLeft') {
        prev();
      } else if (event.key === 'ArrowRight') {
        next();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [next, prev]);

  return {
    currentIndex,
    isVisible: list.length > 1,
    isLoading,
    changeLoading: setIsLoading,
    prev: {
      isDisabled: isPrevDisabled,
      action: prev,
    },
    next: {
      isDisabled: isNextDisabled,
      action: next,
    },
  };
};

export type UseImageNavigation = ReturnType<typeof useImageNavigation>;
