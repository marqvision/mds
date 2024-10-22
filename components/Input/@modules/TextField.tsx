import { ChangeEvent, isValidElement, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { CommonProps, Size, TextFieldProps } from '../@types';
import { MDSIcon } from '../../Icon';
import { theme } from '../@constants';
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
  &[type=number] {
    -moz-appearance: textfield;
  }
  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0,
  },
`;

const StyledPrefix = styled.div<{ size: Size }>`
  cursor: default;
  font-size: ${({ size }) => theme.size[size].fontSize};
  color: ${({ theme }) => theme.color.content.neutral.secondary.normal};
  flex: 0 0 auto;
`;

type Props = CommonProps & TextFieldProps;

export const TextField = (props: Props) => {
  const {
    value,
    custom,
    size = 'medium',
    inputProps,
    isDisabled,
    isError,
    placeholder,
    format,
    onChange,
    onBlur,
  } = props;

  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const lastValueRef = useRef('');
  const debounceRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef(format);

  const add = custom?.add;
  const debounce = custom?.debounce || 0;
  const prefix = custom?.prefix;
  const Prefix = prefix ? (
    isValidElement(prefix) ? (
      prefix
    ) : (
      <StyledPrefix size={size}>{prefix}</StyledPrefix>
    )
  ) : undefined;
  const suffix = custom?.suffix;
  const Suffix = suffix ? (
    isValidElement(suffix) ? (
      suffix
    ) : (
      <StyledPrefix size={size}>{suffix}</StyledPrefix>
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
    onBlur?.(e.target.value);
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
      <StyledOutline customSize={size} hasAdd={!!add} disabled={isDisabled} isError={isError}>
        {Prefix}
        <StyledInput
          ref={inputRef}
          {...inputProps}
          title={value}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {Suffix}
        <StyledIcon
          as={MDSIcon.CloseDelete}
          variant="border"
          size={16}
          onClick={handleDelete}
          className={isShowDelete ? 'show' : undefined}
        />
      </StyledOutline>
      {add && (
        <AddButton
          label={add.label}
          size={size}
          isDisabled={isDisabled || !value}
          isError={isError}
          onClick={() => add.onSubmit(value)}
        />
      )}
    </StyledLabel>
  );
};
