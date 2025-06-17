import dayjs from 'dayjs';

const SEPARATOR_MAP = {
  'MM/DD/YYYY': '/',
  'YYYY-MM-DD': '-',
};

const DATE_SHAPE_REGEX_MAP = {
  'MM/DD/YYYY': /^(?!.*\/\/)\d{0,2}(\/(\d{0,2}(\/(\d{0,4})?)?)?)?$/,
  'YYYY-MM-DD': /^(?!.*--)\d{0,4}(-(\d{0,2}(-(\d{0,2})?)?)?)?$/,
};

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

  if (
    (minDate && dayjs(date).isBefore(minDate, 'day')) ||
    (maxDate && dayjs(date).isAfter(maxDate, 'day'))
  ) {
    return { isValid: true, isOutOfRange: true };
  }

  return { isValid: true, isOutOfRange: false };
}; 