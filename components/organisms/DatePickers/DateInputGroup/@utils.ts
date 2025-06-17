import dayjs from 'dayjs';

const SEPARATOR_MAP = {
  'MM/DD/YYYY': '/',
  'YYYY-MM-DD': '-',
};

type DatePart = 'year' | 'month' | 'day';

const DATE_ORDER_MAP: Record<'MM/DD/YYYY' | 'YYYY-MM-DD', DatePart[]> = {
  'MM/DD/YYYY': ['month', 'day', 'year'],
  'YYYY-MM-DD': ['year', 'month', 'day'],
};

const PART_LENGTH_MAP: Record<DatePart, number> = {
  month: 2,
  day: 2,
  year: 4,
};

export const autoformatDate = (value: string, format: 'MM/DD/YYYY' | 'YYYY-MM-DD' = 'MM/DD/YYYY') => {
  const separator = SEPARATOR_MAP[format];
  const order = DATE_ORDER_MAP[format];
  const cleaned = value.replace(new RegExp(`[^0-9\\${separator}]`, 'g'), '');
  const parts = cleaned.split(separator);

  const part1Length = PART_LENGTH_MAP[order[0]];
  const part2Length = PART_LENGTH_MAP[order[1]];

  let formatted = cleaned;

  if (parts.length === 1 && parts[0].length === part1Length && value.length === part1Length) {
    formatted = `${parts[0]}${separator}`;
  } else if (parts.length === 2 && parts[1].length === part2Length && value.length === part1Length + 1 + part2Length) {
    formatted = `${parts[0]}${separator}${parts[1]}${separator}`;
  }

  const maxLength = PART_LENGTH_MAP.year + PART_LENGTH_MAP.day + PART_LENGTH_MAP.month + 2;
  if (formatted.length > maxLength) {
    formatted = formatted.substring(0, maxLength);
  }

  return formatted;
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