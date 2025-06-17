import { MDSTypography } from '../../../atoms/Typography';
import { MDSInput } from '../../../molecules/Input';
import { DateInputGroupLayout } from './styles';
import { getHelperText } from './@utils';
import { DateInputGroupProps } from './@types';
import { useDateInputGroup } from './@hooks/useDateInputGroup';
import { DEFAULT_PROPS } from './@constants';

const DateInputGroup = (props: DateInputGroupProps) => {
  const { startDate, endDate, format = DEFAULT_PROPS.format, separator = DEFAULT_PROPS.separator } = props;
  const {
    startDateState,
    endDateState,
    errors,
    handleStartDateChange,
    handleEndDateChange,
    handleBlur,
    startHasError,
    endHasError,
  } = useDateInputGroup(props);

  return (
    <DateInputGroupLayout>
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={startDateState.value}
          label={props.startDate.label}
          placeholder={startDate.placeholder || format || DEFAULT_PROPS.placeholder}
          onChange={handleStartDateChange}
          onBlur={handleBlur}
          status={startHasError ? 'error' : undefined}
          guide={getHelperText('start', errors, startDate)}
        />
      </div>
      {typeof separator === 'string' ? <MDSTypography data-role="separator">{separator}</MDSTypography> : separator}
      <div>
        <MDSInput
          fullWidth
          variant="textField"
          value={endDateState.value}
          label={endDate.label}
          placeholder={endDate.placeholder || format || DEFAULT_PROPS.placeholder}
          onChange={handleEndDateChange}
          onBlur={handleBlur}
          status={endHasError ? 'error' : undefined}
          guide={getHelperText('end', errors, endDate)}
        />
      </div>
    </DateInputGroupLayout>
  );
};

export const MDSDateInputGroup = DateInputGroup;
export type MDSDateInputGroupProps = DateInputGroupProps;
