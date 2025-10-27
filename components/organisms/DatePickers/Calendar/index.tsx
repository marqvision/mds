import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarLayout, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './@hooks/useCalendar';
import { CalendarDay, CommonOptions, DateRangeValue, LastUpdatedDateKind, SingleDateValue } from './@types';
import { WEEKDAYS } from './@constants';
import { useDateRangeSelect } from './@hooks/useDateRangeSelect';

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
              size="m"
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
  onChange: (
    startDate: Date,
    endDate: Date,
    lastUpdatedDateType: LastUpdatedDateKind,
    actionState: 'initial' | 'in-progress' | 'done'
  ) => void;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const { days, selectedDate, minDate, maxDate, onChange } = props;

  const { selectActionState, selectMove, selectStart, selectEnd, displayDate } = useDateRangeSelect({
    startDate: selectedDate.startDate,
    endDate: selectedDate.endDate,
    minDate,
    maxDate,
    onDateRangeUpdate: (startDate, lastDate, lastUpdatedDateType, actionState) => {
      onChange(startDate, lastDate, lastUpdatedDateType, actionState);
    },
  });

  return (
    <CalendarGrid onMouseMove={selectMove} onMouseDown={selectStart} onMouseUp={selectEnd}>
      {days.map((day, index) => {
        const dayDate = dayjs(day.date);
        const dateStr = dayDate.format('YYYY-MM-DD');
        const isToday = dayDate.isSame(dayjs(), 'day');
        const isStartDate = displayDate.startDate ? dayDate.isSame(dayjs(displayDate.startDate), 'day') : false;
        const isEndDate = displayDate.endDate ? dayDate.isSame(dayjs(displayDate.endDate), 'day') : false;
        const isStartAndEndSame =
          displayDate.startDate && displayDate.endDate
            ? dayjs(displayDate.startDate).isSame(dayjs(displayDate.endDate), 'day')
            : false;
        const isInRange =
          displayDate.startDate && displayDate.endDate
            ? dayDate.isAfter(dayjs(displayDate.startDate), 'day') &&
              dayDate.isBefore(dayjs(displayDate.endDate), 'day')
            : false;

        return (
          <DayCell
            key={index}
            data-date={dateStr}
            isDisplayedMonth={day.isDisplayedMonth}
            isToday={isToday}
            isSelectable={day.isSelectable}
            isStartDate={isStartDate}
            isEndDate={isEndDate}
            isStartAndEndSame={isStartAndEndSame}
            isInRange={isInRange}
            isAnchorDate={selectActionState.anchorDateStr === dateStr}
            isSelectionInProgress={selectActionState.actionState === 'in-progress'}
          >
            <MDSTypography size="l" as="span">
              {dayDate.date()}
            </MDSTypography>
          </DayCell>
        );
      })}
    </CalendarGrid>
  );
};

const SingleDateCalendarContent = (props: {
  days: CalendarDay[];
  value?: Date;
  onChange: (date: Date, isDisplayedMonth: boolean) => void;
}) => {
  const { days, value, onChange } = props;

  return (
    <CalendarGrid>
      {days.map((day, index) => {
        const dayDate = dayjs(day.date);
        const dateStr = dayDate.format('YYYY-MM-DD');
        const isToday = dayDate.isSame(dayjs(), 'day');
        const isSelectedDate = value ? dayDate.isSame(dayjs(value), 'day') : false;

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
            onClick={() => onChange(day.date, day.isDisplayedMonth)}
          >
            <MDSTypography size="l" as="span">
              {dayDate.date()}
            </MDSTypography>
          </DayCell>
        );
      })}
    </CalendarGrid>
  );
};
export const MDSCalendar = CalendarContainer;
export type MDSCalendarProps = Props;
