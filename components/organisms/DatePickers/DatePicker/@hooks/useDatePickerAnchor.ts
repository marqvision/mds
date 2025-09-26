import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { AnchorProps, DatePickerProps } from '../@types';
import { AvailableDateFormat } from '../../@types';
import { DEFAULT_PROPS } from '../../@constants';
import { validateDateAndMinMaxRange } from '../../@utils';

const getInitialState = (
  value: string | undefined,
  anchor: AnchorProps,
  valueFormat: AvailableDateFormat = DEFAULT_PROPS.format
) => {
  const format = getFormat(anchor, valueFormat);
  return value ? dayjs(value, format).toDate() : null;
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

export const useDatePickerAnchor = (params: DatePickerProps) => {
  const { anchor, format: valueFormat, value, minDate, maxDate, onChange } = params;

  const [internalDate, setInternalDate] = useState<Date | null>(getInitialState(value, anchor, valueFormat));

  const handleDateChange = (date?: Date) => {
    setInternalDate(date ?? null);
    onChange?.(date);
  };

  //#region - 외부에서 주입된 값의 유효성 검사 -> 통과한 경우에만 값을 할당한다.

  useEffect(() => {
    if (!value) {
      setInternalDate(null);
      return;
    }

    const newDate = value ? getDateObject(value, anchor, valueFormat) : internalDate;

    const isValid = validateDateAndMinMaxRange({
      date: newDate,
      minDate,
      maxDate,
    });
    if (isValid) {
      setInternalDate(newDate);
    }
    // note-@jamie 의도된 eslint 무시
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, minDate, maxDate]);
  //#endregion

  const formattedDateString = internalDate ? dayjs(internalDate).format(getFormat(anchor)) : undefined;

  return {
    internalDate,
    handleDateChange,
    formattedDateString,
  };
};
