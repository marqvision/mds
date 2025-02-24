export const findScrollableParent = (element: HTMLElement | null): HTMLElement | null => {
  let currentElement = element;

  while (currentElement) {
    const overflow = window.getComputedStyle(currentElement).overflow;
    const isScrollable = overflow === 'scroll' || overflow === 'auto';

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
        const leftShadowVisible = Math.floor(target.scrollLeft) > 0;
        const rightShadowVisible = Math.floor(target.scrollWidth - target.scrollLeft - target.clientWidth) > 0;
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
