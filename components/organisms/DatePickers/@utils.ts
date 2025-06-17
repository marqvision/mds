import dayjs from 'dayjs';

/**
 * 주어진 Date 객체가 유효한 날짜인지, 그리고 min/max 날짜 범위 내에 있는지 확인합니다.
 * @param date - 검사할 Date 객체.
 * @param minDate - 허용되는 최소 날짜.
 * @param maxDate - 허용되는 최대 날짜.
 * @returns 유효성과 범위 이탈 여부를 담은 객체.
 */
export const isValidDate = (
  date: Date | null,
  minDate?: Date,
  maxDate?: Date
): { isValid: boolean; isOutOfRange: boolean } => {
  if (!date) {
    return { isValid: false, isOutOfRange: false };
  }

  const isDateValid = !isNaN(date.getTime());
  if (!isDateValid) {
    return { isValid: false, isOutOfRange: false };
  }

  if ((minDate && dayjs(date).isBefore(minDate, 'day')) || (maxDate && dayjs(date).isAfter(maxDate, 'day'))) {
    return { isValid: true, isOutOfRange: true };
  }

  return { isValid: true, isOutOfRange: false };
}; 