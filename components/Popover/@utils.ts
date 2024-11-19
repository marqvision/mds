export const findScrollOffset = (element: Element) => {
  let parent = element.parentElement;

  while (parent) {
    const overflowY = window.getComputedStyle(parent).overflowY;
    const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight;

    if (isScrollable) {
      return parent;
    }

    if (parent.tagName === 'BODY') {
      return window;
    }

    parent = parent.parentElement;
  }
};
