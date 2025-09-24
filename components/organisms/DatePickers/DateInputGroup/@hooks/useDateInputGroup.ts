import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { validateDateAndMinMaxRange, isDateRangeValid, isDateShapeValid } from '../../@utils';
import { DateInputError, DateInputGroupProps, SingleDateInput } from '../@types';
import { isPartiallyValidDate, parseDateStringToDate, validateDateValue, getValidatedDate } from '../@utils';
import { DEFAULT_PROPS } from '../../@constants';
import { DateValidationError } from '../../@types';
import { AvailableDateFormat } from '../../DateRangePicker/@types';

export const useDateInputGroup = (params: DateInputGroupProps) => {
  const {
    startDate,
    endDate,
    minDate,
    maxDate,
    format = DEFAULT_PROPS.format,
    preventClearValue,
    onDateChange,
    onError,
  } = params;

  //#region - local state
  const [startDateState, setStartDateState] = useState(() => {
    const initialValue = startDate.value || '';
    const d = parseDateStringToDate(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: d, minDate, maxDate });

    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [endDateState, setEndDateState] = useState(() => {
    const initialValue = endDate.value || '';
    const d = parseDateStringToDate(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: d, minDate, maxDate });

    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [errors, setErrors] = useState<DateInputError>({ start: null, end: null, range: false });
  //#endregion

  //#region - handlers
  const setErrorsOptimized = useCallback((newErrors: Partial<DateInputError>) => {
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
    preventClearValue,
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
    preventClearValue,
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
        startDate: validStartDate ?? startDateState.lastValid ?? undefined,
        endDate: validEndDate ?? endDateState.lastValid ?? undefined,
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // preventClearValue 옵션이 켜진 상황에서 전체 선택 후 삭제를 방지하기 위한 키 입력 처리
    // - 전체 선택 상태에서 Backspace/Delete가 눌리면 lastValid 값을 즉시 복원.
    // - 이미 빈 값에서 Backspace가 눌릴 때도 lastValid로 되돌린다.
    const { key, currentTarget } = e;
    const { value, selectionStart, selectionEnd, dataset } = currentTarget;
    const wrapperRole =
      dataset.role || currentTarget.closest('[data-role]')?.getAttribute('data-role') || undefined;

    if (
      preventClearValue &&
      (key === 'Backspace' || key === 'Delete') &&
      typeof selectionStart === 'number' &&
      typeof selectionEnd === 'number' &&
      selectionStart === 0 &&
      selectionEnd === value.length &&
      value !== ''
    ) {
      const isStartInput = wrapperRole === 'start-date-input-wrapper';
      const isEndInput = wrapperRole === 'end-date-input-wrapper';
      const lastValidDate = isStartInput ? startDateState.lastValid : isEndInput ? endDateState.lastValid : null;

      if (lastValidDate) {
        // 전체 선택된 상태에서 삭제를 막고, 마지막 유효 날짜 문자열로 복원
        e.preventDefault();
        const lastValidString = dayjs(lastValidDate).format(format);

        if (isStartInput) {
          handleStartDateChange(lastValidString);
        } else if (isEndInput) {
          handleEndDateChange(lastValidString);
        }

        requestAnimationFrame(() => {
          // 복원 후 커서를 입력 끝으로 이동
          const inputElement = currentTarget;
          const caretPosition = inputElement.value.length;
          inputElement.setSelectionRange(caretPosition, caretPosition);
        });

        return;
      }
    }

    if (preventClearValue && key === 'Backspace' && value === '') {
      // 이미 비어 있는 필드에서 Backspace가 눌릴 때 마지막 유효 날짜로 복원
      if (wrapperRole === 'start-date-input-wrapper') {
        handleStartDateChange(startDateState.lastValid ? dayjs(startDateState.lastValid).format(format) : '');
      } else if (wrapperRole === 'end-date-input-wrapper') {
        handleEndDateChange(endDateState.lastValid ? dayjs(endDateState.lastValid).format(format) : '');
      }
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
    },
    [format, minDate, maxDate, setErrorsOptimized]
  );

  useEffect(() => {
    // 외부에서 들어온 값과 내부 상태 동기화
    const isStartValueChanged = startDate.value !== startDateState.value;
    const isEndValueChanged = endDate.value !== endDateState.value;

    if (startDate.value !== undefined) {
      const value = startDate.value || '';
      setStartDateState((prev) => ({ ...prev, value }));
    }
    if (endDate.value !== undefined) {
      const value = endDate.value || '';
      setEndDateState((prev) => ({ ...prev, value }));
    }
    validateExternalInjectedDates(
      isStartValueChanged ? startDate.value || '' : startDateState.value,
      isEndValueChanged ? endDate.value || '' : endDateState.value
    );

    // note-@jamie: 의도된 exhaustive-deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate.value, endDate.value]);
  //#endregion

  //#region error를 부모에게 전달
  const errorHandler = useRef(onError);
  useEffect(() => {
    if (errors) {
      errorHandler?.current?.(errors);
    } else {
      errorHandler?.current?.(undefined);
    }
  }, [errors]);
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
    handleKeyDown,
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
    preventClearValue,
    onDateChange,
  }: {
    dateProps: SingleDateInput;
    otherState: { value: string; lastValid: Date | null };
    setTargetDateState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setOtherState: React.Dispatch<React.SetStateAction<{ value: string; lastValid: Date | null }>>;
    setErrors: (
      newErrors: Partial<{ start: DateValidationError | null; end: DateValidationError | null; range: boolean }>
    ) => void;
    format: AvailableDateFormat;
    minDate?: Date;
    maxDate?: Date;
    preventClearValue?: boolean;
    onDateChange?: (dates: { startDate?: Date; endDate?: Date }) => void;
  }
) => {
  return useCallback(
    (inputValue: string) => {
      console.log('>>>> inputValue', inputValue);
      const { onChange: onDateFieldChange } = dateProps;
      if (preventClearValue && inputValue === '') {
        setTargetDateState((prev) => {
          const lastValidDateString = prev.lastValid ? dayjs(prev.lastValid).format(format) : '';
          console.log('>>>> lastValidDateString', lastValidDateString);
          return {
            ...prev,
            value: lastValidDateString,
          };
        });
        setTimeout(() => {
          if (type === 'start') {
            (document.querySelector('[data-role="start-date-input-wrapper"] input') as HTMLInputElement)?.blur();
          } else if (type === 'end') {
            (document.querySelector('[data-role="end-date-input-wrapper"] input') as HTMLInputElement)?.blur();
          }
        }, 60);
        return;
      }

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
            startDate: (type === 'start' ? nextStartDate : validStartDate ?? otherState.lastValid) ?? undefined,
            endDate: (type === 'end' ? nextEndDate : validEndDate ?? otherState.lastValid) ?? undefined,
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
