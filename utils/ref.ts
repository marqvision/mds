import { Ref } from 'react';

export const composeRef = <T>(...refs: Ref<T>[]) => {
  return (node: T) => {
    // 1. 최종적으로 React의 ref prop에 전달될 "콜백 ref"를 반환합니다.
    refs.forEach((ref) => {
      // 2. 인자로 받은 모든 ref들을 순회합니다.
      if (typeof ref === 'function') {
        // 3. 만약 ref가 콜백 함수이면, 노드를 인자로 호출합니다.
        ref(node);
      } else if (ref) {
        // 4. 만약 ref가 RefObject이면, .current 속성에 노드를 할당합니다.
        //    (null이나 undefined가 아닌지 확인)
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    });
  };
};
