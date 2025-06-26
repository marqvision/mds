import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DateRangePickerProps } from '../@types';
import { DEFAULT_PROPS } from '../../@constants';
import { validateDateRange } from '../../@utils';

export const useDateRangePicker = (params: DateRangePickerProps) => {
  const { format = DEFAULT_PROPS.format, startDate, endDate, minDate, maxDate, onChange } = params;

  const [internalDate, setInternalDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: startDate?.value ? dayjs(startDate.value, format).toDate() : null,
    endDate: endDate?.value ? dayjs(endDate.value, format).toDate() : null,
  });

  const handleDateChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setInternalDate(dates);
    onChange?.(dates);
  };

  //#region - 외부에서 주입된 값의 유효성 검사 -> 통과한 경우에만 값을 할당한다.

  useEffect(() => {
    const newStartDate = startDate?.value ? dayjs(startDate.value, format).toDate() : internalDate.startDate;
    const newEndDate = endDate?.value ? dayjs(endDate.value, format).toDate() : internalDate.endDate;

    const isValid = validateDateRange({
      startDate: newStartDate,
      endDate: newEndDate,
      format,
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

  const formattedStartDate = internalDate.startDate ? dayjs(internalDate.startDate).format(format) : undefined;
  const formattedEndDate = internalDate.endDate ? dayjs(internalDate.endDate).format(format) : undefined;

  return {
    internalDate,
    handleDateChange,
    formattedStartDate,
    formattedEndDate,
  };
};
