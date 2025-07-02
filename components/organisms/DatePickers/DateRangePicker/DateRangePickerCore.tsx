import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSDateInputGroup } from '../DateInputGroup';
import { MDSCalendar } from '../Calendar';
import { MDSDivider } from '../../../atoms/Divider';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSButton } from '../../../molecules/Button';
import { DEFAULT_PROPS } from '../@constants';
import { DateValidationError } from '../@types';
import { validateDateRange } from '../@utils';
import { DateInputError } from '../DateInputGroup/@types';
import { DateRangePickerProps } from './@types';

const DateRangePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 304px;
  background-color: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
`;
const DateRangePickerLayout = styled.div`
  display: flex;
  flex-direction: column;

  .mds-date-picker-input-container {
    width: 100%;
    padding: 12px 12px 0;
  }
`;
const DateRangePickerActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px;
`;

export const DateRangePickerCore = (props: DateRangePickerProps) => {
  const {
    startDate,
    endDate,
    format = DEFAULT_PROPS.format,
    onChange,
    minDate,
    maxDate,
    anchor,
    initialFocus,
    onClose,
  } = props;

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
  const [childError, setChildError] = useState<{
    dateInputGroup: boolean;
    calendar: boolean;
  }>({
    dateInputGroup: false,
    calendar: false,
  });
  const frozenOnChange = useRef(onChange);

  const handleDateInputGroupChange = useCallback(
    (dates: { startDate: Date | null; endDate: Date | null }) => {
      setStore(
        dates.startDate && dates.endDate
          ? {
              startDate: dayjs(dates.startDate, format).toDate(),
              endDate: dayjs(dates.endDate, format).toDate(),
            }
          : undefined
      );
    },
    [format]
  );

  const handleCalendarChange = useCallback((startDate: Date, endDate: Date) => {
    setStore({
      startDate,
      endDate,
    });
  }, []);

  const handleApply = () => {
    if (frozenOnChange.current) {
      frozenOnChange.current({
        startDate: store?.startDate ?? null,
        endDate: store?.endDate ?? null,
      });
    }
  };

  const handleDateInputGroupError = (error?: DateInputError) => {
    setChildError((prev) => ({
      ...prev,
      dateInputGroup: !!(error?.start || error?.end || error?.range),
    }));
  };

  const handleCalendarError = (error: DateValidationError) => {
    setChildError((prev) => ({
      ...prev,
      calendar: !!error,
    }));
  };

  const isReadyToApply =
    !(childError.calendar || childError.dateInputGroup) &&
    validateDateRange({
      startDate: store?.startDate ?? null,
      endDate: store?.endDate ?? null,
      format,
      minDate,
      maxDate,
    });
    
  return (
    <DateRangePickerContainer>
      <DateRangePickerLayout>
        <div className="mds-date-picker-input-container">
          <MDSDateInputGroup
            format={format}
            startDate={{
              value: store?.startDate ? dayjs(store?.startDate).format(format) : undefined,
            }}
            endDate={{
              value: store?.endDate ? dayjs(store?.endDate).format(format) : undefined,
            }}
            onDateChange={handleDateInputGroupChange}
            onError={handleDateInputGroupError}
            minDate={minDate}
            maxDate={maxDate}
            initialFocus={initialFocus}
          />
        </div>
        <MDSCalendar
          value={{
            startDate: store?.startDate,
            endDate: store?.endDate,
          }}
          onChange={handleCalendarChange}
          onError={handleCalendarError}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DateRangePickerLayout>

      <MDSDivider />

      <DateRangePickerActionContainer>
        <MDSPlainButton
          color="bluegray"
          onClick={() => {
            onClose?.();
          }}
        >
          Cancel
        </MDSPlainButton>
        <MDSButton
          isDisabled={!isReadyToApply}
          onClick={() => {
            handleApply();
            onClose?.();
          }}
        >
          Apply
        </MDSButton>
      </DateRangePickerActionContainer>
    </DateRangePickerContainer>
  );
};
