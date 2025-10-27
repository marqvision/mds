import { forwardRef } from 'react';
import dayjs from 'dayjs';
import { APP_VALUE_FORMAT } from '../@constants';
import { DatePickerProps, ExternalDatePickerProps } from './@types';
import { AnchorCustomDatePicker } from './AnchorCustomDatePicker';
import { AnchorInputDatePicker } from './AnchorInputDatePicker';
import { AnchorFilterDatePicker } from './AnchorFilterDatePicker';
import { AnchorPlainButtonDatePicker } from './AnchorPlainButtonDatePicker';

const DatePickerSelector = forwardRef(
  (props: ExternalDatePickerProps, ref?: React.ForwardedRef<{ onClick: () => void }>) => {
    const { anchor, onChange, value, minDate, maxDate, ...rest } = props;

    const handleDateChangeAdaptor = (date?: Date) => {
      onChange?.(date ? dayjs(date).format(APP_VALUE_FORMAT) : undefined);
    };
    const resolvedDateValue = value ? dayjs(value).format(props.format) : undefined;
    const resolvedMinDate = minDate ? dayjs(minDate).toDate() : undefined;
    const resolvedMaxDate = maxDate ? dayjs(maxDate).toDate() : undefined;

    const resolvedProps = {
      onChange: handleDateChangeAdaptor,
      value: resolvedDateValue,
      minDate: resolvedMinDate,
      maxDate: resolvedMaxDate,
      externalHandle: ref,
      ...rest,
    };

    return anchor.variant === 'filter' ? (
      <AnchorFilterDatePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'plainButton' ? (
      <AnchorPlainButtonDatePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'input' ? (
      <AnchorInputDatePicker {...resolvedProps} anchor={anchor} />
    ) : anchor.variant === 'custom' ? (
      <AnchorCustomDatePicker {...resolvedProps} anchor={anchor} />
    ) : null;
  }
);
DatePickerSelector.displayName = 'DatePickerSelector';

export const MDSDatePicker = DatePickerSelector;
export type MDSDatePickerProps = DatePickerProps;
