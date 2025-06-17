import { useCallback, useEffect, useState } from 'react';
import { DateInputGroupProps, DateInputProps } from '../@types';
import { isDateRangeValid, isDateShapeValid, isPartiallyValidDate, isValidDate, parseDateString } from '../@utils';
import { DEFAULT_PROPS } from '../@constants';

export const useDateInputGroup = (params: DateInputGroupProps) => {
  const { startDate, endDate, minDate, maxDate, format = DEFAULT_PROPS.format, onDateChange } = params;

  const [startDateState, setStartDateState] = useState(() => {
    const initialValue = startDate.value || '';
    const d = parseDateString(initialValue, format);
    const { isValid, isOutOfRange } = isValidDate(d, minDate, maxDate);
    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });

  const [endDateState, setEndDateState] = useState(() => {
    const initialValue = endDate.value || '';
    const d = parseDateString(initialValue, format);
    const { isValid, isOutOfRange } = isValidDate(d, minDate, maxDate);
    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });

  const [errors, setErrors] = useState({ start: false, end: false, range: false });

  const validateAndSyncDates = useCallback(
    (currentStartValue: string, currentEndValue: string) => {
      let startError = false;
      if (currentStartValue) {
        if (
          !isDateShapeValid(currentStartValue, format) ||
          currentStartValue.length < format.length ||
          !isPartiallyValidDate(currentStartValue, format)
        ) {
          startError = true;
        } else {
          const parsedDate = parseDateString(currentStartValue, format);
          const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
          startError = !isValid || isOutOfRange;
        }
      }

      let endError = false;
      if (currentEndValue) {
        if (
          !isDateShapeValid(currentEndValue, format) ||
          currentEndValue.length < format.length ||
          !isPartiallyValidDate(currentEndValue, format)
        ) {
          endError = true;
        } else {
          const parsedDate = parseDateString(currentEndValue, format);
          const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
          endError = !isValid || isOutOfRange;
        }
      }

      const parsedStart = parseDateString(currentStartValue, format);
      const startCheck = isValidDate(parsedStart, minDate, maxDate);
      const isStartOk = parsedStart && startCheck.isValid && !startCheck.isOutOfRange;

      const parsedEnd = parseDateString(currentEndValue, format);
      const endCheck = isValidDate(parsedEnd, minDate, maxDate);
      const isEndOk = parsedEnd && endCheck.isValid && !endCheck.isOutOfRange;

      let rangeError = false;
      if (isStartOk && isEndOk) {
        rangeError = !isDateRangeValid(parsedStart, parsedEnd);
      }

      setErrors({ start: startError, end: endError, range: rangeError });

      if (onDateChange) {
        const nextStartDate = isStartOk ? parsedStart : startDateState.lastValid;
        const nextEndDate = isEndOk ? parsedEnd : endDateState.lastValid;

        if (isStartOk) setStartDateState((prev) => ({ ...prev, lastValid: parsedStart }));
        if (isEndOk) setEndDateState((prev) => ({ ...prev, lastValid: parsedEnd }));

        onDateChange({ startDate: nextStartDate, endDate: nextEndDate });
      }
    },
    [format, startDateState.lastValid, endDateState.lastValid, maxDate, minDate, onDateChange]
  );

  const handleStartDateChange = useDateChangeHandler('start', {
    dateProps: startDate,
    otherValue: endDateState.value,
    setState: setStartDateState,
    setErrors,
    format,
    validateAndSyncDates,
  });

  const handleEndDateChange = useDateChangeHandler('end', {
    dateProps: endDate,
    otherValue: startDateState.value,
    setState: setEndDateState,
    setErrors,
    format,
    validateAndSyncDates,
  });

  const handleBlur = () => {
    validateAndSyncDates(startDateState.value, endDateState.value);
  };

  const startHasError = errors.start || !!startDate.isError || errors.range;
  const endHasError = errors.end || !!endDate.isError || errors.range;

  useEffect(() => {
    if (startDate.value !== undefined) {
      const value = startDate.value || '';
      setStartDateState((prev) => ({ ...prev, value }));
      validateAndSyncDates(value, endDateState.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate.value]);

  useEffect(() => {
    if (endDate.value !== undefined) {
      const value = endDate.value || '';
      setEndDateState((prev) => ({ ...prev, value }));
      validateAndSyncDates(startDateState.value, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate.value]);

  return {
    startDateState,
    endDateState,
    errors,
    handleStartDateChange,
    handleEndDateChange,
    handleBlur,
    startHasError,
    endHasError,
  };
};

const useDateChangeHandler = (
  type: 'start' | 'end',
  {
    dateProps,
    otherValue,
    setState,
    setErrors,
    format,
    validateAndSyncDates,
  }: {
    dateProps: DateInputProps;
    otherValue: string;
    setState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setErrors: React.Dispatch<React.SetStateAction<{ start: boolean; end: boolean; range: boolean }>>;
    format: 'MM/DD/YYYY' | 'YYYY-MM-DD';
    validateAndSyncDates: (start: string, end: string) => void;
  }
) => {
  return useCallback(
    (inputValue: string) => {
      const { onChange } = dateProps;
      setState((prev) => ({ ...prev, value: inputValue }));
      onChange?.(inputValue);

      if (!isDateShapeValid(inputValue, format) || !isPartiallyValidDate(inputValue, format)) {
        setErrors((prev) => ({ ...prev, [type]: true }));
      } else {
        setErrors((prev) => ({ ...prev, [type]: false }));
      }

      if (inputValue.length >= format.length) {
        const currentStartValue = type === 'start' ? inputValue : otherValue;
        const currentEndValue = type === 'start' ? otherValue : inputValue;
        validateAndSyncDates(currentStartValue, currentEndValue);
      }
    },
    [dateProps, otherValue, setState, setErrors, format, validateAndSyncDates, type]
  );
};
