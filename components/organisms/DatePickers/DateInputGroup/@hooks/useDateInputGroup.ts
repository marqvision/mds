import { useCallback, useEffect, useState } from 'react';
import { validateDateAndMinMaxRange } from '../../@utils';
import { DateInputGroupProps, SingleDateInput } from '../@types';
import {
  isDateRangeValid,
  isDateShapeValid,
  isPartiallyValidDate,
  parseDateString,
  validateDateValue,
  getValidatedDate,
  DateValidationError,
} from '../@utils';
import { DEFAULT_PROPS } from '../@constants';

export const useDateInputGroup = (params: DateInputGroupProps) => {
  const { startDate, endDate, minDate, maxDate, format = DEFAULT_PROPS.format, onDateChange } = params;

  //#region - local state
  const [startDateState, setStartDateState] = useState(() => {
    const initialValue = startDate.value || '';
    const d = parseDateString(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: d, minDate, maxDate });
    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [endDateState, setEndDateState] = useState(() => {
    const initialValue = endDate.value || '';
    const d = parseDateString(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: d, minDate, maxDate });
    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [errors, setErrors] = useState<{
    start: DateValidationError | null;
    end: DateValidationError | null;
    range: boolean;
  }>({ start: null, end: null, range: false });
  //#endregion

  //#region - handlers
  const setErrorsOptimized = useCallback(
    (newErrors: Partial<{ start: DateValidationError | null; end: DateValidationError | null; range: boolean }>) => {
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
    },
    []
  );

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
  //#endregion

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
    // note-@jamie: 의도된 exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate.value]);

  useEffect(() => {
    if (endDate.value !== undefined) {
      const value = endDate.value || '';
      setEndDateState((prev) => ({ ...prev, value }));
      validateExternalInjectedDates(startDateState.value, value);
    }
    // note-@jamie: 의도된 exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate.value]);
  //#endregion

  return {
    startDateState,
    endDateState,
    errors: {
      value: errors,
      startDateField: !!errors.start || !!startDate.isError || errors.range,
      endDateField: !!errors.end || !!endDate.isError || errors.range,
    },
    handleStartDateChange,
    handleEndDateChange,
    handleBlur,
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
    dateProps: SingleDateInput;
    otherState: { value: string; lastValid: Date | null };
    setTargetDateState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setOtherState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setErrors: (
      newErrors: Partial<{ start: DateValidationError | null; end: DateValidationError | null; range: boolean }>
    ) => void;
    format: 'MM/DD/YYYY' | 'YYYY-MM-DD';
    minDate?: Date;
    maxDate?: Date;
    onDateChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  }
) => {
  return useCallback(
    (inputValue: string) => {
      const { onChange: onDateFieldChange } = dateProps;
      onDateFieldChange?.(inputValue);

      if (!isDateShapeValid(inputValue, format) || !isPartiallyValidDate(inputValue, format)) {
        setErrors({ [type]: 'INVALID_DATE', range: false });
        setTargetDateState((prev) => ({ ...prev, value: inputValue }));
        return;
      }

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

          // note-@jamie:
          // dom을 바로 동기적으로 update 하는 로직이라, react state (onDateChange) 업데이트가 끝난 뒤에 실행되도록
          // setTimeout으로 한 틱을 미룬다. (MDSInput이 ref가 없어서 일단 이렇게라도 🥲)
          setTimeout(() => {
            if (type === 'start' && inputValue !== '' && nextEndDate === null) {
              (document.querySelector('[data-role="end-date-input-wrapper"] input') as HTMLInputElement)?.focus();
            } else if (type === 'end' && inputValue !== '' && nextStartDate === null) {
              (document.querySelector('[data-role="start-date-input-wrapper"] input') as HTMLInputElement)?.focus();
            }
          }, 0);
        } else {
          setTargetDateState((prev) => ({ ...prev, value: inputValue }));
        }
      } else {
        setErrors({ [type]: null, range: false });
        setTargetDateState((prev) => ({ ...prev, value: inputValue }));
      }
    },
    [dateProps, otherState, setTargetDateState, setOtherState, setErrors, format, minDate, maxDate, onDateChange, type]
  );
};
