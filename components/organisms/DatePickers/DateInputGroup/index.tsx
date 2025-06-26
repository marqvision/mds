import { MDSTypography } from '../../../atoms/Typography';
import { MDSInput } from '../../../molecules/Input';
import { DEFAULT_PROPS } from '../@constants';
import { DateInputGroupLayout } from './styles';
import { getHelperText } from './@utils';
import { DateInputGroupProps, SingleDateInput } from './@types';
import { useDateInputGroup } from './@hooks/useDateInputGroup';

const DateInputGroup = (props: DateInputGroupProps) => {
  const {
    startDate,
    endDate,
    format = DEFAULT_PROPS.format,
    separator = DEFAULT_PROPS.separator,
    initialFocus = 'startDate',
  } = props;
  const { startDateState, endDateState, errors, handleStartDateChange, handleEndDateChange, handleBlur } =
    useDateInputGroup(props);

  const startMainLabel = getLabel(startDate.label, endDate.label);
  const endMainLabel = getLabel(endDate.label, startDate.label);

  return (
    <DateInputGroupLayout
      hasLabel={!!props.startDate.label || !!props.endDate.label}
      hasError={!!errors.startDateField || !!errors.endDateField}
    >
      <div data-role="start-date-input-wrapper" onClick={startDate.onClick}>
        <MDSInput
          fullWidth
          variant="textField"
          value={startDateState.value}
          label={startMainLabel}
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
      <div data-role="separator">
        {typeof separator === 'string' ? <MDSTypography>{separator}</MDSTypography> : separator}
      </div>
      <div data-role="end-date-input-wrapper" onClick={endDate.onClick}>
        <MDSInput
          fullWidth
          variant="textField"
          value={endDateState.value}
          label={endMainLabel}
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

const getLabel = (label: SingleDateInput['label'], counterPartLabel: SingleDateInput['label']) => {
  if (!label && !counterPartLabel) {
    return undefined;
  }

  const mainLabel = typeof label === 'string' ? label : label?.main || '';
  const subLabel = typeof label === 'string' ? '' : label?.sub || '';
  const rightLabel = typeof label === 'string' ? undefined : label?.right || undefined;

  const emptyLabel = !label && counterPartLabel ? <div className="mds2-empty-label"></div> : undefined;

  return { main: mainLabel, sub: subLabel, right: rightLabel || emptyLabel };
};
