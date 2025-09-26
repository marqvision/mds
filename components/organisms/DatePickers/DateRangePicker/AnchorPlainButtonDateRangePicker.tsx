import { useImperativeHandle, useRef } from 'react';
import styled from '@emotion/styled';
import { MDSPlainButton } from '../../../molecules/PlainButton';
import { MDSPopover } from '../../../molecules/Popover';
import { DATE_RANGE_PICKER_CORE_WIDTH, DEFAULT_PROPS } from '../@constants';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSIcon } from '../../../atoms/Icon';
import { useDateRangePicker } from './@hooks/useDateRangePickerAnchor';
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
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, externalHandle } = props;
  const { handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  const anchorRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(externalHandle, () => ({ onClick: () => anchorRef.current?.click() }), []);

  return (
    <StyledContainer>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MDSTypography variant="body" weight="medium">
                {formattedStartDate}
              </MDSTypography>
              <MDSIcon.TailArrowRight size={14} />
              <MDSTypography variant="body" weight="medium">
                {formattedEndDate}
              </MDSTypography>
            </div>
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
    </StyledContainer>
  );
};
