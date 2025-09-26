import { SingleDateInput } from '../DateInputGroup/@types';
import { AvailableDateFormat, DateValidationError } from '../@types';

export type DateInputProps = {
  minDate?: Date;
  maxDate?: Date;
  format?: AvailableDateFormat;
  onDateChange?: (dates: Date | null) => void;
  onError?: (error?: DateValidationError) => void;
  preventClearValue?: boolean; // 만일 true라면, 텍스트를 모두 지우면 마지막 valid date로 원복시켜버린다
} & SingleDateInput;
