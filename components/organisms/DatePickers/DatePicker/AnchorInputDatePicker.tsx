import { useImperativeHandle, useRef } from 'react';
import { MDSPopover } from '../../../molecules/Popover';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { MDSInput } from '../../../molecules/Input';
import { AnchorProps, DatePickerProps } from './@types';
import { useDatePickerAnchor } from './@hooks/useDatePickerAnchor';
import { DatePickerCore } from './DatePickerCore';

type AnchorInputProps = Extract<AnchorProps, { variant: 'input' }>;
type AnchorInputDatePickerProps = Omit<DatePickerProps, 'input'> & {
  anchor: AnchorInputProps;
};

export const AnchorInputDatePicker = (props: AnchorInputDatePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, externalHandle } = props;
  const { handleDateChange, formattedDateString } = useDatePickerAnchor(props);

  const anchorRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <div>
      <MDSPopover
        padding={0}
        width={DATE_RANGE_PICKER_CORE_WIDTH}
        blockAutoClose={true}
        anchor={({ open, close }) => (
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
                close();
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
          isOpen ? <DatePickerCore {...props} format={format} onChange={handleDateChange} onClose={close} /> : <div />
        }
      </MDSPopover>
    </div>
  );
};
