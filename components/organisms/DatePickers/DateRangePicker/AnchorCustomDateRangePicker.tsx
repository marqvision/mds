import { MDSPopover } from '../../../molecules/Popover';
import { DEFAULT_PROPS } from '../@constants';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { AnchorProps, DateRangePickerProps } from './@types';
import { DateRangePickerCore } from './DateRangePickerCore';

type AnchorPlainButtonProps = Extract<AnchorProps, { variant: 'custom' }>;
type AnchorPlainButtonDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorPlainButtonProps;
};

export const AnchorCustomDateRangePicker = (props: AnchorPlainButtonDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { internalDate, handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  return (
    <MDSPopover
      padding={0}
      width={304}
      anchor={({ open }) => (
        <div
          onClickCapture={(e) => {
            e.stopPropagation();
            open(e);
          }}
        >
          {typeof anchor.children === 'function' ? anchor.children({ selectedDates: internalDate }) : anchor.children}
        </div>
      )}
    >
      {({ close, isOpen }) =>
        isOpen ? (
          <DateRangePickerCore
            {...props}
            format={format}
            separator={separator}
            onChange={handleDateChange}
            onClose={close}
          />
        ) : (
          <div />
        )
      }
    </MDSPopover>
  );
};
