import { AvailableDateFormat } from './DateRangePicker/@types';

export const DATE_SHAPE_REGEX_MAP: Record<AvailableDateFormat, RegExp> = {
  'MM/DD/YYYY': /^(?!.*\/\/)\d{0,2}(\/(\d{0,2}(\/(\d{0,4})?)?)?)?$/,
  'YYYY-MM-DD': /^(?!.*--)\d{0,4}(-(\d{0,2}(-(\d{0,2})?)?)?)?$/,
};

export const SEPARATOR_MAP: Record<AvailableDateFormat, string> = {
  'MM/DD/YYYY': '/',
  'YYYY-MM-DD': '-',
};

export const DEFAULT_PROPS = {
  value: '',
  separator: '~',
  placeholder: 'MM/DD/YYYY' as AvailableDateFormat,
  format: 'MM/DD/YYYY' as AvailableDateFormat,
};
