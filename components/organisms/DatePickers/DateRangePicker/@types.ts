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
      width?: MDSInputProps<string>['width'];
      startDateProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'ref' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
      >;
      endDateProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'inputProps' | 'isMultiline' | 'ref' | 'onChange' | 'onBlur' // variant='input' 의 props 제거
      >;
    }
  | {
      variant: 'filter';
      format?: AvailableDateFormat;
      props?: MDSButtonProps;
    }
  | {
      variant: 'plainButton';
      format?: AvailableDateFormat;
      props?: Omit<MDSPlainButtonProps, 'icon'>;
    }
  | {
      variant: 'custom';
      children: (props: { selectedDates: { startDate: Date | null; endDate: Date | null } }) => React.ReactNode;
    };

export type DateRangePickerProps = {
  onClose?: () => void;
  onChange?: (dates?: { startDate: Date; endDate: Date }) => void;
  anchor: AnchorProps;
  externalHandle?: React.ForwardedRef<{ onClick: () => void }>;
} & Partial<Omit<DateInputGroupProps, 'onDateChange'>>;

export type ExternalDateRangePickerProps = {
  onClose?: () => void;
  onChange?: (dates?: { startDate: string; endDate: string }) => void;
  anchor: AnchorProps;
  value?: { startDate: string; endDate: string };
  minDate?: string;
  maxDate?: string;
} & Partial<Omit<DateInputGroupProps, 'onDateChange' | 'startDate' | 'endDate' | 'minDate' | 'maxDate'>>;
