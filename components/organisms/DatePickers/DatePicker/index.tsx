import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSCalendar } from '../Calendar';
import { SingleDateInput } from '../DateInputGroup/@types';
import { MDSDateInput } from '../DateInput';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSButton } from '../../../molecules/Button';
import { MDSDivider } from '../../../atoms/Divider';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSInput, MDSInputProps } from '../../../molecules/Input';
import { DEFAULT_PROPS } from '../@constants';
import { AvailableDateFormat } from '../DateRangePicker/@types';

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 304px;
  background-color: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
`;
const DatePickerLayout = styled.div`
  display: flex;
  flex-direction: column;

  .mds-date-picker-input-container {
    width: 100%;
    padding: 12px 12px 0;
  }
`;
const DatePickerActionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px;
`;

type Props = {
  format?: AvailableDateFormat;
  minDate?: Date;
  maxDate?: Date;
  onClose?: () => void;
  anchorSelectProps?: Omit<
    MDSInputProps<string>,
    'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
  >;
} & SingleDateInput;

const DatePicker = (props: Props) => {
  const { value, format = DEFAULT_PROPS.format, onChange, minDate, maxDate, onClose } = props;

  const [store, setStore] = useState<Date | undefined>(value ? dayjs(value).toDate() : undefined);
  const frozenOnChange = useRef(onChange);

  const handleDateInputChange = useCallback((date: Date | null) => {
    setStore(date ? dayjs(date).toDate() : undefined);
  }, []);

  const handleCalendarChange = useCallback((date: Date) => {
    setStore(date);
  }, []);

  const handleApply = () => {
    if (frozenOnChange.current) {
      frozenOnChange.current(store ? dayjs(store).format(format) : undefined);
    }
  };

  // 외부에서 들어온 값 동기화
  useEffect(() => {
    setStore(value ? dayjs(value).toDate() : undefined);
  }, [value]);

  return (
    <DatePickerContainer>
      <DatePickerLayout>
        <div className="mds-date-picker-input-container">
          <MDSDateInput
            format={format}
            value={store ? dayjs(store).format(format) : undefined}
            onDateChange={handleDateInputChange}
            minDate={minDate}
            maxDate={maxDate}
          />
        </div>
        <MDSCalendar value={store} onChange={handleCalendarChange} minDate={minDate} maxDate={maxDate} />
      </DatePickerLayout>

      <MDSDivider />
      <DatePickerActionContainer>
        <MDSPlainButton
          color="bluegray"
          onClick={() => {
            onClose?.();
          }}
        >
          Cancel
        </MDSPlainButton>
        <MDSButton
          onClick={() => {
            handleApply();
            onClose?.();
          }}
        >
          Apply
        </MDSButton>
      </DatePickerActionContainer>
    </DatePickerContainer>
  );
};

const DatePickerWrapper = (props: Props) => {
  const { value, anchorSelectProps: anchorInputProps } = props;
  const _anchorInputProps = anchorInputProps ?? {};
  return (
    <div>
      <MDSPopover
        anchor={({ open }) => (
          <div
            onClickCapture={(e) => {
              e.stopPropagation();
              open(e);
            }}
          >
            <MDSInput
              variant="select"
              value={value || ''}
              list={[{ label: value || '', value: value || '' }]}
              {..._anchorInputProps}
            />
          </div>
        )}
        padding={0}
        width={304}
      >
        {({ close, isOpen }) => (isOpen ? <DatePicker {...props} onClose={close} /> : <div />)}
      </MDSPopover>
    </div>
  );
};
export const MDSDatePicker = DatePickerWrapper;
export type MDSDatePickerProps = Props;
