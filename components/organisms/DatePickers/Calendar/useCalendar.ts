import { useState } from 'react';
import dayjs from 'dayjs';

type CalendarDay = {
  date: Date;
  isDisplayedMonth: boolean;
  isSelectable: boolean;
  weekIndex: number; // 0-5 사이의 값으로 몇 번째 주인지 표시
};
type Params = {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
};
export const useCalendar = (props: Params) => {
  const [_value, setValue] = useState<Date>(props.value);
  const [displayedDate, setDisplayedDate] = useState(dayjs(props.value));

  const calendarDays = getCalendarDays(displayedDate.toDate(), props.minDate, props.maxDate);

  return {
    value: _value,
    calendarDays,
    displayedDate,
    setDisplayedDate,
    onChange: (date: Date) => {
      setValue(date);
      props.onChange(date);
    },
  };
};

const getCalendarDays = (date: Date, minDate?: Date, maxDate?: Date): CalendarDay[] => {
  const currentDate = dayjs(date);
  const firstDayOfMonth = currentDate.startOf('month');
  const lastDayOfMonth = currentDate.endOf('month');

  // 이전 달의 마지막 날짜들
  const firstDayOfWeek = firstDayOfMonth.day();
  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
    date: firstDayOfMonth.subtract(firstDayOfWeek - i, 'day').toDate(),
    isDisplayedMonth: false,
    isSelectable: getIsSelectable(firstDayOfMonth.add(i, 'day').toDate(), minDate, maxDate),
    weekIndex: 0,
  }));

  // 현재 달의 날짜들
  const currentMonthDays = Array.from({ length: lastDayOfMonth.date() }, (_, i) => ({
    date: firstDayOfMonth.add(i, 'day').toDate(),
    isDisplayedMonth: true,
    isSelectable: getIsSelectable(firstDayOfMonth.add(i, 'day').toDate(), minDate, maxDate),
    weekIndex: Math.floor((firstDayOfWeek + i) / 7),
  }));

  // 다음 달의 시작 날짜들
  const remainingDays = 42 - (prevMonthDays.length + currentMonthDays.length);
  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => ({
    date: lastDayOfMonth.add(i + 1, 'day').toDate(),
    isDisplayedMonth: false,
    isSelectable: getIsSelectable(firstDayOfMonth.add(i, 'day').toDate(), minDate, maxDate),
    weekIndex: Math.floor((firstDayOfWeek + currentMonthDays.length + i) / 7),
  }));

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
};
const getIsSelectable = (date: Date, minDate?: Date, maxDate?: Date) => {
  if (!minDate && !maxDate) return true;
  if (minDate && maxDate) return dayjs(date).isAfter(minDate) && dayjs(date).isBefore(maxDate);
  if (minDate) return dayjs(date).isAfter(minDate);
  if (maxDate) return dayjs(date).isBefore(maxDate);
  return true;
};
