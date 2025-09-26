import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { DEFAULT_PROPS } from '../@constants';
import { MDSCalendar } from '../Calendar';
import { MDSDateInput } from '../DateInput';
import { validateDateAndMinMaxRange } from '../@utils';
import { DateValidationError } from '../@types';
import { DatePickerProps } from './@types';

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

export const DatePickerCore = (props: DatePickerProps) => {
  const { value, format = DEFAULT_PROPS.format, onChange, minDate, maxDate, onClose } = props;

  const [store, setStore] = useState<Date | undefined>(value ? dayjs(value).toDate() : undefined);
  const [errors, setErrors] = useState<DateValidationError | null>(null);

  /**
   * note-@jamie: lockDuplicatedCloseAction
   * 캘린더에서 date-range 선택을 했을 때 useEffect에서 document.body에 붙인 리스너 함수가 동작하지 않도록 막아서,
   * onClose가 연달아 두번 실행되어 깜빡이는 것을 방지
   */
  const [lockDuplicatedCloseAction, setLockDuplicatedCloseAction] = useState(false);

  const frozenOnChange = useRef(onChange);
  const handleDateInputChange = useCallback((date: Date | null) => {
    setStore(date ? dayjs(date, format).toDate() : undefined);
  }, [format]);

  const handleDateInputError = useCallback((error?: DateValidationError | undefined) => {
    setErrors(error ?? null);
  }, []);

  const handleCalendarChange = useCallback(
    (date: Date) => {
      setLockDuplicatedCloseAction(true);
      setStore(date);
      onChange?.(date);
      setTimeout(() => {
        onClose?.();
      }, 0);
    },
    [onChange, onClose]
  );

  const handleApply = useCallback(() => {
    if (frozenOnChange.current) {
      frozenOnChange.current(store);
    }
  }, [store]);

  const isReadyToApply = (() => {
    if (errors) return false;
    const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: store, minDate, maxDate });
    return isValid && !isOutOfRange;
  })();

  // 외부에서 들어온 값 동기화
  const containerRef = useRef<HTMLDivElement>(null);
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
            minDate={minDate}
            maxDate={maxDate}
            preventClearValue
            onDateChange={handleDateInputChange}
            onError={handleDateInputError}
          />
        </div>
        <MDSCalendar value={store} onChange={handleCalendarChange} minDate={minDate} maxDate={maxDate} />
      </DatePickerLayout>
    </DatePickerContainer>
  );
};
