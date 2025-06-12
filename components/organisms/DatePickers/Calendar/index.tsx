import dayjs from 'dayjs';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSDivider } from '../../../atoms/Divider';
import { CalendarLayout, CalendarGrid, DayCell, WeekdayHeader } from './styles';
import { YearMonthSelector } from './YearMonthSelector';
import { useCalendar } from './@hooks/useCalendar';
import { CalendarDay, CommonOptions, DateRangeValue, SingleDateValue } from './@types';
import { WEEKDAYS } from './@constants';

type Props = CommonOptions & (SingleDateValue | DateRangeValue);

const CalendarContainer = (props: Props) => {
  const { value, calendarDays, displayedDate, setDisplayedDate, onChange } = useCalendar(props);

  const isDateRange = 'startDate' in props.value;

  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    // onChange([startDate, endDate]);
  };

  return (
    <CalendarLayout>
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
      {'startDate' in props.value ? (
        // <DateRangeCalendarContent
        //   days={calendarDays}
        //   initialDate={value}
        //   minDate={props.minDate}
        //   maxDate={props.maxDate}
        //   onChange={handleDateRangeChange}
        // />
        <div>test</div>
      ) : (
        <SingleDateCalendarContent days={calendarDays} value={value.startDate} onChange={onChange} />
      )}
    </CalendarLayout>
  );
};

// const DateRangeCalendarContent = (props: {
//   days: CalendarDay[];
//   initialDate: { startDate: Date; endDate: Date };
//   minDate?: Date;
//   maxDate?: Date;
//   onChange: (startDate: Date, endDate: Date) => void;
// }) => {
//   const { days, initialDate, minDate, maxDate, onChange } = props;

//   const calendarContainerRef = useRef<HTMLDivElement>(null);
//   const dragProps = useDragSelect({
//     calendarContainerRef,
//     startDate: initialDate.startDate,
//     lastDate: initialDate.endDate,
//     minDate: props.minDate,
//     maxDate: props.maxDate,
//     onDateRangeUpdate: (startDateStr, lastDateStr) => {
//       onChange(dayjs(startDateStr).toDate(), dayjs(lastDateStr).toDate());
//     },
//   });
//   return (
//     <CalendarGrid onMouseMove={dragProps.handleDragMove} ref={calendarContainerRef}>
//       {days.map((day, index) => {
//         const dayDate = dayjs(day.date);
//         const dateStr = dayDate.format('YYYY-MM-DD');
//         const isToday = dayDate.isSame(dayjs(), 'day');
//         const isStartDate = dayDate.isSame(dayjs(startDate), 'day');
//         const isEndDate = dayDate.isSame(dayjs(endDate), 'day');
//         const isInRange = dayDate.isAfter(dayjs(startDate), 'day') && dayDate.isBefore(dayjs(endDate), 'day');

//         return (
//           <DayCell
//             key={index}
//             data-date={dateStr}
//             isDisplayedMonth={day.isDisplayedMonth}
//             isToday={isToday}
//             isSelectable={day.isSelectable}
//             isStartDate={isStartDate}
//             isEndDate={isEndDate}
//             isInRange={isInRange}
//             onClick={() => day.isDisplayedMonth && onChange(day.date)}
//             onMouseDown={dragProps.handleDragStart}
//             onMouseUp={dragProps.handleDragEnd}
//           >
//             <MDSTypography as="span">{dayDate.date()}</MDSTypography>
//           </DayCell>
//         );
//       })}
//     </CalendarGrid>
//   );
// };

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
