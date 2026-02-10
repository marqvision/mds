import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

/**
 * useEffect와 유사하지만, deps 배열의 값들을 깊은 비교하여 변경 여부를 판단하는 훅
 * @param callback effect 콜백 함수
 * @param deps 의존성 배열
 */
export const useDeepCompareEffect = (callback: () => void, deps: unknown[]) => {
  const callbackRef = useRef(callback);
  const depsRef = useRef(deps);
  const signalRef = useRef(0);

  // 항상 최신 callback 유지
  callbackRef.current = callback;

  if (!isEqual(depsRef.current, deps)) {
    depsRef.current = deps;
    signalRef.current += 1;
  }

  const signal = signalRef.current;

  useEffect(() => {
    return callbackRef.current();
  }, [signal]);
};
