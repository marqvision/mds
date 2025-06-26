import { useCallback, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSCalendar } from '../Calendar';
import { MDSDateInputGroup } from '../DateInputGroup';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSButton } from '../../../molecules/Button';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSDivider } from '../../../atoms/Divider';
import { MDSTag } from '../../../molecules/Tag';
import { MDSIcon } from '../../../atoms/Icon';
import { DEFAULT_PROPS } from '../@constants';
import { validateDateRange } from '../@utils';
import { DateValidationError } from '../@types';
import { DateRangePickerProps } from './@types';
import { useDateRangePicker } from './@hooks/useDateRangePicker';

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

const DateRangePicker = (props: DateRangePickerProps) => {
  const {
    startDate,
    endDate,
    format = DEFAULT_PROPS.format,
    onChange,
    minDate,
    maxDate,
    anchor,
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

  const handleDateInputGroupError = (error: DateValidationError) => {
    console.log('>>>>>> error', error);
  };

  const handleCalendarError = (error: DateValidationError) => {
    console.log('>>>>>> error', error);
  };

  const isReadyToApply = validateDateRange({
    startDate: store?.startDate ?? null,
    endDate: store?.endDate ?? null,
    format,
    minDate,
    maxDate,
  });

  return (
    <DateRangePickerContainer>
      <DateRangePickerLayout>
        {anchor.variant !== 'input' && (
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
            />
          </div>
        )}
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

const DateRangePickerWrapper = (props: DateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;

  const { internalDate, handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  return (
    <div>
      <MDSPopover
        anchor={({ open, close }) => (
          <div
            onClickCapture={(e) => {
              e.stopPropagation();
              open(e);
            }}
          >
            {anchor.variant === 'input' ? (
              <div>input</div>
            ) : anchor.variant === 'button' ? (
              <MDSButton
                variant={internalDate.startDate && internalDate.endDate ? 'fill' : 'tint'}
                color="bluegray"
                tags={
                  internalDate.startDate && internalDate.endDate ? (
                    <MDSTag size="small" variant="tint" color="bluegray">
                      {formattedStartDate} {anchor.separator} {formattedEndDate}
                    </MDSTag>
                  ) : undefined
                }
                endIcon={<MDSIcon.Calendar />}
                {...anchor.props}
              >
                {anchor.props?.children || 'Label'}
              </MDSButton>
            ) : anchor.variant === 'plainButton' ? (
              <MDSPlainButton {...anchor.props}>{anchor.props?.children || 'test'}</MDSPlainButton>
            ) : anchor.variant === 'custom' ? (
              typeof anchor.children === 'function' ? (
                anchor.children({
                  open: (e) => {
                    open(e as React.MouseEvent<Element, MouseEvent>);
                  },
                  close,
                })
              ) : (
                anchor.children
              )
            ) : null}
          </div>
        )}
        padding={0}
        width={304}
      >
        {({ close, isOpen }) =>
          isOpen ? (
            <DateRangePicker
              {...props}
              format={format}
              separator={separator}
              onChange={handleDateChange}
              onClose={close}
            />
          ) : (
            <div />
          )
        }
      </MDSPopover>
    </div>
  );
};

export const MDSDateRangePicker = DateRangePickerWrapper;
export type MDSDateRangePickerProps = DateRangePickerProps;
