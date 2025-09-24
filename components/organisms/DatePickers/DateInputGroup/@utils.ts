import dayjs from 'dayjs';
import { isDateShapeValid, validateDateAndMinMaxRange } from '../@utils';
import { SEPARATOR_MAP } from '../@constants';
import { AvailableDateFormat } from '../DateRangePicker/@types';
import { DateValidationError } from '../@types';
import { SingleDateInput } from './@types';

// todo-@jamie: 아래의 format 검사하는 함수들을 dayjs의 customParseFormat를 사용하는 방법으로 바꾸기

/**
 * 부분적으로 입력된 날짜 문자열의 각 세그먼트(월, 일)가 논리적으로 유효한지 검사합니다.
 * (예: 월은 1-12 사이, 일은 1-31 사이)
 * @param value - 사용자가 입력한 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @returns 각 세그먼트가 유효하면 true, 그렇지 않으면 false.
 */
export const isPartiallyValidDate = (value: string, format: AvailableDateFormat): boolean => {
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
  } else if (format === 'MMM DD, YYYY') {
    // MMM DD, YYYY 형식의 경우 (예: "Jan 15, 2024")
    const [monthStr, dayStr, yearStr] = value.split(/[\s,]+/);

    // 월 부분 검사 (3글자 월 약어)
    if (monthStr && monthStr.length === 3) {
      const validMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (!validMonths.includes(monthStr)) {
        return false;
      }
    }

    // 일 부분 검사 (1-31)
    if (dayStr && dayStr.length >= 1) {
      const day = parseInt(dayStr, 10);
      if (isNaN(day) || day < 1 || day > 31) {
        return false;
      }
    }

    // 년도 부분 검사 (4자리 숫자)
    if (yearStr && yearStr.length >= 1) {
      const year = parseInt(yearStr, 10);
      if (isNaN(year)) {
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
export const parseDateStringToDate = (dateString: string, format: AvailableDateFormat = 'MM/DD/YYYY'): Date | null => {
  if (dayjs(dateString, format).isValid()) {
    return dayjs(dateString, format).toDate();
  }

  return null;
};

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
  format: AvailableDateFormat,
  minDate?: Date,
  maxDate?: Date
): DateValidationError | null => {
  if (!value) {
    return null;
  }
  if (value.length < format.length || !isDateShapeValid(value, format) || !isPartiallyValidDate(value, format)) {
    return 'INVALID_DATE';
  }
  const parsedDate = parseDateStringToDate(value, format);

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
  format: AvailableDateFormat,
  minDate?: Date,
  maxDate?: Date
): Date | null => {
  const parsedDate = parseDateStringToDate(value, format);
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
