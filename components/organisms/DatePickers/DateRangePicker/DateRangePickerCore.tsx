import { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { MDSDateInputGroup } from '../DateInputGroup';
import { MDSCalendar } from '../Calendar';
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

/**
 * [ 동작 스펙]
 *
 * 두 가지 방법으로 date range 선택
 * 1. calendar에서 두 날짜를 선택 -> 두번째 날짜를 선택하는 즉시 apply
 * 2. input에 날짜를 입력 -> date picker 밖을 클릭하면 apply
 *
 * 다음의 경우 apply 되지 않음
 * 1. start, end date 중 하나라도 비어있는 경우
 * 2. start, end date 중 하나라도 invalid한 경우
 */

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
        startDate?: Date;
        endDate?: Date;
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

  /**
   * note-@jamie: lockDuplicatedCloseAction
   * 캘린더에서 date-range 선택을 했을 때 useEffect에서 document.body에 붙인 리스너 함수가 동작하지 않도록 막아서,
   * onClose가 연달아 두번 실행되어 깜빡이는 것을 방지
   */
  const [lockDuplicatedCloseAction, setLockDuplicatedCloseAction] = useState(false);

  const frozenOnChange = useRef(onChange);
  const handleDateInputGroupChange = useCallback(
    (dates: { startDate?: Date; endDate?: Date } | undefined) => {
      setStore(
        !dates?.startDate && !dates?.endDate
          ? undefined
          : {
              startDate: dates.startDate ? dayjs(dates.startDate, format).toDate() : undefined,
              endDate: dates.endDate ? dayjs(dates.endDate, format).toDate() : undefined,
            }
      );
    },
    [format]
  );

  const handleCalendarChange = useCallback(
    (
      startDate: Date,
      endDate: Date,
      lastUpdatedDateType: 'startDate' | 'endDate',
      actionState: 'initial' | 'in-progress' | 'done'
    ) => {
      setLockDuplicatedCloseAction(true);
      setStore({
        startDate,
        endDate,
      });
      if (actionState === 'done') {
        onChange?.(
          startDate && endDate
            ? {
                startDate,
                endDate,
              }
            : undefined
        );
        setTimeout(() => {
          onClose?.();
        }, 0);
      }
    },
    [onChange, onClose]
  );

  const handleApply = useCallback(() => {
    if (frozenOnChange.current) {
      frozenOnChange.current(
        store?.startDate && store?.endDate
          ? {
              startDate: store.startDate,
              endDate: store.endDate,
            }
          : undefined
      );
    }
  }, [store]);

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

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleBodyClick = (e: Event) => {
      const isIn = containerRef.current?.contains(e.target as Node); // DatePicker 내부에서 클릭했는가?
      const isInPopover = document.querySelector('.mds-dropdown-scroll')?.contains(e.target as Node); // year,month dropdown은 portal로 열리므로 따로 처리 필요

      if (!lockDuplicatedCloseAction && !isIn && !isInPopover && isReadyToApply) {
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
    <DateRangePickerContainer ref={containerRef}>
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
            minDate={minDate}
            maxDate={maxDate}
            initialFocus={initialFocus}
            preventClearValue
            onDateChange={handleDateInputGroupChange}
            onError={handleDateInputGroupError}
          />
        </div>
        <MDSCalendar
          value={
            store?.startDate && store?.endDate
              ? {
                  startDate: store?.startDate,
                  endDate: store?.endDate,
                }
              : {
                  startDate: undefined,
                  endDate: undefined,
                }
          }
          onChange={handleCalendarChange}
          onError={handleCalendarError}
          initialFocus={initialFocus}
          minDate={minDate}
          maxDate={maxDate}
        />
      </DateRangePickerLayout>
    </DateRangePickerContainer>
  );
};
