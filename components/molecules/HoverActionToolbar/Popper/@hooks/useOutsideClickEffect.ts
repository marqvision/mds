import { useEffect, useRef, RefObject } from 'react';

type ElementOrRef = Element | RefObject<Element | null> | null;

type UseOutsideClickEffectOptions = {
  enabled?: boolean;
};

const getElement = (elementOrRef: ElementOrRef): Element | null => {
  if (!elementOrRef) return null;
  if ('current' in elementOrRef) return elementOrRef.current;
  return elementOrRef;
};

export function useOutsideClickEffect(
  elementOrElements: ElementOrRef | ElementOrRef[],
  callback: () => void,
  options: UseOutsideClickEffectOptions = {}
) {
  const { enabled = true } = options;
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e: Event) => {
      const elements = Array.isArray(elementOrElements) ? elementOrElements : [elementOrElements];
      const target = e.target as Node;
      const isOutside = elements.every((el) => {
        const element = getElement(el);
        return !element?.contains(target);
      });

      if (isOutside) {
        callbackRef.current();
      }
    };

    document.addEventListener('click', handleClick, { capture: true });
    return () => {
      document.removeEventListener('click', handleClick, { capture: true });
    };
  }, [elementOrElements, enabled]);
}
