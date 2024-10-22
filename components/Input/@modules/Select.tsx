import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { CommonProps, ElementType, SelectProps, Size } from '../@types';
import { MDSIcon } from '../../Icon';
import { MDSChip } from '../../Chip';
import { theme } from '../@constants';
import { StyledBaseLabel, StyledIcon, StyledOutline } from './@styled';

const StyledLabel = styled(StyledBaseLabel)<{ size: Size; isError?: boolean }>``;

const StyledChipList = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  cursor: inherit;
  padding: 0;
  & > * {
    transition: display ${theme.transitionTiming} allow-discrete;
  }
`;

type Props<T> = CommonProps & Omit<SelectProps<T>, 'type'>;

export const Select = <T,>(props: Props<T>) => {
  const { value, list, size = 'medium', custom, isDisabled, isError, placeholder, format, onChange } = props;

  const isArray = Array.isArray(value);

  const valueList = isArray ? value : [value];

  const isWithChip = !!custom?.withChip || false;

  const getLabelFromList = (_value: ElementType<T>) => {
    const label = list.find((v) => v.value === _value)?.label || '';
    return format ? format(label, _value) : label;
  };

  const handleDelete = (e: MouseEvent, _value: ElementType<T>) => {
    e.preventDefault();
    e.stopPropagation();

    const newValue = (isArray ? valueList.filter((v) => v !== _value) : undefined) as T;

    onChange?.(newValue);
  };

  const handleDeleteAll = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newValue = (isArray ? [] : undefined) as T;

    onChange?.(newValue);
  };

  const label = valueList.map((item) => getLabelFromList(item)).join(', ');
  const ChipList =
    (custom?.withChip && valueList.length > 0 ? (
      valueList.map((v) => {
        if (typeof custom.withChip === 'function') {
          return custom.withChip(v);
        }
        return (
          <MDSChip
            key={v}
            size={theme.size[size].chipSize}
            color="bluegray"
            variant="tint"
            endIcon={
              <StyledIcon
                as={MDSIcon.CloseDelete}
                className={onChange ? 'show' : undefined}
                variant="fill"
                disabled={isDisabled}
                size={size === 'extra-large' ? 20 : 16}
                color={isDisabled ? 'color/content/neutral/default/disabled' : undefined}
                onClick={(e) => handleDelete(e, v)}
              />
            }
          >
            {getLabelFromList(v)}
          </MDSChip>
        );
      })
    ) : (
      <div>{placeholder}</div>
    )) || undefined;

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline customSize={size} disabled={isDisabled} isError={isError}>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          {isWithChip ? (
            <StyledChipList disabled={isDisabled} className="chipList">
              {ChipList}
            </StyledChipList>
          ) : (
            <input type="button" title={label} disabled={isDisabled} value={label} placeholder={placeholder} />
          )}
        </div>
        <StyledIcon
          as={MDSIcon.CloseDelete}
          className={(isArray ? value.length > 0 : !!value) && onChange && !isDisabled ? 'show' : undefined}
          variant="border"
          size={16}
          onClick={handleDeleteAll}
        />
        <StyledIcon
          as={MDSIcon.ArrowDown}
          className="show"
          variant="outline"
          size={16}
          color={isDisabled ? 'color/content/placeholder/normal' : undefined}
        />
      </StyledOutline>
    </StyledLabel>
  );
};
