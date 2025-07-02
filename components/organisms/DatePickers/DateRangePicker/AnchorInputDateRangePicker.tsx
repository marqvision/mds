import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DEFAULT_PROPS } from '../@constants';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSDateInputGroup } from '../DateInputGroup';
import { MDSInput } from '../../../molecules/Input';
import { getDateRangeInputLabel } from '../@utils';
import { AnchorProps, DateRangePickerProps } from './@types';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { DateRangePickerCore } from './DateRangePickerCore';

const StyledContainer = styled.div<{ hasLabel: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;

  & .mds2-empty-label {
    width: 10px;
    height: 21px;
  }

  & [data-role='separator'] {
    ${({ hasLabel }) => {
      let marginTop = 4;
      if (hasLabel) {
        marginTop += 26;
      }
      return css`
        margin: ${marginTop}px 8px 0px;
      `;
    }}
  }
`;

type AnchorInputProps = Extract<AnchorProps, { variant: 'input' }>;
type AnchorInputDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorInputProps;
};

// note-@jamie: 이 형태로 바뀔 수도 있어서 일단은 남겨둠.
export const AnchorInputDateRangePicker2 = (props: AnchorInputDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  const [focus, setFocus] = useState<'startDate' | 'endDate'>('startDate');

  const startMainLabel = getDateRangeInputLabel(props.anchor.startDateProps?.label, props.anchor.endDateProps?.label);
  const endMainLabel = getDateRangeInputLabel(props.anchor.endDateProps?.label, props.anchor.startDateProps?.label);

  return (
    <StyledContainer hasLabel={!!props.anchor.startDateProps?.label || !!props.anchor.endDateProps?.label}>
      <MDSPopover
        padding={0}
        width={304}
        anchor={({ open }) => (
          <MDSDateInputGroup
            format={format}
            startDate={{
              ...props.startDate,
              value: formattedStartDate,
              label: startMainLabel,
              onClick: (e) => {
                setFocus('startDate');
                open(e);
              },
            }}
            endDate={{
              ...props.endDate,
              value: formattedEndDate,
              label: endMainLabel,
              onClick: (e) => {
                setFocus('endDate');
                open(e);
              },
            }}
            minDate={props.minDate}
            maxDate={props.maxDate}
            separator={anchor.separator}
            onDateChange={handleDateChange}
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

export const AnchorInputDateRangePicker = (props: AnchorInputDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { handleDateChange, formattedStartDate, formattedEndDate } = useDateRangePicker(props);

  const [focus, setFocus] = useState<'startDate' | 'endDate'>('startDate');

  const startMainLabel = getDateRangeInputLabel(props.anchor.startDateProps?.label, props.anchor.endDateProps?.label);
  const endMainLabel = getDateRangeInputLabel(props.anchor.endDateProps?.label, props.anchor.startDateProps?.label);

  return (
    <MDSPopover
      padding={0}
      width={304}
      anchor={({ open }) => (
        <StyledContainer hasLabel={!!props.anchor.startDateProps?.label || !!props.anchor.endDateProps?.label}>
          <MDSInput
            {...anchor.startDateProps}
            variant="select"
            value={formattedStartDate || ''}
            list={[{ label: formattedStartDate || '', value: formattedStartDate || '' }]}
            label={startMainLabel}
            fullWidth
            onClick={(e) => {
              setFocus('startDate');
              open(e);
            }}
          />
          <div data-role="separator">{anchor.separator}</div>
          <MDSInput
            {...anchor.endDateProps}
            variant="select"
            value={formattedEndDate || ''}
            list={[{ label: formattedEndDate || '', value: formattedEndDate || '' }]}
            label={endMainLabel}
            fullWidth
            onClick={(e) => {
              setFocus('endDate');
              open(e);
            }}
          />
        </StyledContainer>
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
  );
};
