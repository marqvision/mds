import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { MDSCalendar } from '../Calendar';
import { DEFAULT_PROPS } from '../DateInputGroup/@constants';
import { SingleDateInput } from '../DateInputGroup/@types';
import { MDSDateInput } from '../DateInput';

const DatePickerLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 300px;
`;

type Props = {
  format?: 'MM/DD/YYYY' | 'YYYY-MM-DD';
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
} & SingleDateInput;

const DatePicker = (props: Props) => {
  const { value, format = DEFAULT_PROPS.format, onChange, minDate, maxDate } = props;

  const [store, setStore] = useState<Date | undefined>(value ? dayjs(value).toDate() : undefined);
  const frozenOnChange = useRef(onChange);

  const handleDateInputChange = useCallback((date: Date | null) => {
    setStore(date ? dayjs(date).toDate() : undefined);

    if (frozenOnChange.current) {
      frozenOnChange.current(date);
    }
  }, []);

  const handleCalendarChange = useCallback((date: Date) => {
    setStore(date);
    if (frozenOnChange.current) {
      frozenOnChange.current(date);
    }
  }, []);

  return (
    <DatePickerLayout>
      <MDSDateInput
        format={format}
        value={store ? dayjs(store).format(format) : undefined}
        onDateChange={handleDateInputChange}
        minDate={minDate}
        maxDate={maxDate}
      />
      <MDSCalendar value={store} onChange={handleCalendarChange} minDate={minDate} maxDate={maxDate} />
    </DatePickerLayout>
  );
};

export const MDSDatePicker = DatePicker;
// export type MDSDateRangePickerProps = Props;
