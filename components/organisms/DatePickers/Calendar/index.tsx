import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarContainer, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './useCalendar';

dayjs.extend(calendar);

type Props = {
  value: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (value: Date) => void;
};

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = (props: Props) => {
  const { value, calendarDays, displayedDate, setDisplayedDate, onChange } = useCalendar(props);

  return (
    <CalendarContainer>
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
      <CalendarGrid>
        {calendarDays.map((day, index) => {
          const dayDate = dayjs(day.date);
          const isToday = dayDate.isSame(dayjs(), 'day');
          const isSelected = dayDate.isSame(dayjs(value), 'day');
          const isFuture = dayDate.isAfter(dayjs(), 'day');

          return (
            <DayCell
              key={index}
              isDisplayedMonth={day.isDisplayedMonth}
              isToday={isToday}
              isSelectable={day.isSelectable}
              isSelected={isSelected}
              isFuture={isFuture}
              onClick={() => day.isDisplayedMonth && onChange(day.date)}
            >
              {dayDate.date()}
            </DayCell>
          );
        })}
      </CalendarGrid>
    </CalendarContainer>
  );
};

export const MDSCalendar = Calendar;
export type MDSCalendarProps = Props;
