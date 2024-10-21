import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { CommonProps, Size, TextFiledProps } from '../@types';
import { MDSIcon } from '../../Icon';
import { AddButton } from './AddButton';
import { StyledBaseLabel, StyledOutline } from './@styled';

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
`;

const StyledIcon = styled(MDSIcon.CloseDelete)``;

type Props = CommonProps & TextFiledProps;

export const TextField = (props: Props) => {
  const { value, custom, size = 'medium', inputProps, isDisabled, isError, placeholder, onChange, onBlur } = props;

  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

  const lastValueRef = useRef('');
  const debounceRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);

  const add = custom?.add;
  const debounce = custom?.debounce || 0;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
  };

  useEffect(() => {
    const input = inputRef.current;

    if (input && !isDebouncing) {
      if (value !== lastValueRef.current) {
        input.value = value;
        lastValueRef.current = value;
      }
    }
  }, [value, isDebouncing]);

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline customSize={size} hasAdd={!!add} disabled={isDisabled} isError={isError}>
        <StyledInput
          ref={inputRef}
          {...inputProps}
          title={value}
          disabled={isDisabled}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {!!value && <StyledIcon variant="border" size={16} onClick={handleDelete} />}
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
