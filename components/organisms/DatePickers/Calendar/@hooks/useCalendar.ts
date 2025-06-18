import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { validateDateAndRange } from '../../@utils';
import { CalendarDay, CommonOptions, DateRangeValue, SingleDateValue } from '../@types';

type Params = CommonOptions & (SingleDateValue | DateRangeValue);
export const useCalendar = (params: Params) => {
  const [_value, setValue] = useState<{ startDate?: Date; endDate?: Date }>(
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

  useEffect(() => {
    // note-@jamie: 외부 입력 값으로 min/maxDate를 벗어나면 calendar에서는 그냥 값을 무시하기로 하고, 입력하는 쪽에서 에러를 표시하는 방향으로.
    if (isDateRange(params)) {
      const { isValid: isStartValid, isOutOfRange: isStartOutOfRange } = validateDateAndRange(
        params.value.startDate,
        params.minDate,
        params.maxDate
      );
      const { isValid: isEndValid, isOutOfRange: isEndOutOfRange } = validateDateAndRange(
        params.value.endDate,
        params.minDate,
        params.maxDate
      );

      if (isStartValid && !isStartOutOfRange && isEndValid && !isEndOutOfRange) {
        const whichDateChanged =
          _value.startDate?.toLocaleDateString() === params.value.startDate?.toLocaleDateString()
            ? 'endDate'
            : 'startDate';
        setValue({ startDate: params.value.startDate, endDate: params.value.endDate });
        setDisplayedDate(
          whichDateChanged === 'startDate' ? dayjs(params.value.startDate) : dayjs(params.value.endDate)
        );
      }
    } else {
      const { isValid, isOutOfRange } = validateDateAndRange(params.value, params.minDate, params.maxDate);
      if (isValid && !isOutOfRange) {
        setValue({ startDate: params.value, endDate: params.value });
        setDisplayedDate(dayjs(params.value));
      }
    }
    // note-@jamie: 의도된 exhaustive-deps -- params.onChange 함수의 참조를 얼려야 해결될듯..
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.value]);

  if (isDateRange(params)) {
    return {
      ...commonProps,
      type: 'range' as const,
      onChange: (startDate: Date, endDate: Date) => {
        const { isValid: isStartValid, isOutOfRange: isStartOutOfRange } = validateDateAndRange(
          startDate,
          params.minDate,
          params.maxDate
        );
        if (!isStartValid || isStartOutOfRange) return;

        const { isValid: isEndValid, isOutOfRange: isEndOutOfRange } = validateDateAndRange(
          endDate,
          params.minDate,
          params.maxDate
        );
        if (!isEndValid || isEndOutOfRange) return;

        setValue({ startDate, endDate });
        params.onChange(startDate, endDate);
      },
    };
  }

  return {
    ...commonProps,
    type: 'single' as const,
    onChange: (date: Date) => {
      const { isValid, isOutOfRange } = validateDateAndRange(date, params.minDate, params.maxDate);
      if (!isValid || isOutOfRange) return;

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

  const isSelectableDate = (d: Date) => {
    const { isValid, isOutOfRange } = validateDateAndRange(d, minDate, maxDate);
    return isValid && !isOutOfRange;
  };

  // 이전 달의 마지막 날짜들 --- 미래에 이 날짜들로 뭔가 하고 싶을 수도 있어서 일단은 남겨둠
  const firstDayOfWeek = firstDayOfMonth.day();
  const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
    const prevMonthDate = firstDayOfMonth.subtract(firstDayOfWeek - i, 'day').toDate();
    return {
      date: prevMonthDate,
      isDisplayedMonth: false,
      isSelectable: isSelectableDate(prevMonthDate),
      weekIndex: 0,
    };
  });

  // 현재 달의 날짜들
  const currentMonthDays = Array.from({ length: lastDayOfMonth.date() }, (_, i) => {
    const currentMonthDate = firstDayOfMonth.add(i, 'day').toDate();
    return {
      date: currentMonthDate,
      isDisplayedMonth: true,
      isSelectable: isSelectableDate(currentMonthDate),
      weekIndex: Math.floor((firstDayOfWeek + i) / 7),
    };
  });

  // 다음 달의 시작 날짜들 --- 미래에 이 날짜들로 뭔가 하고 싶을 수도 있어서 일단은 남겨둠
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
      isSelectable: isSelectableDate(nextMonthDate),
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
