import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AnchorProps, AvailableDateFormat, DateRangePickerProps } from '../@types';
import { DEFAULT_PROPS } from '../../@constants';
import { validateDateRange } from '../../@utils';
import { SingleDateInput } from '../../DateInputGroup/@types';

const getInitialState = (
  startDate: SingleDateInput | undefined,
  endDate: SingleDateInput | undefined,
  anchor: AnchorProps,
  valueFormat: AvailableDateFormat = DEFAULT_PROPS.format
) => {
  const format = getFormat(anchor, valueFormat);
  return {
    startDate: startDate?.value ? dayjs(startDate.value, format).toDate() : null,
    endDate: endDate?.value ? dayjs(endDate.value, format).toDate() : null,
  };
};
const getDateObject = (
  dateString: string | null,
  anchor: AnchorProps,
  valueFormat: AvailableDateFormat = DEFAULT_PROPS.format
) => {
  const format = getFormat(anchor, valueFormat);
  return dayjs(dateString, format).toDate();
};

/**
 * 다음 순서로 적용
 * - anchor.variant: custom 케이스 : valueFormat -> DEFAULT_PROPS.format
 * - anchor.variant: 나머지 케이스 : anchor.format -> valueFormat -> DEFAULT_PROPS.format
 */
const getFormat = (anchor: AnchorProps, valueFormat: AvailableDateFormat = DEFAULT_PROPS.format) => {
  return anchor.variant === 'custom' ? valueFormat : anchor.format ?? valueFormat ?? DEFAULT_PROPS.format;
};

export const useDateRangePicker = (params: DateRangePickerProps) => {
  const { anchor, startDate, endDate, minDate, maxDate, onChange } = params;

  const [internalDate, setInternalDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>(getInitialState(startDate, endDate, anchor));

  const handleDateChange = (dates?: { startDate: Date; endDate: Date }) => {
    setInternalDate(dates ?? { startDate: null, endDate: null });
    onChange?.(dates);
  };

  //#region - 외부에서 주입된 값의 유효성 검사 -> 통과한 경우에만 값을 할당한다.

  useEffect(() => {
    if (!startDate?.value && !endDate?.value) {
      setInternalDate({
        startDate: null,
        endDate: null,
      });
      return;
    }

    const newStartDate = startDate?.value ? getDateObject(startDate.value, anchor) : internalDate.startDate;
    const newEndDate = endDate?.value ? getDateObject(endDate.value, anchor) : internalDate.endDate;

    const isValid = validateDateRange({
      startDate: newStartDate,
      endDate: newEndDate,
      format: getFormat(anchor),
      minDate,
      maxDate,
    });
    if (isValid) {
      setInternalDate({
        startDate: newStartDate,
        endDate: newEndDate,
      });
    }
    // note-@jamie 의도된 eslint 무시
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate?.value, endDate?.value, minDate, maxDate]);
  //#endregion

  const formattedStartDate = internalDate.startDate
    ? dayjs(internalDate.startDate).format(getFormat(anchor))
    : undefined;
  const formattedEndDate = internalDate.endDate ? dayjs(internalDate.endDate).format(getFormat(anchor)) : undefined;

  return {
    internalDate,
    handleDateChange,
    formattedStartDate,
    formattedEndDate,
  };
};
