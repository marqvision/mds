import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { MDSCalendar } from '../Calendar';
import { MDSDateInputGroup } from '../DateInputGroup';
import { DEFAULT_PROPS } from '../DateInputGroup/@constants';
import { SingleDateInput } from '../DateInputGroup/@types';

const DateRangePickerLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
`;

type Props = {
  startDate?: SingleDateInput;
  endDate?: SingleDateInput;
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  onChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
  minDate?: Date;
  maxDate?: Date;
};

const DateRangePicker = (props: Props) => {
  const { startDate, endDate, format = DEFAULT_PROPS.format, onChange, minDate, maxDate } = props;

  const [store, setStore] = useState<
    | {
        startDate: Date;
        endDate: Date;
      }
    | undefined
  >(
    startDate?.value && endDate?.value
      ? {
          startDate: dayjs(startDate.value, format).toDate(),
          endDate: dayjs(endDate.value, format).toDate(),
        }
      : undefined
  );
  const frozenOnChange = useRef(onChange);

  const handleDateInputGroupChange = useCallback((dates: { startDate: Date | null; endDate: Date | null }) => {
    setStore(
      dates.startDate && dates.endDate
        ? {
            startDate: dayjs(dates.startDate, format).toDate(),
            endDate: dayjs(dates.endDate, format).toDate(),
          }
        : undefined
    );

    if (frozenOnChange.current) {
      frozenOnChange.current(dates);
    }
  }, [format]);

  const handleCalendarChange = useCallback((startDate: Date, endDate: Date) => {
    setStore({
      startDate,
      endDate,
    });
    if (frozenOnChange.current) {
      frozenOnChange.current({
        startDate,
        endDate,
      });
    }
  }, []);

  return (
    <DateRangePickerLayout>
      <MDSDateInputGroup
        format={format}
        startDate={{
          value: store?.startDate ? dayjs(store?.startDate).format(format) : undefined,
        }}
        endDate={{
          value: store?.endDate ? dayjs(store?.endDate).format(format) : undefined,
        }}
        onDateChange={handleDateInputGroupChange}
        minDate={minDate}
        maxDate={maxDate}
      />
      <MDSCalendar
        value={{
          startDate: store?.startDate,
          endDate: store?.endDate,
        }}
        onChange={handleCalendarChange}
        minDate={minDate}
        maxDate={maxDate}
      />
    </DateRangePickerLayout>
  );
};

export const MDSDateRangePicker = DateRangePicker;
// export type MDSDateRangePickerProps = Props;
