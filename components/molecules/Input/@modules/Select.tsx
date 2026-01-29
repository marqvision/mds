import { cloneElement, forwardRef, isValidElement, JSX, MouseEvent, Ref } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import ReactHtmlParser from 'html-react-parser';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSButton } from '../../Button';
import { theme } from '../@constants';
import { CommonProps, ElementType, SelectProps, Size } from '../@types';
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

const Placeholder = styled(MDSTypography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
`;

type Props<T> = CommonProps & Omit<SelectProps<T>, 'variant'>;

export const Select = forwardRef(<T,>(props: Props<T>, ref: Ref<HTMLButtonElement>) => {
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

  const labels = valueList.map((item) => getLabelFromList(item));
  const label = labels.every((item) => typeof item === 'string')
    ? labels.join(', ')
    : labels.map((label, index) => (isValidElement(label) ? cloneElement(label, { key: `label-${index}` }) : label));

  const chipList = (() => {
    if (!custom?.withChip) {
      return undefined;
    }

    const limit =
      typeof custom?.withChip === 'object' && custom.withChip.maxVisibleCount
        ? custom.withChip.maxVisibleCount
        : Infinity;

    const length = valueList.length;

    if (!length) {
      return (
        <Placeholder size={theme.size[size].typographySize} color="color/content/placeholder/normal">
          {placeholder || '\u00A0'}
        </Placeholder>
      );
    }

    const chips = valueList.slice(0, limit).map((v) => {
      if (typeof custom.withChip === 'function') {
        return custom.withChip(v);
      }
      return (
        <MDSButton
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
              size={16}
              color={isDisabled ? 'color/content/neutral/default/disabled' : undefined}
              onClick={(e) => handleDelete(e, v)}
            />
          }
        >
          <MDSTypography size="inherit" color="inherit" weight="inherit" wordBreak="break-all" textAlign="left">
            {getLabelFromList(v)}
          </MDSTypography>
        </MDSButton>
      );
    });

    if (length > limit) {
      chips.push(
        <MDSButton key="more-chip" size={theme.size[size].chipSize} color="bluegray" variant="tint">
          +{length - limit}
        </MDSButton>
      );
    }

    return chips;
  })();

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
              ref={ref}
              disabled={isDisabled}
              className={clsx('chipList', {
                readOnly: isReadOnly,
              })}
            >
              {chipList}
            </StyledChipList>
          ) : (
            <StyledButton
              ref={ref}
              className={isReadOnly ? 'readOnly' : undefined}
              customSize={size}
              title={typeof label === 'string' ? label : undefined}
              disabled={isDisabled}
            >
              {label ? (
                typeof label === 'string' ? (
                  ReactHtmlParser(label)
                ) : (
                  label
                )
              ) : (
                <Placeholder size={theme.size[size].typographySize} color="color/content/placeholder/normal">
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
          color={isDisabled || isReadOnly ? 'color/content/placeholder/normal' : undefined}
        />
      </StyledOutline>
    </StyledLabel>
  );
}) as <T>(props: Props<T> & { ref?: Ref<HTMLButtonElement> }) => JSX.Element;
