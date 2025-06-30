import styled from '@emotion/styled';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSPopover } from '../../../molecules/Popover';
import { DEFAULT_PROPS } from '../@constants';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { AnchorProps, DateRangePickerProps } from './@types';
import { DateRangePickerCore } from './DateRangePickerCore';

const StyledContainer = styled.div`
  display: flex;
  gap: 6px;
`;

type AnchorPlainButtonProps = Extract<AnchorProps, { variant: 'plainButton' }>;
type AnchorPlainButtonDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorPlainButtonProps;
};

export const AnchorPlainButtonDateRangePicker = (props: AnchorPlainButtonDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  return (
    <StyledContainer>
      <MDSPopover
        padding={0}
        width={304}
        anchor={({ open }) => (
          <MDSPlainButton
            color="bluegray"
            {...anchor.props}
            onClick={(e) => {
              e.stopPropagation();
              open(e);
            }}
          >
            {formattedStartDate}
          </MDSPlainButton>
        )}
      >
        {({ close, isOpen }) =>
          isOpen ? (
            <DateRangePickerCore
              {...props}
              format={format}
              separator={separator}
              initialFocus="startDate"
              onChange={handleDateChange}
              onClose={close}
            />
          ) : (
            <div />
          )
        }
      </MDSPopover>
      <div>{anchor.separator}</div>
      <MDSPopover
        padding={0}
        width={304}
        anchor={({ open }) => (
          <MDSPlainButton
            color="bluegray"
            {...anchor.props}
            onClick={(e) => {
              e.stopPropagation();
              open(e);
            }}
          >
            {formattedEndDate}
          </MDSPlainButton>
        )}
      >
        {({ close, isOpen }) =>
          isOpen ? (
            <DateRangePickerCore
              {...props}
              format={format}
              separator={separator}
              initialFocus="endDate"
              onChange={handleDateChange}
              onClose={close}
            />
          ) : (
            <div />
          )
        }
      </MDSPopover>
    </StyledContainer>
  );
};
