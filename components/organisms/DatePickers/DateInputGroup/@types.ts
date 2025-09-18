import { MDSInputProps } from '../../../molecules/Input';
import { DateValidationError } from '../@types';
import { AvailableDateFormat } from '../DateRangePicker/@types';

export type DateInputError = {
  start: DateValidationError | null;
  end: DateValidationError | null;
  range: boolean;
};

export type SingleDateInput = {
  value?: MDSInputProps<string>['value'];
  label?: MDSInputProps<string>['label'];
  placeholder?: MDSInputProps<string>['placeholder'];
  onChange?: (value: string | undefined) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  isError?: boolean;
  helperText?: string;
};

export type DateInputGroupProps = {
  separator?: React.ReactNode;
  startDate: SingleDateInput;
  endDate: SingleDateInput;
  minDate?: Date;
  maxDate?: Date;
  format?: AvailableDateFormat;
  initialFocus?: 'startDate' | 'endDate';
  onDateChange?: (dates?: { startDate?: Date; endDate?: Date }) => void;
  onError?: (error?: DateInputError) => void;
};
