import styled from '@emotion/styled';
import { CommonProps, ElementType, SelectProps, Size } from '../@types';
import { MDSIcon } from '../../Icon';
import { StyledBaseLabel, StyledOutline } from './@styled';

const StyledLabel = styled(StyledBaseLabel)<{ size: Size; isError?: boolean }>``;

const StyledIcon = styled(MDSIcon.ArrowDown)`
  flex: 0 0 16px;
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
      <StyledOutline customSize={size} disabled={isDisabled} isError={isError}>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <input type="button" title={label} disabled={isDisabled} value={label} placeholder={placeholder} />
        </div>
        <StyledIcon variant="outline" size={16} color={isDisabled ? 'color/content/placeholder/normal' : undefined} />
      </StyledOutline>
    </StyledLabel>
  );
};
