import { DateRangePickerProps } from './@types';
import { AnchorButtonDateRangePicker } from './AnchorButtonDateRangePicker';
import { AnchorCustomDateRangePicker } from './AnchorCustomDateRangePicker';
import { AnchorInputDateRangePicker } from './AnchorInputDateRangePicker';
import { AnchorPlainButtonDateRangePicker } from './AnchorPlainButtonDateRangePicker';

const DateRangePickerSelector = (props: DateRangePickerProps) => {
  const { anchor, ...rest } = props;
  return anchor.variant === 'button' ? (
    <AnchorButtonDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'plainButton' ? (
    <AnchorPlainButtonDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'input' ? (
    <AnchorInputDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'custom' ? (
    <AnchorCustomDateRangePicker {...rest} anchor={anchor} />
  ) : null;
};

export const MDSDateRangePicker = DateRangePickerSelector;
export type MDSDateRangePickerProps = DateRangePickerProps;
