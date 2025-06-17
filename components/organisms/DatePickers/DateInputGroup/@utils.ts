import dayjs from 'dayjs';
import { DateInputProps } from './@types';

const SEPARATOR_MAP = {
  'MM/DD/YYYY': '/',
  'YYYY-MM-DD': '-',
};

const DATE_SHAPE_REGEX_MAP = {
  'MM/DD/YYYY': /^(?!.*\/\/)\d{0,2}(\/(\d{0,2}(\/(\d{0,4})?)?)?)?$/,
  'YYYY-MM-DD': /^(?!.*--)\d{0,4}(-(\d{0,2}(-(\d{0,2})?)?)?)?$/,
};

/**
 * 입력된 날짜 문자열이 지정된 포맷의 기본 구조(정규식, 구분자 위치)를 따르는지 검사합니다.
 * 값의 유효성(예: 13월)은 검사하지 않습니다.
 * @param value - 사용자가 입력한 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @returns 형식이 올바르면 true, 그렇지 않으면 false.
 */
export const isDateShapeValid = (value: string, format: 'MM/DD/YYYY' | 'YYYY-MM-DD') => {
  if (!DATE_SHAPE_REGEX_MAP[format].test(value)) {
    return false;
  }

  const separator = SEPARATOR_MAP[format];
  const parts = value.split(separator);

  if (format === 'MM/DD/YYYY') {
    if (parts.length > 1 && parts[0].length < 2) {
      return false;
    }
    if (parts.length > 2 && parts[1].length < 2) {
      return false;
    }
  } else if (format === 'YYYY-MM-DD') {
    if (parts.length > 1 && parts[0].length < 4) {
      return false;
    }
    if (parts.length > 2 && parts[1].length < 2) {
      return false;
    }
  }

  return true;
};

/**
 * 부분적으로 입력된 날짜 문자열의 각 세그먼트(월, 일)가 논리적으로 유효한지 검사합니다.
 * (예: 월은 1-12 사이, 일은 1-31 사이)
 * @param value - 사용자가 입력한 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @returns 각 세그먼트가 유효하면 true, 그렇지 않으면 false.
 */
export const isPartiallyValidDate = (value: string, format: 'MM/DD/YYYY' | 'YYYY-MM-DD'): boolean => {
  const separator = SEPARATOR_MAP[format];
  const parts = value.split(separator);

  if (format === 'MM/DD/YYYY') {
    const [monthStr, dayStr] = parts;

    if (monthStr && monthStr.length === 2) {
      const month = parseInt(monthStr, 10);
      if (month < 1 || month > 12) {
        return false;
      }
    }

    if (dayStr && dayStr.length === 2) {
      const day = parseInt(dayStr, 10);
      if (day < 1 || day > 31) {
        return false;
      }
    }
  } else if (format === 'YYYY-MM-DD') {
    const [, monthStr, dayStr] = parts;

    if (monthStr && monthStr.length === 2) {
      const month = parseInt(monthStr, 10);
      if (month < 1 || month > 12) {
        return false;
      }
    }

    if (dayStr && dayStr.length === 2) {
      const day = parseInt(dayStr, 10);
      if (day < 1 || day > 31) {
        return false;
      }
    }
  }

  return true;
};

/**
 * 지정된 포맷의 완전한 날짜 문자열을 Date 객체로 파싱합니다.
 * 문자열이 완전한 형식이 아니거나 유효하지 않은 날짜(예: 2월 30일)이면 null을 반환합니다.
 * @param dateString - 파싱할 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @returns 파싱된 Date 객체 또는 null.
 */
export const parseDateString = (
  dateString: string,
  format: 'MM/DD/YYYY' | 'YYYY-MM-DD' = 'MM/DD/YYYY'
): Date | null => {
  const separator = SEPARATOR_MAP[format];
  const parts = dateString.split(separator);

  if (format === 'MM/DD/YYYY') {
    if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
      return null;
    }
    const [month, day, year] = parts.map(Number);
    if (isNaN(month) || isNaN(day) || isNaN(year) || month < 1 || month > 12) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date;
    }
  } else if (format === 'YYYY-MM-DD') {
    if (parts.length !== 3 || parts[0].length !== 4 || parts[1].length !== 2 || parts[2].length !== 2) {
      return null;
    }
    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12) return null;

    const date = new Date(year, month - 1, day);
    if (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day) {
      return date;
    }
  }

  return null;
};

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

/**
 * 시작 날짜가 종료 날짜보다 이전이거나 같은지 확인합니다.
 * @param startDate - 시작 날짜.
 * @param endDate - 종료 날짜.
 * @returns 날짜 범위가 유효하면 true, 그렇지 않으면 false.
 */
export const isDateRangeValid = (startDate: Date | null, endDate: Date | null): boolean => {
  if (!startDate || !endDate) {
    return true;
  }

  return dayjs(startDate).isSame(endDate, 'day') || dayjs(startDate).isBefore(endDate, 'day');
};

/**
 * 날짜 문자열 값에 대한 전체 유효성을 검사하여 에러 발생 여부를 반환합니다.
 * (형식, 길이, 부분적 유효성, 전체 유효성, min/max 범위 포함)
 * @param value - 검사할 날짜 문자열.
 * @param format - 날짜 포맷.
 * @param minDate - 허용되는 최소 날짜.
 * @param maxDate - 허용되는 최대 날짜.
 * @returns 에러가 있으면 true, 유효하면 false.
 */
export const validateDateValue = (
  value: string,
  format: 'MM/DD/YYYY' | 'YYYY-MM-DD',
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  if (!value) {
    return false;
  }
  if (
    !isDateShapeValid(value, format) ||
    value.length < format.length ||
    !isPartiallyValidDate(value, format)
  ) {
    return true;
  }
  const parsedDate = parseDateString(value, format);
  const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
  return !isValid || isOutOfRange;
};

/**
 * 날짜 문자열 값에 대한 전체 유효성을 검사하여, 유효한 경우에만 Date 객체를 반환합니다.
 * @param value - 검사할 날짜 문자열.
 * @param format - 날짜 포맷.
 * @param minDate - 허용되는 최소 날짜.
 * @param maxDate - 허용되는 최대 날짜.
 * @returns 유효한 Date 객체 또는 null.
 */
export const getValidatedDate = (
  value: string,
  format: 'MM/DD/YYYY' | 'YYYY-MM-DD',
  minDate?: Date,
  maxDate?: Date,
): Date | null => {
  const parsedDate = parseDateString(value, format);
  if (!parsedDate) {
    return null;
  }
  const { isValid, isOutOfRange } = isValidDate(parsedDate, minDate, maxDate);
  return isValid && !isOutOfRange ? parsedDate : null;
};

/**
 * 에러 상태와 입력 타입('start' 또는 'end')에 따라 적절한 헬퍼 텍스트를 반환합니다.
 * @param type - 'start' 또는 'end'.
 * @param errors - 에러 상태 객체.
 * @param dateInputProps - 해당 입력 필드의 props.
 * @returns 헬퍼 텍스트 문자열 또는 undefined.
 */
export const getHelperText = (
  type: 'start' | 'end',
  errors: { start: boolean; end: boolean; range: boolean },
  dateInputProps: DateInputProps
) => {
  if (errors.range) {
    return type === 'start'
      ? 'Start date must be same or before end date'
      : 'End date must be same or after start date';
  }

  const hasError = type === 'start' ? errors.start : errors.end;
  if (hasError || dateInputProps.isError) {
    return dateInputProps.helperText || 'Invalid date';
  }

  return undefined;
};
