import { SyntheticEvent } from 'react';
import { MDSButtonProps } from '../../../molecules/Button';
import { MDSInputProps } from '../../../molecules/Input';
import { MDSPlainButtonProps } from '../../../molecules/PlainButton';
import { DateInputGroupProps } from '../DateInputGroup/@types';

export type AvailableDateFormat =
  | 'MM/DD/YYYY' // 06/26/2025
  | 'YYYY-MM-DD' // 2025-06-26
  | 'MMM DD, YYYY'; // Jan 01, 2020

export type AnchorProps =
  | {
      variant: 'input';
      format?: AvailableDateFormat;
      separator?: string;
      startDateProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
      >;
      endDateProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
      >;
    }
  | {
      variant: 'button';
      format?: AvailableDateFormat;
      separator?: string;
      props?: MDSButtonProps;
    }
  | {
      variant: 'plainButton';
      format?: AvailableDateFormat;
      separator?: string;
      props?: Omit<MDSPlainButtonProps, 'icon'>;
    }
  | {
      variant: 'custom';
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
  anchor: AnchorProps;
} & Partial<Omit<DateInputGroupProps, 'onDateChange'>>;
