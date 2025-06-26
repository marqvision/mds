import { MDSInputProps } from '../../../molecules/Input';
import { DateValidationError } from '../@types';
import { AvailableDateFormat } from '../DateRangePicker/@types';

export type SingleDateInput = {
  value?: MDSInputProps<string>['value'];
  label?: MDSInputProps<string>['label'];
  placeholder?: MDSInputProps<string>['placeholder'];
  onChange?: (value: string | undefined) => void;
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
  onDateChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  onError?: (error: DateValidationError) => void;
};
