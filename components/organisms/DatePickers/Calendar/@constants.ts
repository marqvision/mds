import dayjs from 'dayjs';

export const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const AVAILABLE_YEARS = Array.from({ length: 10 }, (_, i) => dayjs().year() - 5 + i); // todo-@jamie: 스펙에 따라 전/후년도 기간 업데이트하기
export const MONTH_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
