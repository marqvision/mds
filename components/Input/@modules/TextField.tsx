import { ChangeEvent, isValidElement, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { CommonProps, Size, TextFieldProps } from '../@types';
import { MDSIcon } from '../../Icon';
import { theme } from '../@constants';
import { resolveFontWeight } from '../../Typography/@utils';
import { Features, MDSTypography } from '../../Typography';
import { AddButton } from './AddButton';
import { StyledBaseLabel, StyledIcon, StyledOutline } from './@styled';

const StyledLabel = styled(StyledBaseLabel)<{ size: Size; isError?: boolean }>`
  height: 26px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  ${resolveFontWeight('regular')}
  &[type=number] {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  },
`;

const StyledPrefix = styled(MDSTypography)`
  cursor: default;
  flex: 0 0 auto;
`;

type Props = CommonProps & TextFieldProps & { onFocus: () => void };

export const TextField = (props: Props) => {
  const {
    value,
    custom,
    size = 'medium',
    inputProps,
    isDisabled,
    isReadOnly,
    status,
    placeholder,
    format,
    onChange,
    onBlur,
    onFocus,
  } = props;

  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const lastValueRef = useRef('');
  const debounceRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef(format);
  const preventResizeRef = useRef(false);

  const add = custom?.add;
  const debounce = custom?.debounce || 0;
  const prefix = custom?.prefix;
  const isError = status === 'error';

  const variant = `T${theme.size[size].fontSize.replace('px', '')}` as Features['variant'];

  const Prefix = prefix ? (
    isValidElement(prefix) ? (
      prefix
    ) : (
      <StyledPrefix variant={variant} color="color/content/neutral/secondary/normal">
        {prefix}
      </StyledPrefix>
    )
  ) : undefined;
  const suffix = custom?.suffix;
  const Suffix = suffix ? (
    isValidElement(suffix) ? (
      suffix
    ) : (
      <StyledPrefix variant={variant} color="color/content/neutral/secondary/normal">
        {suffix}
      </StyledPrefix>
    )
  ) : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShowDelete(!!e.target.value);
    lastValueRef.current = value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setIsDebouncing(true);
    debounceRef.current = window.setTimeout(() => {
      onChange?.(e.target.value);
      setIsDebouncing(false);
    }, debounce);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!preventResizeRef.current) {
      onBlur?.(e.target.value);
    }
  };

  const handleDelete = () => {
    onChange?.('');
    onBlur?.('');
    setIsShowDelete(false);

    if (isDebouncing) {
      setIsDebouncing(false);
      clearTimeout(debounceRef.current);
    }
  };

  useEffect(() => {
    const input = inputRef.current;

    if (input && !isDebouncing) {
      if (value !== lastValueRef.current) {
        input.value = formatRef.current ? formatRef.current(value) : value;
        lastValueRef.current = value;

        setIsShowDelete(!!value);
      }
    }
  }, [value, isDebouncing]);

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline
        customSize={size}
        flatRight={add ? 'add' : custom?.flatRight}
        flatLeft={custom?.flatLeft}
        disabled={isDisabled}
        readOnly={isReadOnly}
        isError={isError}
      >
        {Prefix}
        <StyledInput
          ref={inputRef}
          {...inputProps}
          title={value}
          disabled={isDisabled}
          readOnly={isReadOnly}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={onFocus}
        />
        {Suffix}
        <StyledIcon
          as={MDSIcon.CloseDelete}
          color={isDisabled || isReadOnly ? 'color/content/neutral/default/disabled' : undefined}
          variant="border"
          size={theme.size[size].iconSize}
          onClick={!(isDisabled || isReadOnly) ? handleDelete : undefined}
          className={isShowDelete ? 'show' : undefined}
          onMouseEnter={() => (preventResizeRef.current = true)}
          onMouseLeave={() => (preventResizeRef.current = false)}
        />
      </StyledOutline>
      {add && (
        <AddButton
          label={add.label}
          size={size}
          isDisabled={isDisabled || isReadOnly || !value}
          isError={isError}
          onClick={() => add.onSubmit(value)}
        />
      )}
    </StyledLabel>
  );
};
