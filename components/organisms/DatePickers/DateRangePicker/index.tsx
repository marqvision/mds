import { DateRangePickerProps } from './@types';
import { AnchorButtonDateRangePicker } from './AnchorButtonDateRangePicker';

const AnchorPlainButtonDateRangePicker = (props: DateRangePickerProps) => {
  const { anchor } = props;
  return anchor.variant === 'plainButton' ? <div>plainButton</div> : null;
};

const AnchorInputDateRangePicker = (props: DateRangePickerProps) => {
  const { anchor } = props;
  return anchor.variant === 'input' ? <div>input</div> : null;
};

const AnchorCustomDateRangePicker = (props: DateRangePickerProps) => {
  const { anchor } = props;
  return anchor.variant === 'custom' ? <div>custom</div> : null;
};

const DateRangePickerSelector = (props: DateRangePickerProps) => {
  const { anchor, ...rest } = props;
  return anchor.variant === 'button' ? (
    <AnchorButtonDateRangePicker {...rest} anchor={anchor} />
  ) : anchor.variant === 'plainButton' ? (
    <AnchorPlainButtonDateRangePicker {...props} />
  ) : anchor.variant === 'input' ? (
    <AnchorInputDateRangePicker {...props} />
  ) : anchor.variant === 'custom' ? (
    <AnchorCustomDateRangePicker {...props} />
  ) : null;
};

export const MDSDateRangePicker = DateRangePickerSelector;
export type MDSDateRangePickerProps = DateRangePickerProps;
