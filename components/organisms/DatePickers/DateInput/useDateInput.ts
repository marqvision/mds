import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  getValidatedDate,
  isPartiallyValidDate,
  parseDateStringToDate,
  validateDateValue,
} from '../DateInputGroup/@utils';
import { validateDateAndMinMaxRange, isDateShapeValid } from '../@utils';
import { DEFAULT_PROPS } from '../@constants';
import { DateValidationError } from '../@types';
import { DateInputProps } from './@types';

export const useDateInput = (params: DateInputProps) => {
  const { value, format = DEFAULT_PROPS.format, minDate, maxDate, preventClearValue, onDateChange, onError } = params;

  //#region - local state
  const [dateState, setDateState] = useState(() => {
    const initialValue = value || '';
    const d = parseDateStringToDate(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: d, minDate, maxDate });

    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [errors, setErrors] = useState<DateValidationError | null>(null);
  //#endregion

  //#region - handlers
  const setErrorsOptimized = useCallback((newErrors: DateValidationError | null) => {
    setErrors((currentErrors) => {
      if (currentErrors === newErrors) {
        return currentErrors;
      }
      return newErrors;
    });
    onError?.(newErrors ?? undefined);
  }, []);
  const handleDateChange = (inputValue: string) => {
    if (preventClearValue && inputValue === '') {
      setErrorsOptimized(null);
      setDateState((prev) => ({ ...prev, value: prev.lastValid ? dayjs(prev.lastValid).format(format) : '' }));
      return;
    }

    if (!isDateShapeValid(inputValue, format) || !isPartiallyValidDate(inputValue, format)) {
      setErrorsOptimized('INVALID_DATE');
      setDateState((prev) => ({ ...prev, value: inputValue }));
      return;
    }

    if (inputValue.length === 0) {
      setErrorsOptimized(null);
      setDateState((prev) => ({ ...prev, value: inputValue }));
      onDateChange?.(null);
      return;
    }

    if (inputValue.length >= format.length) {
      const dateError = validateDateValue(inputValue, format, minDate, maxDate);
      const validDate = getValidatedDate(inputValue, format, minDate, maxDate);

      setErrorsOptimized(dateError);
      if (!dateError) {
        const nextDateState = validDate ?? dateState.lastValid;
        if (validDate) {
          setDateState({ value: inputValue, lastValid: validDate });
        }
        onDateChange?.(nextDateState);
      }
    } else {
      setErrorsOptimized(null);
      setDateState((prev) => ({ ...prev, value: inputValue }));
    }
  };

  const handleBlur = () => {
    const dateError = validateDateValue(dateState.value, format, minDate, maxDate);
    const validDate = getValidatedDate(dateState.value, format, minDate, maxDate);

    setErrorsOptimized(dateError);
    if (!dateError) {
      setDateState((prev) => ({ ...prev, lastValid: validDate }));
      onDateChange?.(validDate ?? dateState.lastValid);
    }
  };

  const validateExternalInjectedDates = useCallback(
    (currentValue: string | undefined) => {
      if (!currentValue) {
        setErrorsOptimized(null);
        setDateState((prev) => ({ ...prev, value: '', lastValid: null }));
        onDateChange?.(null);
        return;
      }
      const dateError = validateDateValue(currentValue, format, minDate, maxDate);
      const validDate = getValidatedDate(currentValue, format, minDate, maxDate);

      setErrorsOptimized(dateError);
      if (!dateError) {
        setDateState((prev) => ({ ...prev, lastValid: validDate }));
        onDateChange?.(validDate ?? dateState.lastValid);
      }
    },
    [format, minDate, maxDate, setErrorsOptimized, onDateChange, dateState.lastValid]
  );

  useEffect(() => {
    const newValue = value || '';
    validateExternalInjectedDates(value);
    setDateState((prev) => ({ ...prev, value: newValue }));

    // note-@jamie: 의도된 exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return {
    dateState,
    errors,
    handleDateChange,
    handleBlur,
  };
};
