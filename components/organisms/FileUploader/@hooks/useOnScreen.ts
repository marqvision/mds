import { useEffect, useRef, useState } from 'react';

export const useOnScreen = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    const target = targetRef.current;
    const wrapper = wrapperRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOnScreen(entry.isIntersecting);
      },
      { root: wrapper }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return { wrapperRef, targetRef, isOnScreen };
};
