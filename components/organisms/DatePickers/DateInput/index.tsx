import { MDSInput } from '../../../molecules/Input';
import { DEFAULT_PROPS } from '../@constants';
import { getHelperText } from '../DateInputGroup/@utils';
import { DateInputProps } from './@types';
import { useDateInput } from './useDateInput';

const DateInput = (props: DateInputProps) => {
  const { label, placeholder, format = DEFAULT_PROPS.format } = props;
  const { dateState, errors, handleDateChange, handleBlur } = useDateInput(props);

  return (
    <MDSInput
      fullWidth
      variant="textField"
      value={dateState.value}
      label={label}
      placeholder={placeholder || format || DEFAULT_PROPS.placeholder}
      inputProps={{
        autoFocus: true,
      }}
      onChange={handleDateChange}
      onBlur={handleBlur}
      status={errors ? 'error' : undefined}
      guide={getHelperText('start', { start: errors, end: null, range: false }, {})}
    />
  );
};


export const MDSDateInput = DateInput;