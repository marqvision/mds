import dayjs from 'dayjs';
import { validateDateAndMinMaxRange } from '../@utils';
import { SingleDateInput } from './@types';

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

export type DateValidationError = 'INVALID_DATE' | 'MIN_DATE' | 'MAX_DATE';

/**
 * 날짜 문자열의 전체적인 유효성을 검사하고, 유효하지 않은 경우 구체적인 오류 유형을 반환합니다.
 * 형식, 부분적 유효성, 날짜 존재 여부, 그리고 min/max 범위를 모두 검사합니다.
 * @param value - 검사할 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @param minDate - 허용되는 최소 날짜.
 * @param maxDate - 허용되는 최대 날짜.
 * @returns 유효성 검사를 통과하면 null을 반환하고, 오류가 있는 경우 'INVALID_DATE', 'MIN_DATE', 'MAX_DATE' 중 하나의 오류 코드를 반환합니다.
 */
export const validateDateValue = (
  value: string,
  format: 'MM/DD/YYYY' | 'YYYY-MM-DD',
  minDate?: Date,
  maxDate?: Date
): DateValidationError | null => {
  if (!value) {
    return null;
  }
  if (value.length < format.length || !isDateShapeValid(value, format) || !isPartiallyValidDate(value, format)) {
    return 'INVALID_DATE';
  }
  const parsedDate = parseDateString(value, format);
  const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: parsedDate, minDate, maxDate });

  if (!isValid) {
    return 'INVALID_DATE';
  }

  if (isOutOfRange) {
    const isBeforeMin = minDate && dayjs(parsedDate).isBefore(minDate, 'day');
    if (isBeforeMin) {
      return 'MIN_DATE';
    }
    return 'MAX_DATE';
  }

  return null;
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
  maxDate?: Date
): Date | null => {
  const parsedDate = parseDateString(value, format);
  if (!parsedDate) {
    return null;
  }
  const { isValid, isOutOfRange } = validateDateAndMinMaxRange({ date: parsedDate, minDate, maxDate });
  return isValid && !isOutOfRange ? parsedDate : null;
};

/**
 * 현재 오류 상태에 따라 사용자에게 표시할 적절한 도움말 텍스트를 결정합니다.
 * 날짜 범위 오류, 최소/최대 날짜 오류, 또는 일반적인 유효성 오류 등 다양한 케이스를 처리합니다.
 * @param type - 'start' 또는 'end' 중 어떤 입력 필드에 대한 텍스트인지 지정합니다.
 * @param errors - 시작 및 종료 날짜의 오류 상태와 범위 오류 여부를 포함하는 객체.
 * @param dateInputProps - 해당 입력 필드에 전달된 props. 사용자 정의 helperText를 확인하는 데 사용됩니다.
 * @returns 오류 상태에 맞는 헬퍼 텍스트 문자열을 반환합니다. 오류가 없으면 undefined를 반환합니다.
 */
export const getHelperText = (
  type: 'start' | 'end',
  errors: { start: DateValidationError | null; end: DateValidationError | null; range: boolean },
  dateInputProps: SingleDateInput
) => {
  if (errors.range) {
    return type === 'start'
      ? 'Start date must be same or before end date'
      : 'End date must be same or after start date';
  }

  const errorType = type === 'start' ? errors.start : errors.end;

  if (errorType) {
    if (errorType === 'MIN_DATE') {
      return `Date cannot be before the minimum date`;
    }
    if (errorType === 'MAX_DATE') {
      return `Date cannot be after the maximum date`;
    }
    return dateInputProps.helperText || 'Invalid date';
  }

  if (dateInputProps.isError) {
    return dateInputProps.helperText || 'Invalid date';
  }

  return undefined;
};
