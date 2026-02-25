export const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
  let currentElement = element;

  while (currentElement) {
    const { overflowX } = window.getComputedStyle(currentElement);
    const isScrollable = overflowX === 'scroll' || overflowX === 'auto';

    if (isScrollable) return currentElement;
    currentElement = currentElement.parentElement;
  }
  return null;
};

export const updateScrollPosition = (
  updateShadowsVisibility: (leftShadowVisible: boolean, rightShadowVisible: boolean) => void
) => {
  let scrollRequested = false;

  const updateShadowsOnScroll = (target: HTMLElement) => {
    if (!scrollRequested) {
      scrollRequested = true;
      requestAnimationFrame(() => {
        const threshold = 1; // 임계값
        const leftShadowVisible = target.scrollLeft > threshold;
        const rightShadowVisible = target.scrollWidth - target.scrollLeft - target.clientWidth > threshold;
        updateShadowsVisibility(leftShadowVisible, rightShadowVisible);

        scrollRequested = false;
      });
    }
  };

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    updateShadowsOnScroll(target);
  };

  const handleResize = ([entry]: ResizeObserverEntry[]) => {
    const target = entry.target as HTMLElement;
    updateShadowsOnScroll(target);
  };

  return {
    onScroll: handleScroll,
    onResize: handleResize,
  };
};
