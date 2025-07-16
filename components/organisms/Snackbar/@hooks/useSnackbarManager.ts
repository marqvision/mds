import { useState, useEffect, MouseEvent, useCallback, useSyncExternalStore } from 'react';
import { SnackbarCommonProps, SnackbarData, SnackbarListener } from '../@types';
import { MAX_SNACKBARS, SNACKBAR_TIMEOUTS } from '../@constants';
import { calculateSnackbarStackProperties } from '../@utils';

const createSnackbarManager = () => {
  const listeners: Set<SnackbarListener> = new Set();
  let snackbars: SnackbarData[] = [];

  const emit = () => {
    listeners.forEach((listener) => listener([...snackbars]));
  };

  const generateSnackbarId = () => {
    return Date.now() + Math.random();
  };

  const addSnackbar = (options: SnackbarCommonProps) => {
    const id = generateSnackbarId();

    if (options.dismissAllPreviousSnackbar) {
      snackbars = [];
    }

    const newSnackbar: SnackbarData = {
      id,
      ...options,
      type: options.type || 'complete',
      duration: options.duration ?? SNACKBAR_TIMEOUTS.DEFAULT_SNACKBAR_DURATION,
      showCloseButton: options.showCloseButton === true,
    };

    if (options.pushToEnd) {
      snackbars = [...snackbars, newSnackbar];
    } else {
      snackbars = [newSnackbar, ...snackbars];
    }

    if (snackbars.length > MAX_SNACKBARS) {
      snackbars = options.pushToEnd ? snackbars.slice(1) : snackbars.slice(0, MAX_SNACKBARS);
    }

    emit();
    return id;
  };

  const setFirstSnackbarExiting = () => {
    const event = new CustomEvent('firstSnackbarExiting');
    document.dispatchEvent(event);
  };

  const removeSnackbar = (id: number) => {
    const snackbarExists = snackbars.some((t) => t.id === id);
    if (!snackbarExists) return;

    snackbars = snackbars.filter((t) => t.id !== id);
    emit();
  };

  const clearAll = () => {
    if (snackbars.length === 0) return;

    const event = new CustomEvent('dismissAllSnackbars');
    document.dispatchEvent(event);

    setTimeout(() => {
      snackbars = [];
      emit();
    }, SNACKBAR_TIMEOUTS.EXIT_ANIMATION_DURATION);
  };

  const subscribe = (listener: SnackbarListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const getSnapshot = () => {
    return snackbars;
  };

  return {
    clearAll,
    subscribe,
    getSnapshot,
    addSnackbar,
    removeSnackbar,
    setFirstSnackbarExiting,
  };
};

export const snackbarManager = createSnackbarManager();

export const useSnackbarManager = () => {
  const snackbars = useSyncExternalStore(snackbarManager.subscribe, snackbarManager.getSnapshot);

  const removeSnackbar = useCallback((id: number) => {
    snackbarManager.removeSnackbar(id);
  }, []);

  return {
    snackbars,
    removeSnackbar,
  };
};

export const useSnackbar = (snackbar: SnackbarData, stackIndex: number, onRemove: (id: number) => void) => {
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [isDismissingAll, setIsDismissingAll] = useState(false);

  const { translateY, scale, opacity, zIndex } = calculateSnackbarStackProperties(stackIndex);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), SNACKBAR_TIMEOUTS.ENTER_ANIMATION_DURATION);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!snackbar.duration || snackbar.duration <= 0) return;

    const timer = setTimeout(handleRemove, snackbar.duration);
    return () => clearTimeout(timer);
  }, [snackbar.id, snackbar.duration]);

  useEffect(() => {
    const handleDismissAll = () => {
      setIsDismissingAll(true);
    };

    document.addEventListener('dismissAllSnackbars', handleDismissAll);
    return () => {
      document.removeEventListener('dismissAllSnackbars', handleDismissAll);
    };
  }, []);

  const handleRemove = useCallback(() => {
    if (isExiting || isDismissingAll) return;

    if (stackIndex === 0) {
      snackbarManager.setFirstSnackbarExiting();
    }

    setIsExiting(true);
    setTimeout(() => {
      onRemove(snackbar.id);
    }, SNACKBAR_TIMEOUTS.EXIT_ANIMATION_DURATION);
  }, [isExiting, isDismissingAll, onRemove, snackbar.id, stackIndex]);

  const handleCloseClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      handleRemove();
    },
    [handleRemove]
  );

  return {
    scale,
    zIndex,
    opacity,
    isExiting: isExiting || isDismissingAll,
    translateY,
    isEntering,
    handleCloseClick,
  };
};
