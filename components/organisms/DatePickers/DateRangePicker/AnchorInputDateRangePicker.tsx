import { useState } from 'react';
import styled from '@emotion/styled';
import { DEFAULT_PROPS } from '../@constants';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSDateInputGroup } from '../DateInputGroup';
import { AnchorProps, DateRangePickerProps } from './@types';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { DateRangePickerCore } from './DateRangePickerCore';

const StyledContainer = styled.div`
  display: flex;
  gap: 6px;
`;

type AnchorInputProps = Extract<AnchorProps, { variant: 'input' }>;
type AnchorInputDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorInputProps;
};

export const AnchorInputDateRangePicker = (props: AnchorInputDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  const [focus, setFocus] = useState<'startDate' | 'endDate'>('startDate');

  return (
    <StyledContainer>
      <MDSPopover
        padding={0}
        width={304}
        anchor={({ open }) => (
          <MDSDateInputGroup
            format={format}
            startDate={{
              ...props.startDate,
              value: formattedStartDate,
              onClick: (e) => {
                setFocus('startDate');
                open(e);
              },
            }}
            endDate={{
              ...props.endDate,
              value: formattedEndDate,
              onClick: (e) => {
                setFocus('endDate');
                open(e);
              },
            }}
            minDate={props.minDate}
            maxDate={props.maxDate}
            separator={anchor.separator}
            onDateChange={(dates) => {
              handleDateChange(dates);
            }}
          />
        )}
      >
        {({ close, isOpen }) =>
          isOpen ? (
            <DateRangePickerCore
              {...props}
              format={format}
              separator={separator}
              initialFocus={focus}
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
