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
    isError,
    custom,
    list,
    format,
    onChange,
    onBlur,
    style,
    label,
    guide,
  } = props;

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
            isDisabled: isDisabled || isReadOnly,
            isError,
            placeholder,
            format,
            onChange,
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
            isDisabled: isDisabled || isReadOnly,
            isError,
            format,
            placeholder,
            onChange,
          } as Omit<SelectProps<T>, 'type'>)}
        />
      )}
      {guide && <Guide label={guide} size={size} isError={isError} />}
    </StyledWrapper>
  );
};
