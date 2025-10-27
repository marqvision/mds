import { useImperativeHandle, useRef } from 'react';
import dayjs from 'dayjs';
import { MDSPopover } from '../../../molecules/Popover';
import { APP_VALUE_FORMAT, DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { AnchorProps, DatePickerProps } from './@types';
import { useDatePickerAnchor } from './@hooks/useDatePickerAnchor';
import { DatePickerCore } from './DatePickerCore';

type AnchorCustomProps = Extract<AnchorProps, { variant: 'custom' }>;

type AnchorCustomDatePickerProps = Omit<DatePickerProps, 'anchor'> & {
  anchor: AnchorCustomProps;
};

export const AnchorCustomDatePicker = (props: AnchorCustomDatePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, externalHandle } = props;
  const { internalDate, handleDateChange } = useDatePickerAnchor(props);

  const anchorRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <MDSPopover
      padding={0}
      width={DATE_RANGE_PICKER_CORE_WIDTH}
      blockAutoClose={true}
      anchor={({ open }) => (
        <div
          ref={anchorRef}
          style={{ width: 'fit-content' }}
          onClickCapture={(e) => {
            e.stopPropagation();
            open(e);
          }}
        >
          {anchor.children({
            // 코드에서 주고 받는 날짜 포맷은 YYYY-MM-DD로 통일
            selectedDate: internalDate ? dayjs(internalDate).format(APP_VALUE_FORMAT) : undefined,
          })}
        </div>
      )}
    >
      {({ close, isOpen }) =>
        isOpen ? <DatePickerCore {...props} format={format} onChange={handleDateChange} onClose={close} /> : <div />
      }
    </MDSPopover>
  );
};
