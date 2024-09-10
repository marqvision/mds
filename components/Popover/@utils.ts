export const findScrollOffset = (element: Element) => {
  let parent = element.parentElement;

  while (parent) {
    const overflowY = window.getComputedStyle(parent).overflowY;
    const isScrollable = (overflowY === 'auto' || overflowY === 'scroll') && parent.scrollHeight > parent.clientHeight;

    if (isScrollable) {
      return parent;
    }
    parent = parent.parentElement;
  }
};
