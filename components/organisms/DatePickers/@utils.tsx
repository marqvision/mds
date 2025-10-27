import dayjs from 'dayjs';
import { DATE_SHAPE_REGEX_MAP, SEPARATOR_MAP } from './@constants';
import { AvailableDateFormat } from './@types';
import { SingleDateInput } from './DateInputGroup/@types';

//#region  ------ VALIDATOR  ------

/**
 * 주어진 Date 객체의 유효성을 검사하고, 선택적인 min/max 날짜 범위 내에 있는지 확인합니다.
 * min/max 날짜와 동일한 날짜는 유효한 것으로 간주합니다.
 * @param date - 검사할 Date 객체.
 * @param minDate - 허용되는 최소 날짜 (경계 포함).
 * @param maxDate - 허용되는 최대 날짜 (경계 포함).
 * @returns 날짜의 유효성(isValid)과 범위 이탈 여부(isOutOfRange)를 포함하는 객체를 반환합니다.
 */
type Params = {
  date?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  unit?: dayjs.OpUnitType;
};
export const validateDateAndMinMaxRange = (params: Params): { isValid: boolean; isOutOfRange: boolean } => {
  const { date, minDate, maxDate, unit = 'day' } = params;
  if (!date) {
    return { isValid: false, isOutOfRange: false };
  }

  const isDateValid = !isNaN(date.getTime());
  if (!isDateValid) {
    // todo-@jamie: 값을 확정 했을 때에만 log 출력 하도록 수정
    // mdsLogger.warning({
    //   title: 'validateDateAndMinMaxRange',
    //   message: 'date is invalid',
    //   data: { date, minDate, maxDate },
    // });

    return { isValid: false, isOutOfRange: false };
  }

  const isBeforeMin = minDate && dayjs(date).isBefore(minDate, unit);
  const isAfterMax = maxDate && dayjs(date).isAfter(maxDate, unit);

  if (isBeforeMin || isAfterMax) {
    // todo-@jamie: 값을 확정 했을 때에만 log 출력 하도록 수정
    // if (isBeforeMin) {
    //   mdsLogger.warning({
    //     title: 'validateDateAndRange',
    //     message: 'date is not after minDate',
    //     data: { date, minDate },
    //   });
    // } else if (isAfterMax) {
    //   mdsLogger.warning({
    //     title: 'validateDateAndRange',
    //     message: 'date is not before maxDate',
    //     data: { date, maxDate },
    //   });
    // }
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
 * 입력된 날짜 문자열이 지정된 포맷의 기본 구조(정규식, 구분자 위치)를 따르는지 검사합니다.
 * 값의 유효성(예: 13월)은 검사하지 않습니다.
 * @param value - 사용자가 입력한 날짜 문자열.
 * @param format - 'MM/DD/YYYY' 또는 'YYYY-MM-DD' 형식의 날짜 포맷.
 * @returns 형식이 올바르면 true, 그렇지 않으면 false.
 */
export const isDateShapeValid = (value: string, format: AvailableDateFormat) => {
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
  } else if (format === 'MMM DD, YYYY') {
    if (parts.length > 1 && parts[0].length < 3) {
      return false;
    }
    if (parts.length > 2 && parts[1].length < 2) {
      return false;
    }
  }
  // todo-@jamie: 나머지 포맷 검사 추가

  return true;
};

export const validateDateRange = (params: {
  startDate: Date | null;
  endDate: Date | null;
  format: AvailableDateFormat;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const { startDate, endDate, format, minDate, maxDate } = params;

  if (!startDate && !endDate) {
    return true;
  }

  if (!isDateRangeValid(startDate, endDate)) {
    return false;
  }

  const formattedStartDate = startDate ? dayjs(startDate).format(format) : undefined;
  if (!formattedStartDate || !isDateShapeValid(formattedStartDate, format)) {
    return false;
  }
  const formattedEndDate = endDate ? dayjs(endDate).format(format) : undefined;
  if (!formattedEndDate || !isDateShapeValid(formattedEndDate, format)) {
    return false;
  }

  const isStartDateValid = validateDateAndMinMaxRange({
    date: startDate,
    minDate,
    maxDate,
  });
  const isEndDateValid = validateDateAndMinMaxRange({
    date: endDate,
    minDate,
    maxDate,
  });

  return (
    isStartDateValid.isValid && !isStartDateValid.isOutOfRange && isEndDateValid.isValid && !isEndDateValid.isOutOfRange
  );
};

//#endregion




export const getDateRangeInputLabel = (label: SingleDateInput['label'], counterPartLabel: SingleDateInput['label']) => {
  if (!label && !counterPartLabel) {
    return undefined;
  }

  const mainLabel = typeof label === 'string' ? label : label?.main || '';
  const subLabel = typeof label === 'string' ? '' : label?.sub || '';
  const rightLabel = typeof label === 'string' ? undefined : label?.right || undefined;

  const emptyLabel = !label && counterPartLabel ? <div className="mds2-empty-label"></div> : undefined;

  return { main: mainLabel, sub: subLabel, right: rightLabel || emptyLabel };
};
