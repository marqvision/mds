import { DateRangePickerProps } from './@types';
import { AnchorButtonDateRangePicker } from './AnchorButtonDateRangePicker';
import { AnchorInputDateRangePicker } from './AnchorInputDateRangePicker';
import { AnchorPlainButtonDateRangePicker } from './AnchorPlainButtonDateRangePicker';

const AnchorCustomDateRangePicker = (props: DateRangePickerProps) => {
  const { anchor } = props;
  return anchor.variant === 'custom' ? <div>custom</div> : null;
};

const DateRangePickerSelector = (props: DateRangePickerProps) => {
  const { anchor, ...rest } = props;
  return anchor.variant === 'button' ? (
    <AnchorButtonDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'plainButton' ? (
    <AnchorPlainButtonDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'input' ? (
    <AnchorInputDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'custom' ? (
    <AnchorCustomDateRangePicker {...props} />
  ) : null;
};

export const MDSDateRangePicker = DateRangePickerSelector;
export type MDSDateRangePickerProps = DateRangePickerProps;
