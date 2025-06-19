import dayjs from 'dayjs';
import { mdsLogger } from '../../../utils';

/**
 * 주어진 Date 객체의 유효성을 검사하고, 선택적인 min/max 날짜 범위 내에 있는지 확인합니다.
 * min/max 날짜와 동일한 날짜는 유효한 것으로 간주합니다.
 * @param date - 검사할 Date 객체.
 * @param minDate - 허용되는 최소 날짜 (경계 포함).
 * @param maxDate - 허용되는 최대 날짜 (경계 포함).
 * @returns 날짜의 유효성(isValid)과 범위 이탈 여부(isOutOfRange)를 포함하는 객체를 반환합니다.
 */
export const validateDateAndMinMaxRange = (
  date?: Date | null,
  minDate?: Date,
  maxDate?: Date
): { isValid: boolean; isOutOfRange: boolean } => {
  if (!date) {
    return { isValid: false, isOutOfRange: false };
  }

  const isDateValid = !isNaN(date.getTime());
  if (!isDateValid) {
    mdsLogger.warning({
      title: 'validateDateAndMinMaxRange',
      message: 'date is invalid',
      data: { date, minDate, maxDate },
    });

    return { isValid: false, isOutOfRange: false };
  }

  const isBeforeMin = minDate && dayjs(date).isBefore(minDate, 'day');
  const isAfterMax = maxDate && dayjs(date).isAfter(maxDate, 'day');

  if (isBeforeMin || isAfterMax) {
    if (isBeforeMin) {
      mdsLogger.warning({
        title: 'validateDateAndRange',
        message: 'date is not after minDate',
        data: { date, minDate },
      });
    } else if (isAfterMax) {
      mdsLogger.warning({
        title: 'validateDateAndRange',
        message: 'date is not before maxDate',
        data: { date, maxDate },
      });
    }
    return { isValid: true, isOutOfRange: true };
  }

  return { isValid: true, isOutOfRange: false };
};
