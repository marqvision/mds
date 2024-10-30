import styled from '@emotion/styled';
import { theme } from './@constants';
import { Props, SelectProps, Size, TextFieldProps } from './@types';
import { TextField } from './@modules/TextField';
import { Select } from './@modules/Select';
import { Label } from './@modules/Label';
import { Guide } from './@modules/Guide';

const StyledWrapper = styled.div<{ size: Size; fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: ${({ size, fullWidth }) => (fullWidth ? undefined : theme.size[size].maxWidth)};
`;

/**
 * @param {'select'} [props.type] select 를 추가하면 Select 버튼으로 사용 가능
 * @param [props.status] 'success' | 'error' > guide 색상 변경, 버튼 색상 변경 (error)
 * */
export const MDSInput = <T,>(props: Props<T>) => {
  const {
    type = 'textFiled',
    value,
    size = 'medium',
    inputProps,
    placeholder,
    fullWidth = false,
    isDisabled,
    isReadOnly,
    status,
    custom,
    list,
    format,
    onChange,
    onClick,
    onBlur,
    style,
    label,
    guide,
  } = props;

  const handleChange = isReadOnly || isDisabled ? undefined : onChange;
  const handleClick = isReadOnly || isDisabled ? undefined : onClick;

  return (
    <StyledWrapper size={size} fullWidth={fullWidth} style={style}>
      {label && <Label size={size} label={label} isDisabled={isDisabled} />}
      {type === 'textFiled' && (
        <TextField
          {...({
            value,
            size,
            custom,
            inputProps,
            isDisabled: isDisabled,
            isReadOnly: isReadOnly,
            status,
            placeholder,
            format,
            onChange: handleChange,
            onBlur,
          } as TextFieldProps)}
        />
      )}
      {type === 'select' && (
        <Select<T>
          {...({
            value,
            list: list || [],
            size,
            custom,
            isDisabled: isDisabled,
            isReadOnly: isReadOnly,
            status,
            format,
            placeholder,
            onChange: handleChange,
            onClick: handleClick,
          } as Omit<SelectProps<T>, 'type'>)}
        />
      )}
      {guide && <Guide label={guide} size={size} status={status} />}
    </StyledWrapper>
  );
};
