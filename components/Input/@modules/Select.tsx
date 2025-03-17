import { MouseEvent } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import ReactHtmlParser from 'html-react-parser';
import { CommonProps, ElementType, SelectProps, Size } from '../@types';
import { MDSIcon } from '../../Icon';
import { MDSChip } from '../../Chip';
import { theme } from '../@constants';
import { MDSTypography2, MDSTypographyProps2, getTypographyProps } from '../../Typography2';
import { flattenDropdown } from '../@utils';
import { StyledBaseLabel, StyledIcon, StyledOutline } from './@styled';

const StyledLabel = styled(StyledBaseLabel)<{ size: Size; isError?: boolean }>``;

const StyledChipList = styled.button`
  width: 100%;
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

const StyledButton = styled.button<{ customSize: Size }>`
  display: block;
  font-size: ${({ customSize }) => theme.size[customSize].fontSize};
  line-height: 1.5;
  background: none;
  border: none;
  padding: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  text-align: left;
  cursor: pointer;
`;

const Placeholder = styled(MDSTypography2)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

type Props<T> = CommonProps & Omit<SelectProps<T>, 'variant'>;

export const Select = <T,>(props: Props<T>) => {
  const {
    value,
    list,
    size = 'medium',
    custom,
    isDisabled,
    isReadOnly,
    status,
    placeholder,
    format,
    style,
    onChange,
    onClick,
  } = props;

  const isArray = Array.isArray(value);

  const valueList = isArray ? value : [value];

  const isWithChip = !!custom?.withChip || false;
  const isError = status === 'error';
  const v2FontStyle = getTypographyProps(parseInt(theme.size[size].fontSize.replace('px', '')));

  const flatList = flattenDropdown(list);

  const getLabelFromList = (_value: ElementType<T>) => {
    const label = flatList.find((v) => v.value === _value)?.label || '';
    return format && typeof label === 'string' ? format(label, _value) : label;
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
    custom?.withChip && valueList.length > 0 ? (
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
            isDisabled={isDisabled}
            endIcon={
              <StyledIcon
                as={MDSIcon.CloseDelete}
                className={clsx(onChange ? 'show' : undefined, 'mds-delete-icon')}
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
      <Placeholder {...(v2FontStyle as MDSTypographyProps2)} color="color/content/placeholder/normal">
        {placeholder || '\u00A0'}
      </Placeholder>
    );

  return (
    <StyledLabel
      size={size}
      isError={isError}
      onClick={(e) => {
        e.currentTarget.querySelector('button')?.focus();
        e.stopPropagation();
        e.preventDefault();
        onClick?.(e);
      }}
    >
      <StyledOutline
        customSize={size}
        disabled={isDisabled}
        flatRight={custom?.flatRight}
        flatLeft={custom?.flatLeft}
        readOnly={isReadOnly}
        isError={isError}
        style={style}
      >
        <div style={{ overflow: 'hidden', width: '100%' }}>
          {isWithChip ? (
            <StyledChipList
              disabled={isDisabled}
              className={clsx('chipList', {
                readOnly: isReadOnly,
              })}
            >
              {ChipList}
            </StyledChipList>
          ) : (
            <StyledButton
              className={isReadOnly ? 'readOnly' : undefined}
              customSize={size}
              title={label}
              disabled={isDisabled}
            >
              {label ? (
                ReactHtmlParser(label)
              ) : (
                <Placeholder {...(v2FontStyle as MDSTypographyProps2)} color="color/content/placeholder/normal">
                  {placeholder || '\u00A0'}
                </Placeholder>
              )}
            </StyledButton>
          )}
        </div>
        <StyledIcon
          as={MDSIcon.CloseDelete}
          className={clsx((isArray ? value.length > 0 : !!value) && onChange ? 'show' : undefined, 'mds-delete-icon')}
          variant="border"
          size={theme.size[size].iconSize}
          onClick={handleDeleteAll}
        />
        <StyledIcon
          as={MDSIcon.ArrowDown}
          className="show"
          variant="outline"
          size={theme.size[size].iconSize}
          color={isDisabled ? 'color/content/placeholder/normal' : undefined}
        />
      </StyledOutline>
    </StyledLabel>
  );
};
