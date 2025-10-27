import { useImperativeHandle, useRef } from 'react';
import { MDSPopover } from '../../../molecules/Popover';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { MDSButton } from '../../../molecules/Button';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTag } from '../../../molecules/Tag';
import { AnchorProps, DatePickerProps } from './@types';
import { useDatePickerAnchor } from './@hooks/useDatePickerAnchor';
import { DatePickerCore } from './DatePickerCore';

type AnchorFilterProps = Extract<AnchorProps, { variant: 'filter' }>;
type AnchorFilterDatePickerProps = Omit<DatePickerProps, 'filter'> & {
  anchor: AnchorFilterProps;
};

export const AnchorFilterDatePicker = (props: AnchorFilterDatePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, externalHandle } = props;
  const { handleDateChange, formattedDateString } = useDatePickerAnchor(props);

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
            variant={formattedDateString ? 'fill' : 'tint'}
            color="bluegray"
            endIcon={<MDSIcon.ArrowDown variant="outline" />}
            tags={
              formattedDateString ? (
                <MDSTag size="small" variant="tint" color="bluegray">
                  {formattedDateString}
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
        isOpen ? <DatePickerCore {...props} format={format} onChange={handleDateChange} onClose={close} /> : <div />
      }
    </MDSPopover>
  );
};
