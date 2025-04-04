import { useCallback, useEffect, useRef, useState } from 'react';
import { findScrollableParent, updateScrollPosition } from '../@utils';

export const useStickyShadow = () => {
  const wrapperRef = useRef<HTMLTableElement>(null);

  const [isLeftShadowVisible, setIsLeftShadowVisible] = useState<boolean>(false);
  const [isRightShadowVisible, setIsRightShadowVisible] = useState<boolean>(false);

  const updateShadowsVisibility = useCallback((leftShadowVisible: boolean, rightShadowVisible: boolean) => {
    setIsLeftShadowVisible(leftShadowVisible);
    setIsRightShadowVisible(rightShadowVisible);
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;

    const scrollableParent = findScrollableParent(element);

    if (scrollableParent) {
      const observer = new ResizeObserver(updateScrollPosition(updateShadowsVisibility).onResize);

      scrollableParent.addEventListener('scroll', updateScrollPosition(updateShadowsVisibility).onScroll);
      observer.observe(scrollableParent);

      return () => {
        scrollableParent.removeEventListener('scroll', updateScrollPosition(updateShadowsVisibility).onScroll);
        observer.unobserve(scrollableParent);
      };
    }
  }, [updateShadowsVisibility]);

  return {
    wrapperRef,
    stickyShadow: {
      left: isLeftShadowVisible,
      right: isRightShadowVisible,
    },
  };
};
