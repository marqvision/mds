import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

type CalendarDay = {
  date: Date;
  isDisplayedMonth: boolean;
  isSelectable: boolean;
  weekIndex: number; // 0-5 사이의 값으로 몇 번째 주인지 표시
};
type Params = {
  value: Date | [Date, Date];
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
  calendarContainerRef: React.RefObject<HTMLDivElement>;
};
export const useCalendar = (props: Params) => {
  const [_value, setValue] = useState<[Date, Date]>(
    Array.isArray(props.value) ? props.value : [props.value, props.value]
  );
  const [displayedDate, setDisplayedDate] = useState(dayjs(Array.isArray(props.value) ? props.value[0] : props.value));

  const calendarDays = getCalendarDays(displayedDate.toDate(), props.minDate, props.maxDate);

  const dragProps = useDragSelect({
    calendarContainerRef: props.calendarContainerRef,
    startDate: _value[0],
    lastDate: _value[1],
    minDate: props.minDate,
    maxDate: props.maxDate,
    onDateRangeUpdate: (startDateStr, lastDateStr) => {
      setValue([dayjs(startDateStr).toDate(), dayjs(lastDateStr).toDate()]);
    },
  });

  return {
    value: _value,
    calendarDays,
    displayedDate,
    setDisplayedDate,
    onChange: (date: Date) => {
      if (!getIsSelectable(date, props.minDate, props.maxDate)) return;
      setValue([date, date]);
      props.onChange(date);
    },
    dragProps,
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
const getIsSelectable = (rawDate: Date | string, minDate?: Date, maxDate?: Date) => {
  const date = typeof rawDate === 'string' ? dayjs(rawDate).toDate() : rawDate;

  if (!minDate && !maxDate) return true;
  if (minDate && maxDate) return dayjs(date).isAfter(minDate, 'day') && dayjs(date).isBefore(maxDate, 'day');
  if (minDate) return dayjs(date).isAfter(minDate, 'day');
  if (maxDate) return dayjs(date).isBefore(maxDate, 'day');
  return true;
};

///-----

const useDragSelect = (params: {
  calendarContainerRef: React.RefObject<HTMLDivElement>;
  startDate: Date;
  lastDate: Date;
  minDate?: Date;
  maxDate?: Date;
  onDateRangeUpdate: (startDate: Date, lastDate: Date) => void;
}) => {
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    anchorDateStr: string;
    startDateStr: string;
    endDateStr: string;
  }>({
    isDragging: false,
    anchorDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    startDateStr: dayjs(params.startDate).format('YYYY-MM-DD'),
    endDateStr: dayjs(params.lastDate).format('YYYY-MM-DD'),
  });

  const handleDragStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !getIsSelectable(dateStr, params.minDate, params.maxDate)) return;

    setDragState({ isDragging: true, anchorDateStr: dateStr, startDateStr: dateStr, endDateStr: dateStr });
  };
  const handleDragMove = (event: React.MouseEvent) => {
    const currentAnchorDateStr = calculateCurrentDate(event);

    if (!dragState.isDragging || !currentAnchorDateStr) return;
    if (!getIsSelectable(currentAnchorDateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => {
      if (!prev.startDateStr) return prev;

      let [newStartDate, newEndDate] = [prev.startDateStr, prev.endDateStr];

      const currentDate = dayjs(currentAnchorDateStr);
      const anchorDate = dayjs(prev.anchorDateStr);

      if (currentDate.isBefore(anchorDate, 'day')) {
        newStartDate = currentAnchorDateStr;
        newEndDate = prev.anchorDateStr;
      } else if (currentDate.isAfter(anchorDate, 'day')) {
        newStartDate = prev.anchorDateStr;
        newEndDate = currentAnchorDateStr;
      }

      params.onDateRangeUpdate(dayjs(newStartDate).toDate(), dayjs(newEndDate).toDate());
      return { ...prev, startDateStr: newStartDate, endDateStr: newEndDate };
    });
  };

  const handleDragEnd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const dateStr = (e.currentTarget as HTMLElement).getAttribute('data-date');
    if (!dateStr || !getIsSelectable(dateStr, params.minDate, params.maxDate)) return;

    setDragState((prev) => ({
      isDragging: false,
      anchorDateStr: prev.anchorDateStr,
      startDateStr: prev.startDateStr,
      endDateStr: dateStr,
    }));
  };

  //#region - Mouse action by area
  useEffect(() => {
    const onMouseLeave = () => {
      setDragState((prev) => ({
        ...prev,
        isDragging: false,
      }));
    };
    const containerDom = params.calendarContainerRef.current;
    if (containerDom) {
      if (dragState.isDragging) {
        containerDom?.addEventListener('mouseup', onMouseLeave);
        containerDom?.addEventListener('mouseleave', onMouseLeave);
      } else {
        containerDom?.removeEventListener('mouseup', onMouseLeave);
        containerDom?.addEventListener('mouseleave', onMouseLeave);
      }

      return () => {
        containerDom?.removeEventListener('mouseup', onMouseLeave);
        containerDom?.addEventListener('mouseleave', onMouseLeave);
      };
    }
  }, [dragState.isDragging, params.calendarContainerRef, setDragState]);
  //#endregion

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
};

const calculateCurrentDate = (event: React.MouseEvent) => {
  const targetElement = event.target as HTMLElement;

  // 바로 event.target에서 data-index를 확인
  let itemDate = targetElement.getAttribute('data-date');
  if (itemDate !== null) {
    return itemDate;
  }

  const { clientX, clientY } = event;
  const elements = document.elementsFromPoint(clientX, clientY);
  for (const el of elements) {
    itemDate = el.getAttribute('data-date');
    if (itemDate !== null) {
      return itemDate;
    }
  }

  return null; // 조건에 맞는 요소가 없을 경우
};
