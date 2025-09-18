import { forwardRef } from 'react';
import dayjs from 'dayjs';
import { DateRangePickerProps, ExternalDateRangePickerProps } from './@types';
import { AnchorFilterDateRangePicker } from './AnchorFilterDateRangePicker';
import { AnchorCustomDateRangePicker } from './AnchorCustomDateRangePicker';
import { AnchorInputDateRangePicker } from './AnchorInputDateRangePicker';
import { AnchorPlainButtonDateRangePicker } from './AnchorPlainButtonDateRangePicker';

const DateRangePickerSelector = forwardRef(
  (props: ExternalDateRangePickerProps, ref?: React.ForwardedRef<{ onClick: () => void }>) => {
    const { anchor, onChange, value, minDate, maxDate, ...rest } = props;

    const handleDateChangeAdaptor = (dates?: { startDate?: Date; endDate?: Date }) => {
      if (dates?.startDate && dates?.endDate) {
        onChange?.({
          startDate: dayjs(dates.startDate).format(props.format),
          endDate: dayjs(dates.endDate).format(props.format),
        });
      } else {
        onChange?.(undefined);
      }
    };
    const resolvedStartDate = {
      value: value?.startDate ? dayjs(value.startDate).format(props.format) : undefined,
    };
    const resolvedEndDate = {
      value: value?.endDate ? dayjs(value.endDate).format(props.format) : undefined,
    };
    const resolvedMinDate = minDate ? dayjs(minDate).toDate() : undefined;
    const resolvedMaxDate = maxDate ? dayjs(maxDate).toDate() : undefined;

    const resolvedProps = {
      onChange: handleDateChangeAdaptor,  
      startDate: resolvedStartDate,
      endDate: resolvedEndDate,
      minDate: resolvedMinDate,
      maxDate: resolvedMaxDate,
      externalHandle: ref,
      ...rest,
    };

    return anchor.variant === 'filter' ? (
      <AnchorFilterDateRangePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'plainButton' ? (
      <AnchorPlainButtonDateRangePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'input' ? (
      <AnchorInputDateRangePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'custom' ? (
      <AnchorCustomDateRangePicker {...resolvedProps} anchor={anchor} />
    ) : null;
  }
);
DateRangePickerSelector.displayName = 'DateRangePickerSelector';

export const MDSDateRangePicker = DateRangePickerSelector;
export type MDSDateRangePickerProps = DateRangePickerProps;
