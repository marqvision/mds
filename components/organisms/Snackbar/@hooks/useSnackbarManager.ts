import { useState, useEffect, MouseEvent, useCallback, useSyncExternalStore } from 'react';
import { SnackbarCommonProps, SnackbarData, SnackbarListener } from '../@types';
import { MAX_SNACKBARS } from '../@constants';
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

  const reindexSnackbars = (snackbarArray: SnackbarData[]) => {
    return snackbarArray.map((snackbar, index) => ({
      ...snackbar,
      stackIndex: index,
    }));
  };

  const addSnackbarToFront = (newSnackbar: SnackbarData) => {
    snackbars = [...snackbars, newSnackbar];

    if (snackbars.length > MAX_SNACKBARS) {
      snackbars = reindexSnackbars(snackbars.slice(1));
    }
  };

  const addSnackbarToBack = (newSnackbar: SnackbarData) => {
    snackbars = [
      newSnackbar,
      ...snackbars.map((snackbar) => ({
        ...snackbar,
        stackIndex: snackbar.stackIndex + 1,
      })),
    ].slice(0, MAX_SNACKBARS);
  };

  const addSnackbar = (options: SnackbarCommonProps) => {
    const id = generateSnackbarId();

    if (options.dismissAllPreviousSnackbar) {
      snackbars = [];
    }

    const newSnackbar: SnackbarData = {
      id,
      ...options,
      duration: options.duration ?? 7000,
      stackIndex: options.addToFront ? snackbars.length : 0,
      hideCloseButton: options.hideCloseButton ?? true,
    };

    if (options.addToFront) {
      addSnackbarToFront(newSnackbar);
    } else {
      addSnackbarToBack(newSnackbar);
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

    snackbars = reindexSnackbars(snackbars.filter((t) => t.id !== id));

    emit();
  };

  const clearAll = () => {
    snackbars = [];

    emit();
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

  const getSnackbars = () => {
    return [...snackbars];
  };

  const isFirstSnackbarExiting = () => {
    return false;
  };

  return {
    clearAll,
    subscribe,
    getSnapshot,
    addSnackbar,
    getSnackbars,
    removeSnackbar,
    setFirstSnackbarExiting,
    isFirstSnackbarExiting,
  };
};

export const snackbarManager = createSnackbarManager();

export const useSnackbarManager = () => {
  const snackbars = useSyncExternalStore(snackbarManager.subscribe, snackbarManager.getSnapshot);

  const addSnackbar = useCallback((options: SnackbarCommonProps) => {
    return snackbarManager.addSnackbar(options);
  }, []);

  const removeSnackbar = useCallback((id: number) => {
    snackbarManager.removeSnackbar(id);
  }, []);

  const clearAllSnackbars = useCallback(() => {
    snackbarManager.clearAll();
  }, []);

  const isFirstSnackbarExiting = useCallback(() => {
    return snackbarManager.isFirstSnackbarExiting();
  }, []);

  return {
    snackbars,
    addSnackbar,
    removeSnackbar,
    clearAllSnackbars,
    isFirstSnackbarExiting,
  };
};

export const useSnackbar = (snackbar: SnackbarData, onRemove: (id: number) => void) => {
  const [isEntering, setIsEntering] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const { translateY, scale, opacity, zIndex } = calculateSnackbarStackProperties(snackbar.stackIndex);

  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!snackbar.duration || snackbar.duration <= 0) return;

    const timer = setTimeout(handleRemove, snackbar.duration);

    return () => clearTimeout(timer);
  }, [snackbar.id, snackbar.duration]);

  const handleRemove = useCallback(() => {
    if (isExiting) return;

    if (snackbar.stackIndex === 0) {
      snackbarManager.setFirstSnackbarExiting();
    }

    setIsExiting(true);

    setTimeout(() => {
      onRemove(snackbar.id);
    }, 300);
  }, [isExiting, onRemove, snackbar.id, snackbar.stackIndex]);

  const handleCloseClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      handleRemove();
    },
    [handleRemove]
  );

  return {
    scale,
    zIndex,
    opacity,
    isExiting,
    translateY,
    isEntering,
    handleCloseClick,
  };
};
