import { useState, useEffect } from 'react';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSInput, MDSInputProps } from '../../../molecules/Input';
import { DateInputGroupLayout } from './styles';
import { autoformatDate, isValidDate, parseDateString } from './@utils';

type DateInputProps = {
  value?: MDSInputProps<string>['value'];
  label?: MDSInputProps<string>['label'];
  placeholder?: MDSInputProps<string>['placeholder'];
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: string) => void;
  isError?: boolean;
  helperText?: string;
};

type Props = {
  separator?: React.ReactNode;
  startDate: DateInputProps;
  endDate: DateInputProps;
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

const DateInputGroup = ({ separator = DEFAULT_PROPS.separator, startDate, endDate }: Props) => {
  const [startValue, setStartValue] = useState(startDate.value || '');
  const [endValue, setEndValue] = useState(endDate.value || '');

  const [isStartError, setIsStartError] = useState(false);
  const [isEndError, setIsEndError] = useState(false);

  useEffect(() => {
    setStartValue(startDate.value || '');
  }, [startDate.value]);

  useEffect(() => {
    setEndValue(endDate.value || '');
  }, [endDate.value]);

  const createDateChangeHandler =
    (
      dateProps: DateInputProps,
      setValue: React.Dispatch<React.SetStateAction<string>>,
      setError: React.Dispatch<React.SetStateAction<boolean>>
    ) =>
    (inputValue: string) => {
      const { format = DEFAULT_PROPS.format, minDate, maxDate, onChange } = dateProps;
      const formattedValue = autoformatDate(inputValue, format);
      setValue(formattedValue);
      onChange(formattedValue);

      const parsedDate = parseDateString(formattedValue, format);
      if (formattedValue.length >= format.length) {
        const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
        setError(!isValid || isOutOfRange);
      } else {
        setError(false);
      }
    };

  const handleStartDateChange = createDateChangeHandler(startDate, setStartValue, setIsStartError);
  const handleEndDateChange = createDateChangeHandler(endDate, setEndValue, setIsEndError);

  const startHasError = isStartError || startDate.isError;
  const endHasError = isEndError || endDate.isError;

  return (
    <DateInputGroupLayout>
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={startValue}
          label={startDate.label}
          placeholder={startDate.placeholder || DEFAULT_PROPS.placeholder}
          onChange={handleStartDateChange}
          status={startHasError ? 'error' : undefined}
          guide={startHasError ? startDate.helperText || 'Invalid date' : undefined}
        />
      </div>
      {typeof separator === 'string' ? <MDSTypography data-role="separator">{separator}</MDSTypography> : separator}
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={endValue}
          label={endDate.label}
          placeholder={endDate.placeholder || DEFAULT_PROPS.placeholder}
          onChange={handleEndDateChange}
          status={endHasError ? 'error' : undefined}
          guide={endHasError ? endDate.helperText || 'Invalid date' : undefined}
        />
      </div>
    </DateInputGroupLayout>
  );
};

export const MDSDateInputGroup = DateInputGroup;
export type MDSDateInputGroupProps = Props;
