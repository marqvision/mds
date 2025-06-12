import { useState } from 'react';
import dayjs from 'dayjs';
import { getIsSelectable } from '../../@utils';
import { CalendarDay, CommonOptions, DateRangeValue, SingleDateValue } from '../@types';

type Params = CommonOptions & (SingleDateValue | DateRangeValue);
export const useCalendar = (params: Params) => {
  const [_value, setValue] = useState<{ startDate: Date; endDate: Date }>(
    isDateRange(params) ? params.value : { startDate: params.value, endDate: params.value }
  );
  const [displayedDate, setDisplayedDate] = useState(
    dayjs(isDateRange(params) ? params.value.startDate : params.value)
  );

  const calendarDays = getCalendarDays(displayedDate.toDate(), params.minDate, params.maxDate);

  const commonProps = {
    value: _value,
    calendarDays,
    displayedDate,
    setDisplayedDate,
  };

  if (isDateRange(params)) {
    return {
      ...commonProps,
      type: 'range' as const,
      onChange: (startDate: Date, endDate: Date) => {
        if (!getIsSelectable(startDate, params.minDate, params.maxDate)) return;
        if (!getIsSelectable(endDate, params.minDate, params.maxDate)) return;
        setValue({ startDate, endDate });
        params.onChange(startDate, endDate);
      },
    };
  }

  return {
    ...commonProps,
    type: 'single' as const,
    onChange: (date: Date) => {
      if (!getIsSelectable(date, params.minDate, params.maxDate)) return;
      setValue({ startDate: date, endDate: date });
      params.onChange(date);
    },
  };
};

//#region - util functions dedicated to useCalendar
const isDateRange = (params: SingleDateValue | DateRangeValue): params is DateRangeValue => {
  return 'value' in params && typeof params.value === 'object' && 'startDate' in params.value;
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
  const totalDays = prevMonthDays.length + currentMonthDays.length;
  const remainingDays = 42 - totalDays;

  // 마지막 주가 다음 달의 날짜로만 구성되어 있는지 확인
  const lastWeekStartIndex = Math.floor((firstDayOfWeek + currentMonthDays.length - 1) / 7) * 7;
  const isLastWeekNextMonthOnly = lastWeekStartIndex >= currentMonthDays.length;

  const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
    const nextMonthDate = lastDayOfMonth.add(i + 1, 'day').toDate();
    const weekIndex = Math.floor((firstDayOfWeek + currentMonthDays.length + i) / 7);

    // 마지막 주가 다음 달의 날짜로만 구성된 경우
    if (isLastWeekNextMonthOnly && weekIndex === 5) {
      return {
        date: nextMonthDate,
        isDisplayedMonth: false,
        isSelectable: false,
        weekIndex,
      };
    }

    return {
      date: nextMonthDate,
      isDisplayedMonth: false,
      isSelectable: getIsSelectable(nextMonthDate, minDate, maxDate),
      weekIndex,
    };
  });

  return [
    ...(prevMonthDays.length < 7 ? prevMonthDays : []),
    ...currentMonthDays,
    ...(nextMonthDays.length < 7 ? nextMonthDays : []),
  ];
};
//#endregion