import { useState, useCallback } from 'react';

type UseControllableStateParams<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>(params: UseControllableStateParams<T>) {
  const { value: controlledValue, defaultValue, onChange } = params;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (newValue: T) => {
      if (isControlled) {
        onChange?.(newValue);
        return;
      }

      setInternalValue(newValue);
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return [value, setValue] as const;
}
