import styled from '@emotion/styled';
import { CommonProps, ElementType, SelectProps, Size } from '../@types';
import { theme } from '../@constants';
import { MDSIcon } from '../../Icon';
import { StyledOutline } from './@styled';

const StyledLabel = styled.label<{ size: Size; isError?: boolean }>`
  min-height: ${({ size }) => theme.size[size].height};
  position: relative;
  transition: outline ${theme.transitionTiming} ease;
  overflow: hidden;
  border-radius: 4px;
  &:focus-within {
    outline: ${({ isError }) =>
      `3px solid ${isError ? theme.color.border['error-focus-effect'] : theme.color.border['focus-effect']}`};
  }
`;

const StyledIcon = styled(MDSIcon.ArrowDown)<{ customSize: Size }>`
  position: absolute;
  pointer-events: none;
  right: ${({ customSize }) => theme.size[customSize].padding};
  top: ${({ customSize }) => (parseInt(theme.size[customSize].height) - 16) / 2}px;
`;

type Props<T> = CommonProps & Omit<SelectProps<T>, 'type'>;

export const Select = <T,>(props: Props<T>) => {
  const { value, list, size = 'medium', isDisabled, isError, placeholder, format } = props;

  const isArray = Array.isArray(value);

  const getLabelFromList = (value: ElementType<T>) => {
    const label = list.find((v) => v.value === value)?.label || '';
    return format ? format(label, value) : label;
  };

  const label = isArray
    ? (() => value.map((item) => getLabelFromList(item)).join(', '))()
    : getLabelFromList(value as ElementType<T>);

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline
        type="button"
        title={label}
        customSize={size}
        value={label}
        disabled={isDisabled}
        isError={isError}
        placeholder={placeholder}
      />
      <StyledIcon
        variant="outline"
        size={16}
        customSize={size}
        color={isDisabled ? 'color/content/placeholder/normal' : undefined}
      />
    </StyledLabel>
  );
};
