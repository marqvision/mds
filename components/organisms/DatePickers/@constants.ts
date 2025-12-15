import { AvailableDateFormat } from './@types';

export const DATE_RANGE_PICKER_CORE_WIDTH = '304px';
export const DATE_SHAPE_REGEX_MAP: Record<AvailableDateFormat, RegExp> = {
  'MM/DD/YYYY': /^(?!.*\/\/)\d{0,2}(\/(\d{0,2}(\/(\d{0,4})?)?)?)?$/,
  'YYYY-MM-DD': /^(?!.*--)\d{0,4}(-(\d{0,2}(-(\d{0,2})?)?)?)?$/,
  'MMM DD, YYYY': /^(?!.*,,\s*)\w{0,3}(\s+\d{0,2}(\s*,\s*(\d{0,4})?)?)?$/,
  'M.D': /^(?!.*\.\.)\d{0,2}(\.\d{0,2})?$/,
};

export const SEPARATOR_MAP: Record<AvailableDateFormat, string> = {
  'MM/DD/YYYY': '/',
  'YYYY-MM-DD': '-',
  'MMM DD, YYYY': ' ',
  'M.D': '.',
};

export const DEFAULT_PROPS = {
  value: '',
  separator: '→',
  placeholder: 'MM/DD/YYYY' as AvailableDateFormat,
  format: 'MM/DD/YYYY' as AvailableDateFormat,
};
export const APP_VALUE_FORMAT = 'YYYY-MM-DD'; // 화면에 노출되는 포맷이 아닌, prop/onChange등 데이터 교한시 사용되는 포맷
