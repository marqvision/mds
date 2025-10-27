import { useImperativeHandle, useRef } from 'react';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSButton } from '../../../molecules/Button';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSTag } from '../../../molecules/Tag';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { useDateRangePickerAnchor } from './@hooks/useDateRangePickerAnchor';
import { AnchorProps, DateRangePickerProps } from './@types';
import { DateRangePickerCore } from './DateRangePickerCore';

type AnchorFilterProps = Extract<AnchorProps, { variant: 'filter' }>;

type AnchorFilterDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorFilterProps;
};

export const AnchorFilterDateRangePicker = (props: AnchorFilterDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, externalHandle } = props;
  const { internalDate, handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePickerAnchor(props);

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
          <MDSButton
            variant={internalDate.startDate && internalDate.endDate ? 'fill' : 'tint'}
            color="bluegray"
            endIcon={<MDSIcon.ArrowDown variant="outline" />}
            tags={
              internalDate.startDate && internalDate.endDate ? (
                <MDSTag size="small" variant="tint" color="bluegray">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {formattedStartDate}
                    <MDSIcon.TailArrowRight size={14} />
                    {formattedEndDate}
                  </div>
                </MDSTag>
              ) : undefined
            }
            onClick={() => {
              // button 스타일링을 위 빈 onClick 핸들러 추가
            }}
            {...anchor.mdsButtonProps}
          >
            {anchor.mdsButtonProps?.children || 'Label'}
          </MDSButton>
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
