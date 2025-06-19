import { SingleDateInput } from '../DateInputGroup/@types';

export type DateInputProps = {
  minDate?: Date;
  maxDate?: Date;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  onDateChange?: (dates: Date | null) => void;
} & SingleDateInput;
