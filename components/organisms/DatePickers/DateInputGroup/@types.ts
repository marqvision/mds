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
  preventClearValue?: boolean; // 만일 true라면, 텍스트를 모두 지우면 마지막 valid date로 원복시켜버린다
  onDateChange?: (dates?: { startDate?: Date; endDate?: Date }) => void;
  onError?: (error?: DateInputError) => void;
};
