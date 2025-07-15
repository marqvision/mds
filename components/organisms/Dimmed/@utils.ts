import { Ref } from 'react';

/**
 * 여러 개의 ref를 단일 콜백 ref로 합성하는 유틸리티 함수입니다.
 * 컴포넌트 내부에서 사용하는 eleRef(useRef)와 외부에서 전달받는 ref(forwardedRef)를
 * 동시에 하나의 DOM 요소에 연결해야 할 때 사용합니다.
 */
export const composeRef = <T>(...refs: Ref<T>[]) => {
  return (node: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
};
