import { MDSIcon } from '../../../atoms/Icon';
import { MDSButton } from '../../../molecules/Button';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSTag } from '../../../molecules/Tag';
import { DEFAULT_PROPS } from '../@constants';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { AnchorProps, DateRangePickerProps } from './@types';
import { DateRangePickerCore } from './DateRangePickerCore';

type AnchorButtonProps = Extract<AnchorProps, { variant: 'filter' }>;

type AnchorButtonDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorButtonProps;
};

export const AnchorButtonDateRangePicker = (props: AnchorButtonDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { internalDate, handleDateChange, formattedDateString } = useDateRangePicker(props);

  return (
    <div>
      <MDSPopover
        padding={0}
        width={304}
        style={{ marginTop: -34 }}
        blockAutoClose={true}
        anchor={({ open }) => (
          <div
          style={{ width: 'fit-content' }}
            onClickCapture={(e) => {
              e.stopPropagation();
              open(e);
            }}
          >
            <MDSButton
              variant={internalDate.startDate && internalDate.endDate ? 'fill' : 'tint'}
              color="bluegray"
              startIcon={<MDSIcon.Calendar />}
              tags={
                internalDate.startDate && internalDate.endDate ? (
                  <MDSTag size="small" variant="tint" color="bluegray">
                    {formattedDateString}
                  </MDSTag>
                ) : undefined
              }
              {...anchor.props}
            >
              {anchor.props?.children || 'Label'}
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
    </div>
  );
};
