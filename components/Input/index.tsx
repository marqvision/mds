import { useState } from 'react';
import styled from '@emotion/styled';
import { theme } from './@constants';
import { Props, SelectProps, Size, TextFieldCustom, TextFieldProps } from './@types';
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
  transition: max-width ${theme.transitionTiming} ease;
`;

/**
 * @param {TextFieldProps | SelectProps} props.type Input에 대한 props
 * */
export const MDSInput = <T,>(props: Props<T>) => {
  const {
    type = 'textField',
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

  const [isFocused, setIsFocused] = useState(false);

  const guideList =
    (guide &&
      (Array.isArray(guide)
        ? guide.map((v) => {
            if (typeof v === 'string') {
              return { label: v, status };
            }
            return v;
          })
        : [{ label: guide, status }])) ||
    undefined;

  const focus = (custom as TextFieldCustom)?.expandOnFocus;

  const handleBlur = (_value: string) => {
    setIsFocused(false);
    onBlur?.(_value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <StyledWrapper
      size={size}
      fullWidth={fullWidth}
      style={{
        ...style,
        maxWidth: focus ? (isFocused ? focus.focusWidth : focus.defaultWidth) : undefined,
      }}
    >
      {label && <Label size={size} label={label} isDisabled={isDisabled} />}
      {type === 'textField' && (
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
            onBlur: handleBlur,
          } as TextFieldProps)}
          onFocus={handleFocus}
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
      {guideList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {guideList.map((guideItem) => (
            <Guide key={guideItem.label} label={guideItem.label} size={size} status={guideItem.status} />
          ))}
        </div>
      )}
    </StyledWrapper>
  );
};
