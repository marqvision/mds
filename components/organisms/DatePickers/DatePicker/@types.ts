import { MDSButtonProps } from '../../../molecules/Button';
import { MDSInputProps } from '../../../molecules/Input';
import { MDSPlainButtonProps } from '../../../molecules/PlainButton';
import { AvailableDateFormat } from '../@types';
import { DateInputProps } from '../DateInput/@types';

export type AnchorProps =
  | {
      variant: 'input';
      format?: AvailableDateFormat;
      width?: MDSInputProps<string>['width'];
      mdsInputProps?: Omit<
        MDSInputProps<string>,
        'variant' | 'list' | 'value' | 'format' | 'isMultiline' | 'ref' | 'inputProps' | 'onChange' | 'onBlur' | 'width' // variant='input' 의 props 제거
      >;
    }
  | {
      variant: 'filter';
      format?: AvailableDateFormat;
      mdsButtonProps?: MDSButtonProps;
    }
  | {
      variant: 'plainButton';
      format?: AvailableDateFormat;
      mdsPlainButtonProps?: Omit<MDSPlainButtonProps, 'icon'>;
    }
  | {
      variant: 'custom';
      children: (props: { selectedDate?: string }) => React.ReactNode;
    };

export type DatePickerProps = {
  onClose?: () => void;
  onChange?: (date?: Date) => void;
  anchor: AnchorProps;
  externalHandle?: React.ForwardedRef<{ onClick: () => void }>;
} & Partial<Omit<DateInputProps, 'onDateChange' | 'onChange'>>;

export type ExternalDatePickerProps = {
  onClose?: () => void;
  onChange?: (date?: string) => void;
  anchor: AnchorProps;
  minDate?: string;
  maxDate?: string;
} & Partial<Omit<DateInputProps, 'onDateChange' | 'minDate' | 'maxDate'>>;
