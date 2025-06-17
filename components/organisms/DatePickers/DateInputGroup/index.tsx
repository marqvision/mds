import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSInput, MDSInputProps } from '../../../molecules/Input';
import { DateInputGroupLayout } from './styles';
import { isValidDate, parseDateString, isDateShapeValid, isPartiallyValidDate, isDateRangeValid } from './@utils';

type DateInputProps = {
  value?: MDSInputProps<string>['value'];
  label?: MDSInputProps<string>['label'];
  placeholder?: MDSInputProps<string>['placeholder'];
  onChange?: (value: string) => void;
  isError?: boolean;
  helperText?: string;
};

type Props = {
  separator?: React.ReactNode;
  startDate: DateInputProps;
  endDate: DateInputProps;
  minDate?: Date;
  maxDate?: Date;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  onDateChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
};

const DEFAULT_PROPS: {
  value: string;
  separator: string;
  placeholder: string;
  format: 'MM/DD/YYYY' | 'YYYY-MM-DD';
} = {
  value: '',
  separator: '~',
  placeholder: 'MM/DD/YYYY',
  format: 'MM/DD/YYYY',
};

const DateInputGroup = ({
  separator = DEFAULT_PROPS.separator,
  startDate,
  endDate,
  minDate,
  maxDate,
  format = DEFAULT_PROPS.format,
  onDateChange,
}: Props) => {
  const [startValue, setStartValue] = useState(startDate.value || '');
  const [endValue, setEndValue] = useState(endDate.value || '');

  const [isStartError, setIsStartError] = useState(false);
  const [isEndError, setIsEndError] = useState(false);
  const [isRangeError, setIsRangeError] = useState(false);

  const [lastValidStartDate, setLastValidStartDate] = useState<Date | null>(() => {
    const d = parseDateString(startDate.value || '', format);
    const { isValid, isOutOfRange } = isValidDate(d, minDate, maxDate);
    return d && isValid && !isOutOfRange ? d : null;
  });
  const [lastValidEndDate, setLastValidEndDate] = useState<Date | null>(() => {
    const d = parseDateString(endDate.value || '', format);
    const { isValid, isOutOfRange } = isValidDate(d, minDate, maxDate);
    return d && isValid && !isOutOfRange ? d : null;
  });

  useEffect(() => {
    setStartValue(startDate.value || '');
  }, [startDate.value]);

  useEffect(() => {
    setEndValue(endDate.value || '');
  }, [endDate.value]);

  useEffect(() => {
    const start = parseDateString(startValue, format);
    const end = parseDateString(endValue, format);

    const { isValid: isStartValid, isOutOfRange: isStartOutOfRange } = isValidDate(start, minDate, maxDate);
    const { isValid: isEndValid, isOutOfRange: isEndOutOfRange } = isValidDate(end, minDate, maxDate);

    const isStartOk = start && isStartValid && !isStartOutOfRange;
    const isEndOk = end && isEndValid && !isEndOutOfRange;

    if (isStartOk && isEndOk) {
      setIsRangeError(!isDateRangeValid(start, end));
    } else {
      setIsRangeError(false);
    }
  }, [startValue, endValue, format, minDate, maxDate, lastValidStartDate, lastValidEndDate]);

  const callOnDateChange = (startStr: string, endStr: string) => {
    if (!onDateChange) {
      return;
    }

    const parsedStart = parseDateString(startStr, format);
    const parsedEnd = parseDateString(endStr, format);

    const { isValid: isStartValid, isOutOfRange: isStartOutOfRange } = isValidDate(parsedStart, minDate, maxDate);
    const { isValid: isEndValid, isOutOfRange: isEndOutOfRange } = isValidDate(parsedEnd, minDate, maxDate);

    const isCurrentStartOk = parsedStart && isStartValid && !isStartOutOfRange;
    const isCurrentEndOk = parsedEnd && isEndValid && !isEndOutOfRange;

    const nextStartDate = isCurrentStartOk ? parsedStart : lastValidStartDate;
    const nextEndDate = isCurrentEndOk ? parsedEnd : lastValidEndDate;

    if (isCurrentStartOk) {
      setLastValidStartDate(parsedStart);
    }
    if (isCurrentEndOk) {
      setLastValidEndDate(parsedEnd);
    }

    onDateChange({ startDate: nextStartDate, endDate: nextEndDate });
  };

  const createDateChangeHandler =
    (
      dateProps: DateInputProps,
      setValue: React.Dispatch<React.SetStateAction<string>>,
      setError: React.Dispatch<React.SetStateAction<boolean>>,
      isStartInput: boolean
    ) =>
    (inputValue: string) => {
      const { onChange } = dateProps;

      setValue(inputValue);
      onChange?.(inputValue);

      if (!isDateShapeValid(inputValue, format)) {
        setError(true);
        return;
      }

      if (inputValue.length >= format.length) {
        const parsedDate = dayjs(inputValue, format, true).isValid() ? parseDateString(inputValue, format) : null;
        const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
        setError(!isValid || isOutOfRange);

        const currentStartValue = isStartInput ? inputValue : startValue;
        const currentEndValue = isStartInput ? endValue : inputValue;
        callOnDateChange(currentStartValue, currentEndValue);
      } else {
        setError(!isPartiallyValidDate(inputValue, format));
      }
    };

  const handleStartDateChange = createDateChangeHandler(startDate, setStartValue, setIsStartError, true);
  const handleEndDateChange = createDateChangeHandler(endDate, setEndValue, setIsEndError, false);

  const validateOnBlur = (value: string, setError: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (!value) {
      setError(false);
      return;
    }

    if (!isDateShapeValid(value, format)) {
      setError(true);
      return;
    }

    if (value.length < format.length) {
      setError(true);
      return;
    }

    const parsedDate = dayjs(value, format, true).isValid() ? parseDateString(value, format) : null;
    const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
    setError(!isValid || isOutOfRange);
  };

  const handleBlur = () => {
    validateOnBlur(startValue, setIsStartError);
    validateOnBlur(endValue, setIsEndError);
    callOnDateChange(startValue, endValue);
  };

  const startHasError = isStartError || !!startDate.isError || isRangeError;
  const endHasError = isEndError || !!endDate.isError || isRangeError;

  const getStartHelperText = () => {
    if (isRangeError) return 'Start date must be same or before end date';
    if (isStartError || startDate.isError) return startDate.helperText || 'Invalid date';
    return undefined;
  };

  const getEndHelperText = () => {
    if (isRangeError) return 'End date must be same or after start date';
    if (isEndError || endDate.isError) return endDate.helperText || 'Invalid date';
    return undefined;
  };

  return (
    <DateInputGroupLayout>
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={startValue}
          label={startDate.label}
          placeholder={startDate.placeholder || format || DEFAULT_PROPS.placeholder}
          onChange={handleStartDateChange}
          onBlur={handleBlur}
          status={startHasError ? 'error' : undefined}
          guide={getStartHelperText()}
        />
      </div>
      {typeof separator === 'string' ? <MDSTypography data-role="separator">{separator}</MDSTypography> : separator}
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={endValue}
          label={endDate.label}
          placeholder={endDate.placeholder || format || DEFAULT_PROPS.placeholder}
          onChange={handleEndDateChange}
          onBlur={handleBlur}
          status={endHasError ? 'error' : undefined}
          guide={getEndHelperText()}
        />
      </div>
    </DateInputGroupLayout>
  );
};

export const MDSDateInputGroup = DateInputGroup;
export type MDSDateInputGroupProps = Props;
