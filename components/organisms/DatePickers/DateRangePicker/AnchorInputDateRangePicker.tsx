import { useImperativeHandle, useRef } from 'react';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { MDSInput } from '../../../molecules/Input';
import { MDSPopover } from '../../../molecules/Popover';
import { AnchorProps, DateRangePickerProps } from './@types';
import { useDateRangePicker } from './@hooks/useDateRangePickerAnchor';
import { DateRangePickerCore } from './DateRangePickerCore';

type AnchorInputProps = Extract<AnchorProps, { variant: 'input' }>;

type AnchorInputDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorInputProps;
};

export const AnchorInputDateRangePicker = (props: AnchorInputDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, externalHandle } = props;
  const { handleDateChange, formattedDateString } = useDateRangePicker(props);

  const anchorRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <MDSPopover
      padding={0}
      width={DATE_RANGE_PICKER_CORE_WIDTH}
      blockAutoClose={true}
      anchor={({ open }) => (
        <>
          <div
            ref={anchorRef}
            onClick={(e) => {
              open(e);
            }}
          />
          <MDSInput
            {...anchor.mdsInputProps}
            variant="select"
            width={anchor.width || DATE_RANGE_PICKER_CORE_WIDTH} // 기본값: DateRangePickerCore와 동일한 width 사용
            value={formattedDateString}
            list={[{ label: formattedDateString, value: formattedDateString }]}
            fullWidth
            onChange={() => {
              handleDateChange(undefined);
            }}
            onClick={(e) => {
              e.stopPropagation();
              open(e);
            }}
          />
        </>
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
