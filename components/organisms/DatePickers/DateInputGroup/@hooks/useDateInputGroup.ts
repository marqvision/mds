import { useCallback, useEffect, useState } from 'react';
import { isValidDate } from '../../@utils';
import { DateInputGroupProps, DateInputProps } from '../@types';
import {
  isDateRangeValid,
  isDateShapeValid,
  isPartiallyValidDate,
  parseDateString,
  validateDateValue,
  getValidatedDate,
} from '../@utils';
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

  const setErrorsOptimized = useCallback((newErrors: Partial<{ start: boolean; end: boolean; range: boolean }>) => {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors, ...newErrors };
      if (
        currentErrors.start === nextErrors.start &&
        currentErrors.end === nextErrors.end &&
        currentErrors.range === nextErrors.range
      ) {
        return currentErrors;
      }
      return nextErrors;
    });
  }, []);

  const handleStartDateChange = useDateChangeHandler('start', {
    dateProps: startDate,
    otherState: endDateState,
    setTargetDateState: setStartDateState,
    setOtherState: setEndDateState,
    setErrors: setErrorsOptimized,
    format,
    minDate,
    maxDate,
    onDateChange,
  });

  const handleEndDateChange = useDateChangeHandler('end', {
    dateProps: endDate,
    otherState: startDateState,
    setTargetDateState: setEndDateState,
    setOtherState: setStartDateState,
    setErrors: setErrorsOptimized,
    format,
    minDate,
    maxDate,
    onDateChange,
  });

  const handleBlur = () => {
    const startError = validateDateValue(startDateState.value, format, minDate, maxDate);
    const endError = validateDateValue(endDateState.value, format, minDate, maxDate);

    const validStartDate = getValidatedDate(startDateState.value, format, minDate, maxDate);
    const validEndDate = getValidatedDate(endDateState.value, format, minDate, maxDate);

    let rangeError = false;
    if (validStartDate && validEndDate) {
      rangeError = !isDateRangeValid(validStartDate, validEndDate);
    }

    setErrorsOptimized({ start: startError, end: endError, range: rangeError });

    if (!startError && !endError && !rangeError) {
      if (validStartDate) {
        setStartDateState((prev) => ({ ...prev, lastValid: validStartDate }));
      }
      if (validEndDate) {
        setEndDateState((prev) => ({ ...prev, lastValid: validEndDate }));
      }
      onDateChange?.({
        startDate: validStartDate ?? startDateState.lastValid,
        endDate: validEndDate ?? endDateState.lastValid,
      });
    }
  };

  const startHasError = errors.start || !!startDate.isError || errors.range;
  const endHasError = errors.end || !!endDate.isError || errors.range;

  //#region 밖에서 주입되는 값 검증
  const validateExternalInjectedDates = useCallback(
    (currentStartValue: string, currentEndValue: string) => {
      const startError = validateDateValue(currentStartValue, format, minDate, maxDate);
      const endError = validateDateValue(currentEndValue, format, minDate, maxDate);

      const validStartDate = getValidatedDate(currentStartValue, format, minDate, maxDate);
      const validEndDate = getValidatedDate(currentEndValue, format, minDate, maxDate);

      let rangeError = false;
      if (validStartDate && validEndDate) {
        rangeError = !isDateRangeValid(validStartDate, validEndDate);
      }

      setErrorsOptimized({ start: startError, end: endError, range: rangeError });
      if (!startError && !endError && !rangeError) {
        onDateChange?.({
          startDate: validStartDate ?? startDateState.lastValid,
          endDate: validEndDate ?? endDateState.lastValid,
        });
      }
    },
    [format, minDate, maxDate, setErrorsOptimized, onDateChange, startDateState.lastValid, endDateState.lastValid]
  );

  useEffect(() => {
    if (startDate.value !== undefined) {
      const value = startDate.value || '';
      setStartDateState((prev) => ({ ...prev, value }));
      validateExternalInjectedDates(value, endDateState.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate.value]);

  useEffect(() => {
    if (endDate.value !== undefined) {
      const value = endDate.value || '';
      setEndDateState((prev) => ({ ...prev, value }));
      validateExternalInjectedDates(startDateState.value, value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate.value]);
  //#endregion

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
    otherState,
    setTargetDateState,
    setOtherState,
    setErrors,
    format,
    minDate,
    maxDate,
    onDateChange,
  }: {
    dateProps: DateInputProps;
    otherState: { value: string; lastValid: Date | null };
    setTargetDateState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setOtherState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setErrors: (newErrors: Partial<{ start: boolean; end: boolean; range: boolean }>) => void;
    format: 'MM/DD/YYYY' | 'YYYY-MM-DD';
    minDate?: Date;
    maxDate?: Date;
    onDateChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  }
) => {
  return useCallback(
    (inputValue: string) => {
      const { onChange } = dateProps;
      setTargetDateState((prev) => ({ ...prev, value: inputValue }));
      onChange?.(inputValue);

      if (!isDateShapeValid(inputValue, format) || !isPartiallyValidDate(inputValue, format)) {
        setErrors({ [type]: true, range: false });
        return;
      }
      setErrors({ [type]: false });

      if (inputValue.length >= format.length || inputValue.length === 0) {
        const otherValue = otherState.value;
        const currentStartValue = type === 'start' ? inputValue : otherValue;
        const currentEndValue = type === 'end' ? inputValue : otherValue;

        const startError = validateDateValue(currentStartValue, format, minDate, maxDate);
        const endError = validateDateValue(currentEndValue, format, minDate, maxDate);

        const validStartDate = getValidatedDate(currentStartValue, format, minDate, maxDate);
        const validEndDate = getValidatedDate(currentEndValue, format, minDate, maxDate);

        let rangeError = false;
        if (validStartDate && validEndDate) {
          rangeError = !isDateRangeValid(validStartDate, validEndDate);
        }

        setErrors({ start: startError, end: endError, range: rangeError });

        if (!startError && !endError && !rangeError) {
          const nextStartDate = validStartDate ?? (inputValue === '' ? null : otherState.lastValid);
          const nextEndDate = validEndDate ?? (inputValue === '' ? null : otherState.lastValid);

          if (type === 'start') {
            setTargetDateState({ value: inputValue, lastValid: nextStartDate });
            if (validEndDate) setOtherState((prev) => ({ ...prev, lastValid: validEndDate }));
          } else {
            setTargetDateState({ value: inputValue, lastValid: nextEndDate });
            if (validStartDate) setOtherState((prev) => ({ ...prev, lastValid: validStartDate }));
          }

          onDateChange?.({
            startDate: type === 'start' ? nextStartDate : validStartDate ?? otherState.lastValid,
            endDate: type === 'end' ? nextEndDate : validEndDate ?? otherState.lastValid,
          });
        }
      }
    },
    [dateProps, otherState, setTargetDateState, setOtherState, setErrors, format, minDate, maxDate, onDateChange, type]
  );
};
