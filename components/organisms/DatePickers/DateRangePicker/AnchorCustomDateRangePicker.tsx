import { useImperativeHandle, useRef } from 'react';
import dayjs from 'dayjs';
import { MDSPopover } from '../../../molecules/Popover';
import { APP_VALUE_FORMAT, DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { useDateRangePickerAnchor } from './@hooks/useDateRangePickerAnchor';
import { AnchorProps, DateRangePickerProps } from './@types';
import { DateRangePickerCore } from './DateRangePickerCore';

type AnchorCustomProps = Extract<AnchorProps, { variant: 'custom' }>;

type AnchorCustomDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorCustomProps;
};

export const AnchorCustomDateRangePicker = (props: AnchorCustomDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, externalHandle } = props;
  const { internalDate, handleDateChange } = useDateRangePickerAnchor(props);

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
            selectedDates: {
              // 코드에서 주고 받는 날짜 포맷은 YYYY-MM-DD로 통일
              startDate: internalDate.startDate ? dayjs(internalDate.startDate).format(APP_VALUE_FORMAT) : null,
              endDate: internalDate.endDate ? dayjs(internalDate.endDate).format(APP_VALUE_FORMAT) : null,
            },
          })}
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
