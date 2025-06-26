import { SyntheticEvent } from 'react';
import { MDSButtonProps } from '../../../molecules/Button';
import { MDSInputProps } from '../../../molecules/Input';
import { MDSPlainButtonProps } from '../../../molecules/PlainButton';
import { DateInputGroupProps } from '../DateInputGroup/@types';


export type AvailableDateFormat = 'MM/DD/YYYY' | 'YYYY-MM-DD';
export type AnchorProps =
  | {
      anchorVariant: 'input';
      anchorProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
      >;
    }
  | {
      anchorVariant: 'button';
      anchorProps?: MDSButtonProps;
    }
  | {
      anchorVariant: 'plainButton';
      anchorProps?: Omit<MDSPlainButtonProps, 'icon'>;
    }
  | {
      anchorVariant: 'custom';
      children:
        | React.ReactNode
        | ((props: {
            open?: (e?: React.MouseEvent<Element, MouseEvent>) => void;
            close?: (e?: SyntheticEvent) => void;
          }) => React.ReactNode);
    };

export type DateRangePickerProps = {
  onClose?: () => void;
  onChange?: (dates: { startDate: Date | null; endDate: Date | null }) => void;
} & Partial<Omit<DateInputGroupProps, 'onDateChange'>> &
  AnchorProps;
