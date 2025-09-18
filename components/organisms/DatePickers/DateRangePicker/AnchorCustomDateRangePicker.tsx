import { useImperativeHandle, useRef } from 'react';
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
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, externalHandle } = props;
  const { internalDate, handleDateChange } = useDateRangePicker(props);

  const anchorRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <MDSPopover
      padding={0}
      width={304}
      anchor={({ open }) => (
        <div
          ref={anchorRef}
          style={{ width: 'fit-content' }}
          onClickCapture={(e) => {
            e.stopPropagation();
            open(e);
          }}
        >
          {anchor.children({ selectedDates: internalDate })}
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
