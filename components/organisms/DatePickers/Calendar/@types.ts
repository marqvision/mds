// public facing interfaces
export type SingleDateValue = {
  value: Date;
  onChange: (date: Date) => void;
};
export type DateRangeValue = {
  value: { startDate: Date; endDate: Date };
  onChange: (startDate: Date, endDate: Date) => void;
};
export type CommonOptions = {
  minDate?: Date;
  maxDate?: Date;
}


// models
export type CalendarDay = {
  date: Date;
  isDisplayedMonth: boolean;
  isSelectable: boolean;
  weekIndex: number; // 0-5 사이의 값으로 몇 번째 주인지 표시
};