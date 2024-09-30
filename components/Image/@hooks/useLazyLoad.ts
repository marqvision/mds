import React, { useEffect, useState } from 'react';

export const useLazyLoad = (ref: React.RefObject<HTMLImageElement>) => {
  const [isOnScreen, setIsOnScreen] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setIsError(true);
  };

  useEffect(() => {
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
  };
};
