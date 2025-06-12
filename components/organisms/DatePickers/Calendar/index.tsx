import { useRef } from 'react';
import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarContainer, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './@hooks/useCalendar';

type Props = {
  value: Date | [Date, Date];
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = (props: Props) => {
  const calendarContainerRef = useRef<HTMLDivElement>(null);
  const { value, calendarDays, displayedDate, setDisplayedDate, onChange, dragProps } = useCalendar({
    ...props,
    calendarContainerRef,
  });
  const [startDate, endDate] = value;

  return (
    <CalendarContainer ref={calendarContainerRef}>
      {dayjs(startDate).format('YYYY-MM-DD')} - {dayjs(endDate).format('YYYY-MM-DD')}
      <YearMonthSelector value={displayedDate} onChange={setDisplayedDate} />
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
      <CalendarGrid onMouseMove={dragProps.handleDragMove}>
        {calendarDays.map((day, index) => {
          const dayDate = dayjs(day.date);
          const dateStr = dayDate.format('YYYY-MM-DD');
          const isToday = dayDate.isSame(dayjs(), 'day');
          const isStartDate = dayDate.isSame(dayjs(startDate), 'day');
          const isEndDate = dayDate.isSame(dayjs(endDate), 'day');
          const isInRange = dayDate.isAfter(dayjs(startDate), 'day') && dayDate.isBefore(dayjs(endDate), 'day');

          return (
            <DayCell
              key={index}
              data-date={dateStr}
              isDisplayedMonth={day.isDisplayedMonth}
              isToday={isToday}
              isSelectable={day.isSelectable}
              isStartDate={isStartDate}
              isEndDate={isEndDate}
              isInRange={isInRange}
              onClick={() => day.isDisplayedMonth && onChange(day.date)}
              onMouseDown={dragProps.handleDragStart}
              onMouseUp={dragProps.handleDragEnd}
            >
              <MDSTypography as="span">{dayDate.date()}</MDSTypography>
            </DayCell>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export const MDSCalendar = Calendar;
export type MDSCalendarProps = Props;
