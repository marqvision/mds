import { DateValidationError } from "../@types";

// public facing interfaces
export type SingleDateValue = {
  value?: Date;
  onChange: (date: Date) => void;
  onError?: (error: DateValidationError) => void;
};
export type DateRangeValue = {
  value: { startDate?: Date; endDate?: Date };
  onChange: (startDate: Date, endDate: Date) => void;
  onError?: (error: DateValidationError) => void;
};
export type CommonOptions = {
  minDate?: Date;
  maxDate?: Date;
};
// models

export type CalendarDay = {
  date: Date;
  isDisplayedMonth: boolean;
  isSelectable: boolean;
  weekIndex: number;
};
export type DateRangeSelectionMode = 'drag' | 'click'; // date input group으로 입력하는 것도 'click'과 동일한 모드로 처리한다.
