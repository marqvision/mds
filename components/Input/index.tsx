import styled from '@emotion/styled';
import { theme } from './@constants';
import { Props, SelectProps, Size, TextFiledProps } from './@types';
import { TextField } from './@modules/TextField';
import { Select } from './@modules/Select';

const StyledWrapper = styled.div<{ size: Size; fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  max-width: ${({ size, fullWidth }) => (fullWidth ? undefined : theme.size[size].maxWidth)};
`;

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
  } = props;

  return (
    <StyledWrapper size={size} fullWidth={fullWidth} style={style}>
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
          } as TextFiledProps)}
        />
      )}
      {type === 'select' && (
        <Select<T>
          {...({
            value,
            list: list || [],
            size,
            isDisabled: isDisabled || isReadOnly,
            isError,
            format,
            placeholder,
          } as Omit<SelectProps<T>, 'type'>)}
        />
      )}
    </StyledWrapper>
  );
};
