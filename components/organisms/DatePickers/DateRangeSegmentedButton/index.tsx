import dayjs from 'dayjs';
import { MDSSegmentedButton } from '../../../molecules/SegmentedButton';
import { APP_VALUE_FORMAT } from '../@constants';
import type { MDSSegmentedButtonProps } from '../../../molecules/SegmentedButton/@types';
import type {
  DateRange,
  DateRangePresetItem,
  DateRangePresetValue,
  FixedSegmentedButtonProps,
  MDSDateRangeSegmentedButtonProps,
} from './@types';

//#region utils
const deriveRangeFromValue = (value: string): DateRange | undefined => {
  const matched = value.match(/^(\d+)([dwmy])$/i); // 7d/7D -> 7, d
  if (!matched) {
    return undefined;
  }

  const [, amountText, unitText] = matched;
  const amount = Number(amountText);
  if (Number.isNaN(amount) || amount <= 0) {
    return undefined;
  }

  const UNIT_MAP = {
    d: 'day',
    w: 'week',
    m: 'month',
    y: 'year',
  } as const;

  const unit = UNIT_MAP[unitText.toLowerCase() as keyof typeof UNIT_MAP];

  const endDate = dayjs();
  const startDate = endDate.subtract(amount, unit);

  return {
    startDate: startDate.format(APP_VALUE_FORMAT),
    endDate: endDate.format(APP_VALUE_FORMAT),
  };
};

const parsePresetToDateRange = <T extends string>(preset: DateRangePresetItem<T>): DateRange | undefined => {
  if (preset.resolveRange) {
    return preset.resolveRange();
  }

  if (preset.value === 'custom' || preset.value === 'all') {
    return undefined;
  }

  return deriveRangeFromValue(preset.value);
};

//#endregion

const DateRangeSegmentedButton = <T extends string>(props: MDSDateRangeSegmentedButtonProps<T>) => {
  const { list, value, onChange, selectedIcon, variant = 'border', size = 'medium' } = props;

  const segmentedList = list.map(({ label, value, icon }) => ({
    label,
    value,
    icon,
  }));

  if (!list.length) {
    return null;
  }

  const resolvedValue = value ?? list[0]?.value;
  const resolvedType = props.type ?? 'hug';
  const isFixedType = resolvedType === 'fixed';

  const handleChange = (selectedValue: DateRangePresetValue<T>) => {
    const preset = list.find((item) => item.value === selectedValue);
    if (!preset) {
      return;
    }

    if (preset.value === 'custom') {
      onChange(preset);
      return;
    }

    const dateRange = parsePresetToDateRange(preset);
    onChange(preset, dateRange);
  };

  const segmentedButtonProps: MDSSegmentedButtonProps<DateRangePresetValue<T>> = isFixedType
    ? {
        variant,
        type: 'fixed',
        fixedWidth: (props as FixedSegmentedButtonProps<T>).fixedWidth,
        list: segmentedList,
        value: resolvedValue,
        onChange: handleChange,
        selectedIcon,
        size,
      }
    : {
        variant,
        type: resolvedType,
        list: segmentedList,
        value: resolvedValue,
        onChange: handleChange,
        selectedIcon,
        size,
      };

  return <MDSSegmentedButton {...segmentedButtonProps} />;
};

export const MDSDateRangeSegmentedButton = DateRangeSegmentedButton;
export type { MDSDateRangeSegmentedButtonProps } from './@types';
