import dayjs from "dayjs";

export const isDateInMinMaxRange = (rawDate: Date | string, minDate?: Date, maxDate?: Date) => {
  const date = typeof rawDate === 'string' ? dayjs(rawDate).toDate() : rawDate;

  if (!minDate && !maxDate) return true;
  if (minDate && maxDate) return dayjs(date).isAfter(minDate, 'day') && dayjs(date).isBefore(maxDate, 'day');
  if (minDate) return dayjs(date).isAfter(minDate, 'day');
  if (maxDate) return dayjs(date).isBefore(maxDate, 'day');
  return true;
};
