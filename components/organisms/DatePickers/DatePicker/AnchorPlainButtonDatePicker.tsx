import { useImperativeHandle, useRef } from 'react';
import { MDSPopover } from '../../../molecules/Popover';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { AnchorProps, DatePickerProps } from './@types';
import { useDatePickerAnchor } from './@hooks/useDatePickerAnchor';
import { DatePickerCore } from './DatePickerCore';

type AnchorPlainButtonProps = Extract<AnchorProps, { variant: 'plainButton' }>;
type AnchorPlainButtonDatePickerProps = Omit<DatePickerProps, 'plainButton'> & {
  anchor: AnchorPlainButtonProps;
};

export const AnchorPlainButtonDatePicker = (props: AnchorPlainButtonDatePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, externalHandle } = props;
  const { handleDateChange, formattedDateString } = useDatePickerAnchor(props);

  const anchorRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <MDSPopover
      padding={0}
      width={DATE_RANGE_PICKER_CORE_WIDTH}
      blockAutoClose={true}
      anchor={({ open }) => (
        <MDSPlainButton
          ref={anchorRef}
          color="bluegray"
          {...anchor.mdsPlainButtonProps}
          onClick={(e) => {
            e.stopPropagation();
            open(e);
          }}
        >
          {formattedDateString}
        </MDSPlainButton>
      )}
    >
      {({ close, isOpen }) =>
        isOpen ? <DatePickerCore {...props} format={format} onChange={handleDateChange} onClose={close} /> : <div />
      }
    </MDSPopover>
  );
};
