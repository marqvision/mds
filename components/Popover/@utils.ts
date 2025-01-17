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

export const findChildStickyHeight = (_element: HTMLElement | Window | undefined) => {
  if (!_element || _element === window) {
    return {
      top: 0,
      bottom: 0,
    };
  }

  const element = Array.from((_element as HTMLElement).querySelectorAll('*')).filter((v) => {
    return (v.computedStyleMap().get('position') as CSSKeywordValue)?.value === 'sticky';
  });

  return {
    top: element
      .filter((v) => (v.computedStyleMap().get('top') as CSSKeywordValue)?.value !== 'auto')
      .reduce((total, el) => total + el.clientHeight, 0),
    bottom: element
      .filter((v) => (v.computedStyleMap().get('bottom') as CSSKeywordValue)?.value !== 'auto')
      .reduce((total, el) => total + el.clientHeight, 0),
  };
};
