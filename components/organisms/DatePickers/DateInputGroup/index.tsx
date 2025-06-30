import { MDSTypography } from '../../../atoms/Typography';
import { MDSInput } from '../../../molecules/Input';
import { DEFAULT_PROPS } from '../@constants';
import { DateInputGroupLayout } from './styles';
import { getHelperText } from './@utils';
import { DateInputGroupProps } from './@types';
import { useDateInputGroup } from './@hooks/useDateInputGroup';

const DateInputGroup = (props: DateInputGroupProps) => {
  const { startDate, endDate, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator, initialFocus = 'startDate' } = props;
  const { startDateState, endDateState, errors, handleStartDateChange, handleEndDateChange, handleBlur } =
    useDateInputGroup(props);

  return (
    <DateInputGroupLayout>
      <div data-role="start-date-input-wrapper">
        <MDSInput
          fullWidth
          variant="textField"
          value={startDateState.value}
          label={props.startDate.label}
          placeholder={startDate.placeholder || format || DEFAULT_PROPS.placeholder}
          inputProps={{
            autoFocus: initialFocus === 'startDate',
          }}
          onChange={handleStartDateChange}
          onBlur={handleBlur}
          status={errors.startDateField ? 'error' : undefined}
          guide={getHelperText('start', errors.value, startDate)}
        />
      </div>
      {typeof separator === 'string' ? <MDSTypography data-role="separator">{separator}</MDSTypography> : separator}
      <div data-role="end-date-input-wrapper">
        <MDSInput
          fullWidth
          variant="textField"
          value={endDateState.value}
          label={endDate.label}
          placeholder={endDate.placeholder || format || DEFAULT_PROPS.placeholder}
          inputProps={{
            autoFocus: initialFocus === 'endDate',
          }}
          onChange={handleEndDateChange}
          onBlur={handleBlur}
          status={errors.endDateField ? 'error' : undefined}
          guide={getHelperText('end', errors.value, endDate)}
        />
      </div>
    </DateInputGroupLayout>
  );
};

export const MDSDateInputGroup = DateInputGroup;
export type MDSDateInputGroupProps = DateInputGroupProps;
