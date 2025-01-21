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

const getStyleValue = (ele: Element, key: string, value: unknown, condition: boolean) => {
  const cssValue = ele.computedStyleMap
    ? (ele.computedStyleMap().get(key) as CSSKeywordValue)?.value
    : getComputedStyle?.(ele).getPropertyValue(key);

  return condition ? cssValue === value : cssValue !== value;
};

export const findChildStickyHeight = (_element: HTMLElement | Window | undefined) => {
  if (!_element || _element === window) {
    return {
      top: 0,
      bottom: 0,
    };
  }

  const element = Array.from((_element as HTMLElement).querySelectorAll('*')).filter((v) =>
    getStyleValue(v, 'position', 'sticky', true)
  );

  return {
    top: element
      .filter((v) => getStyleValue(v, 'top', 'auto', false))
      .reduce((total, el) => total + el.clientHeight, 0),
    bottom: element
      .filter((v) => getStyleValue(v, 'bottom', 'auto', false))
      .reduce((total, el) => total + el.clientHeight, 0),
  };
};
