import { MDSInputProps } from "../../../molecules/Input";

export type DateInputProps = {
  value?: MDSInputProps<string>['value'];
  label?: MDSInputProps<string>['label'];
  placeholder?: MDSInputProps<string>['placeholder'];
  onChange?: (value: string) => void;
  isError?: boolean;
  helperText?: string;
};


export type DateInputGroupProps = {
  separator?: React.ReactNode;
  startDate: DateInputProps;
  endDate: DateInputProps;
  minDate?: Date;
  maxDate?: Date;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  onDateChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
};