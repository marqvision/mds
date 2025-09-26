import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { MDSInput, MDSInputProps } from '../../../molecules/Input';
import { MDSPopover } from '../../../molecules/Popover';
import { DEFAULT_PROPS } from '../@constants';
import { MDSCalendar } from '../Calendar';
import { MDSDateInput } from '../DateInput';
import { validateDateAndMinMaxRange } from '../@utils';
import { SingleDateInput } from '../DateInputGroup/@types';
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
// actions removed (Apply/Cancel) to align behavior with DateRangePickerCore

type Props = {
  format?: AvailableDateFormat;
  minDate?: Date;
  maxDate?: Date;
  onClose?: () => void;
  anchorSelectProps?: Omit<
    MDSInputProps<string>,
    'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'onChange' | 'onBlur' | 'ref' // variant='input' 의 props 제거
  >;
} & SingleDateInput;

const DatePicker = (props: Props) => {
  const { value, format = DEFAULT_PROPS.format, onChange, minDate, maxDate, onClose } = props;

  const [store, setStore] = useState<Date | undefined>(value ? dayjs(value).toDate() : undefined);
  const [lockDuplicatedCloseAction, setLockDuplicatedCloseAction] = useState(false);
  const frozenOnChange = useRef(onChange);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDateInputChange = useCallback((date: Date | null) => {
    setStore(date ? dayjs(date).toDate() : undefined);
  }, []);

  const handleCalendarChange = useCallback(
    (date: Date) => {
      setLockDuplicatedCloseAction(true);
      setStore(date);
      onChange?.(dayjs(date).format(format));
      setTimeout(() => {
        onClose?.();
      }, 0);
    },
    [onChange, onClose, format]
  );

  const handleApply = useCallback(() => {
    if (frozenOnChange.current) {
      frozenOnChange.current(store ? dayjs(store).format(format) : undefined);
    }
  }, [store, format]);

  const isReadyToApply = (() => {
    if (!store) return false;
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: store, minDate, maxDate });
    return isValid && !isOutOfRange;
  })();

  // 외부에서 들어온 값 동기화
  useEffect(() => {
    setStore(value ? dayjs(value).toDate() : undefined);
  }, [value]);

  useEffect(() => {
    const handleBodyClick = (e: Event) => {
      const isIn = containerRef.current?.contains(e.target as Node);
      if (!lockDuplicatedCloseAction && !isIn && isReadyToApply) {
        handleApply();
        onClose?.();
      }
    };
    document.body.addEventListener('click', handleBodyClick, { capture: true });
    return () => {
      document.body.removeEventListener('click', handleBodyClick, { capture: true });
    };
  }, [lockDuplicatedCloseAction, isReadyToApply, handleApply, onClose]);

  return (
    <DatePickerContainer ref={containerRef}>
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
