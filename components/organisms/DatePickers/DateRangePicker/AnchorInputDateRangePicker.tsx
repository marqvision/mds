import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { DEFAULT_PROPS } from '../@constants';
import { MDSPopover } from '../../../molecules/Popover';
import { MDSInput } from '../../../molecules/Input';
import { getDateRangeInputLabel } from '../@utils';
import { AnchorProps, DateRangePickerProps } from './@types';
import { useDateRangePicker } from './@hooks/useDateRangePicker';
import { DateRangePickerCore } from './DateRangePickerCore';

const StyledContainer = styled.div<{ hasLabel: boolean; hideAnchor: boolean }>`
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
  ${({ hideAnchor }) =>
    hideAnchor &&
    css`
      // height: 0px;
      // & label, & label div {
      // // display: none;
      //   min-height: 0px;
      //   height: 0px;
      //   opacity: 0;
      // }
    `}
`;

type AnchorInputProps = Extract<AnchorProps, { variant: 'input' }>;
type AnchorInputDateRangePickerProps = Omit<DateRangePickerProps, 'anchor'> & {
  anchor: AnchorInputProps;
};

export const AnchorInputDateRangePicker = (props: AnchorInputDateRangePickerProps) => {
  const { anchor, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const { handleDateChange, formattedDateString } = useDateRangePicker(props);

  const [focus, setFocus] = useState<'startDate' | 'endDate'>('startDate');

  const startMainLabel = getDateRangeInputLabel(props.anchor.startDateProps?.label, props.anchor.endDateProps?.label);

  const [isOpen, setIsOpen] = useState(false);


  return (
    <MDSPopover
      padding={0}
      width={304}
      style={{ marginTop: -34 }}
      blockAutoClose={true}
      onVisibleChange={() => {
        setIsOpen((prev) => !prev);
      }}
      anchor={({ open }) => (
        <StyledContainer
          hasLabel={!!props.anchor.startDateProps?.label || !!props.anchor.endDateProps?.label}
          hideAnchor={isOpen}
        >
          <MDSInput
            {...anchor.startDateProps}
            variant="select"
            width="304px"
            value={formattedDateString || ''}
            list={[{ label: formattedDateString || '', value: formattedDateString || '' }]}
            label={startMainLabel}
            fullWidth
            onChange={(value) => {
              handleDateChange(undefined);
            }}
            onClick={(e) => {
              setFocus('startDate');
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
