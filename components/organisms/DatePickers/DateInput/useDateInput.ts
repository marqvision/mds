import { useCallback, useEffect, useState } from 'react';
import {
  DateValidationError,
  getValidatedDate,
  isDateShapeValid,
  isPartiallyValidDate,
  parseDateString,
  validateDateValue,
} from '../DateInputGroup/@utils';
import { validateDateAndMinMaxRange } from '../@utils';
import { DEFAULT_PROPS } from '../DateInputGroup/@constants';
import { DateInputProps } from './@types';

export const useDateInput = (params: DateInputProps) => {
  const { value, format = DEFAULT_PROPS.format, minDate, maxDate, onDateChange } = params;
  const [dateState, setDateState] = useState(() => {
    const initialValue = value || '';
    const d = parseDateString(initialValue, format);
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange(d, minDate, maxDate);
    return {
      value: initialValue,
      lastValid: d && isValid && !isOutOfRange ? d : null,
    };
  });
  const [errors, setErrors] = useState<DateValidationError | null>(null);

  const handleDateChange = (inputValue: string) => {
    if (!isDateShapeValid(inputValue, format) || !isPartiallyValidDate(inputValue, format)) {
      setErrors('INVALID_DATE');
      setDateState((prev) => ({ ...prev, value: inputValue }));
      onDateChange?.(null);
      return;
    }

    if (inputValue.length === 0) {
      setErrors(null);
      setDateState((prev) => ({ ...prev, value: inputValue }));
      onDateChange?.(null);
      return;
    }

    if (inputValue.length >= format.length) {
      const dateError = validateDateValue(inputValue, format, minDate, maxDate);
      const validDate = getValidatedDate(inputValue, format, minDate, maxDate);

      setErrors(dateError);
      if (!dateError) {
        const nextDateState = validDate ?? dateState.lastValid;
        if (validDate) {
          setDateState({ value: inputValue, lastValid: validDate });
        }
        console.log('>>>> nextDateState', inputValue, validDate, nextDateState);
        onDateChange?.(nextDateState);
      }
    } else {
      setErrors(null);
      setDateState((prev) => ({ ...prev, value: inputValue }));
    }
  };

  const handleBlur = () => {
    const dateError = validateDateValue(dateState.value, format, minDate, maxDate);
    const validDate = getValidatedDate(dateState.value, format, minDate, maxDate);

    setErrors(dateError);
    if (!dateError) {
      setDateState((prev) => ({ ...prev, lastValid: validDate }));
      onDateChange?.(validDate ?? dateState.lastValid);
    }
  };

  const validateExternalInjectedDates = useCallback(
    (currentValue: string | undefined) => {
      if (!currentValue) {
        setErrors(null);
        setDateState((prev) => ({ ...prev, value: '', lastValid: null }));
        onDateChange?.(null);
        return;
      }
      const dateError = validateDateValue(currentValue, format, minDate, maxDate);
      const validDate = getValidatedDate(currentValue, format, minDate, maxDate);

      setErrors(dateError);
      if (!dateError) {
        setDateState((prev) => ({ ...prev, lastValid: validDate }));
        onDateChange?.(validDate ?? dateState.lastValid);
      }
    },
    [format, minDate, maxDate, onDateChange, dateState.lastValid]
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
