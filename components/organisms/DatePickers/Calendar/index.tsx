import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarLayout, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './@hooks/useCalendar';
import { CalendarDay, CommonOptions, DateRangeValue, SingleDateValue } from './@types';
import { WEEKDAYS } from './@constants';
import { useDragSelect } from './@hooks/useDateRangeSelect';

type Props = CommonOptions & (SingleDateValue | DateRangeValue);

const CalendarContainer = (props: Props) => {
  const calendarState = useCalendar(props);

  return (
    <CalendarLayout>
      <YearMonthSelector
        displayedDate={calendarState.displayedDate}
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
          selectedDate={calendarState.value}
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
  selectedDate: DateRangeValue['value'];
  onChange: DateRangeValue['onChange'];
  minDate?: Date;
  maxDate?: Date;
}) => {
  const { days, selectedDate, minDate, maxDate, onChange } = props;

  const { dragState, dragMove, dragStart, dragEnd, displayDate } = useDragSelect({
    startDate: selectedDate.startDate,
    lastDate: selectedDate.endDate,
    minDate,
    maxDate,
    onDateRangeUpdate: (startDate, lastDate) => {
      onChange(startDate, lastDate);
    },
  });

  return (
    <CalendarGrid onMouseMove={dragMove} onMouseDown={dragStart} onMouseUp={dragEnd}>
      {days.map((day, index) => {
        const dayDate = dayjs(day.date);
        const dateStr = day.isDisplayedMonth ? dayDate.format('YYYY-MM-DD') : '';
        const isToday = dayDate.isSame(dayjs(), 'day');
        const isStartDate = dayDate.isSame(dayjs(displayDate.startDate), 'day');
        const isEndDate = dayDate.isSame(dayjs(displayDate.endDate), 'day');
        const isStartAndEndSame = dayjs(displayDate.startDate).isSame(dayjs(displayDate.endDate), 'day');
        const isInRange =
          dayDate.isAfter(dayjs(displayDate.startDate), 'day') && dayDate.isBefore(dayjs(displayDate.endDate), 'day');

        return (
          <DayCell
            key={index}
            data-date={dateStr}
            isDisplayedMonth={day.isDisplayedMonth}
            isToday={isToday}
            isSelectable={day.isSelectable && day.isDisplayedMonth}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isStartAndEndSame={isStartAndEndSame}
            isInRange={isInRange}
            isAnchorDate={dragState.anchorDateStr === dateStr}
            isSelectionInProgress={dragState.actionState === 'in-progress'}
          >
            {day.isDisplayedMonth && <MDSTypography as="span">{dayDate.date()}</MDSTypography>}
          </DayCell>
        );
      })}
      <Debugger
        title="date range"
        data={{
          displayDate,
          dragState,
        }}
      />
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
            isStartAndEndSame={true}
            onClick={() => day.isDisplayedMonth && onChange(day.date)}
          >
            {day.isDisplayedMonth && <MDSTypography as="span">{dayDate.date()}</MDSTypography>}
          </DayCell>
        );
      })}
    </CalendarGrid>
  );
};
export const MDSCalendar = CalendarContainer;
export type MDSCalendarProps = Props;

///-----

const Debugger = ({ title, data }: { title: string; data: any }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 400,
        height: '100%',
        overflow: 'auto',

        border: '1px solid gray',
        fontSize: '12px',
      }}
    >
      <MDSTypography variant="title">{title}</MDSTypography>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
