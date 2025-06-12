import { useState } from 'react';
import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarLayout, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './@hooks/useCalendar';
import { CalendarDay, CommonOptions, DateRangeSelectionMode, DateRangeValue, SingleDateValue } from './@types';
import { WEEKDAYS } from './@constants';
import { useDragSelect } from './@hooks/useDateRangeSelect';

type Props = CommonOptions & (SingleDateValue | DateRangeValue);

const CalendarContainer = (props: Props) => {
  const calendarState = useCalendar(props);

  return (
    <CalendarLayout>
      <YearMonthSelector
        value={calendarState.displayedDate}
        minDate={props.minDate}
        maxDate={props.maxDate}
        onChange={calendarState.setDisplayedDate}
      />
      <WeekdayHeader>
        <MDSDivider intensity="weak" length="100%" orientation="horizontal" />
        <div>
          {WEEKDAYS.map((weekday, index) => (
            <MDSTypography
              key={`weekday-${index}`}
              variant="body"
              size="s"
              color="color/content/neutral/secondary/normal"
            >
              {weekday}
            </MDSTypography>
          ))}
        </div>
        <MDSDivider intensity="weak" length="100%" orientation="horizontal" />
      </WeekdayHeader>
      {calendarState.type === 'range' ? (
        <DateRangeCalendarContent
          days={calendarState.calendarDays}
          initialDate={calendarState.value}
          minDate={props.minDate}
          maxDate={props.maxDate}
          onChange={calendarState.onChange}
        />
      ) : (
        <SingleDateCalendarContent
          days={calendarState.calendarDays}
          value={calendarState.value.startDate}
          onChange={calendarState.onChange}
        />
      )}
    </CalendarLayout>
  );
};

const DateRangeCalendarContent = (props: {
  days: CalendarDay[];
  initialDate: { startDate: Date; endDate: Date };
  minDate?: Date;
  maxDate?: Date;
  onChange: (startDate: Date, endDate: Date) => void;
}) => {
  const { days, initialDate, minDate, maxDate, onChange } = props;

  const [dateSelectionMode, setDateSelectionMode] = useState<DateRangeSelectionMode>('click');

  const dragProps = useDragSelect({
    startDate: initialDate.startDate,
    lastDate: initialDate.endDate,
    minDate,
    maxDate,
    onDateRangeUpdate: (startDateStr, lastDateStr) => {
      onChange(dayjs(startDateStr).toDate(), dayjs(lastDateStr).toDate());
    },
    onDateRangeSelectionModeChange: () => {
      setDateSelectionMode('drag');
    },
  });

  return (
    <CalendarGrid onMouseMove={dragProps.handleDragMove}>
      {days.map((day, index) => {
        const dayDate = dayjs(day.date);
        const dateStr = day.isDisplayedMonth ? dayDate.format('YYYY-MM-DD') : '';
        const isToday = dayDate.isSame(dayjs(), 'day');
        const isStartDate = dayDate.isSame(dayjs(initialDate.startDate), 'day');
        const isEndDate = dayDate.isSame(dayjs(initialDate.endDate), 'day');
        const isInRange =
          dayDate.isAfter(dayjs(initialDate.startDate), 'day') && dayDate.isBefore(dayjs(initialDate.endDate), 'day');

        return (
          <DayCell
            key={index}
            data-date={dateStr}
            isDisplayedMonth={day.isDisplayedMonth}
            isToday={isToday}
            isSelectable={day.isSelectable && day.isDisplayedMonth}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isInRange={isInRange}
            dateSelectionMode={dateSelectionMode}
            onClick={() => day.isDisplayedMonth && onChange(dayDate.toDate(), dayDate.toDate())}
            onMouseDown={dragProps.handleDragStart}
            onMouseUp={dragProps.handleDragEnd}
          >
            {day.isDisplayedMonth && <MDSTypography as="span">{dayDate.date()}</MDSTypography>}
          </DayCell>
        );
      })}
    </CalendarGrid>
  );
};

const SingleDateCalendarContent = (props: { days: CalendarDay[]; value: Date; onChange: (date: Date) => void }) => {
  const { days, value, onChange } = props;
  return (
    <CalendarGrid>
      {days.map((day, index) => {
        const dayDate = dayjs(day.date);
        const dateStr = dayDate.format('YYYY-MM-DD');
        const isToday = dayDate.isSame(dayjs(), 'day');
        const isSelectedDate = dayDate.isSame(dayjs(value), 'day');

        return (
          <DayCell
            key={index}
            data-date={dateStr}
            isDisplayedMonth={day.isDisplayedMonth}
            isToday={isToday}
            isSelectable={day.isSelectable}
            isStartDate={isSelectedDate}
            isEndDate={isSelectedDate}
            onClick={() => day.isDisplayedMonth && onChange(day.date)}
          >
            <MDSTypography as="span">{dayDate.date()}</MDSTypography>
          </DayCell>
        );
      })}
    </CalendarGrid>
  );
};
export const MDSCalendar = CalendarContainer;
export type MDSCalendarProps = Props;
