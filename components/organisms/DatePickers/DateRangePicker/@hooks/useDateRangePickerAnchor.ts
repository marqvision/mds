import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AnchorProps, DateRangePickerProps } from '../@types';
import { AvailableDateFormat } from '../../@types';
import { DEFAULT_PROPS } from '../../@constants';
import { validateDateRange } from '../../@utils';
import { SingleDateInput } from '../../DateInputGroup/@types';

const getInitialState = (startDate: SingleDateInput | undefined, endDate: SingleDateInput | undefined) => {
  return {
    startDate: startDate?.value ? dayjs(startDate.value).toDate() : null,
    endDate: endDate?.value ? dayjs(endDate.value).toDate() : null,
  };
};
const getDateObject = (dateString: string | null) => {
  return dayjs(dateString).toDate();
};

/**
 * 다음 순서로 적용
 * - anchor.variant: custom 케이스 : valueFormat -> DEFAULT_PROPS.format
 * - anchor.variant: 나머지 케이스 : anchor.format -> valueFormat -> DEFAULT_PROPS.format
 */
const getFormat = (anchor: AnchorProps, valueFormat: AvailableDateFormat = DEFAULT_PROPS.format) => {
  return anchor.variant === 'custom' ? valueFormat : anchor.format ?? valueFormat ?? DEFAULT_PROPS.format;
};

export const useDateRangePickerAnchor = (params: DateRangePickerProps) => {
  const { anchor, format: valueFormat, startDate, endDate, minDate, maxDate, onChange } = params;

  const [internalDate, setInternalDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>(getInitialState(startDate, endDate));

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

    const newStartDate = startDate?.value ? getDateObject(startDate.value) : internalDate.startDate;
    const newEndDate = endDate?.value ? getDateObject(endDate.value) : internalDate.endDate;

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
  const formattedDateString =
    internalDate.startDate && internalDate.endDate ? `${formattedStartDate} → ${formattedEndDate}` : '';

  return {
    internalDate,
    handleDateChange,
    formattedDateString,
    formattedStartDate,
    formattedEndDate,
  };
};
