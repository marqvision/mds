import { SingleDateInput } from '../DateInputGroup/@types';
import { AvailableDateFormat } from '../DateRangePicker/@types';

export type DateInputProps = {
  minDate?: Date;
  maxDate?: Date;
  format?: AvailableDateFormat;
  onDateChange?: (dates: Date | null) => void;
} & SingleDateInput;
