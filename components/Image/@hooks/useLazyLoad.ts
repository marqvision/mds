import React, { useEffect, useState } from 'react';

const isLazyLoadingEnabled = 'loading' in HTMLImageElement.prototype;
export const useLazyLoad = (ref: React.RefObject<HTMLImageElement>) => {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(isLazyLoadingEnabled);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [size, setSize] = useState<{ width: number; height: number }>();

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight });
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  useEffect(() => {
    if (isLazyLoadingEnabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsOnScreen(true);
        observer.disconnect();
      },
      {
        threshold: 0.1,
      }
    );

    if (!ref.current) return;
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return {
    isOnScreen,
    isLoaded,
    onLoad: handleLoad,
    isError,
    onError: handleError,
    size,
  };
};
