import { ChangeEvent, useState } from 'react';
import styled from '@emotion/styled';
import { CommonProps, Size, TextFiledProps } from '../@types';
import { theme } from '../@constants';
import { AddButton } from './AddButton';
import { StyledOutline } from './@styled';

const StyledLabel = styled.label<{ size: Size; isError?: boolean }>`
  border-radius: 4px;
  height: 26px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: ${({ size }) => theme.size[size].height};
  position: relative;
  transition: outline ${theme.transitionTiming} ease;
  width: 100%;
  &:focus-within {
    outline: ${({ isError }) =>
      `3px solid ${isError ? theme.color.border['error-focus-effect'] : theme.color.border['focus-effect']}`};
  }
`;

/* 우측에 버튼이 추가되며 클릭시 value를 리턴함 */
export type Add = {
  type: 'add';
  label?: string;
  onSubmit: (value: string) => void;
};

export type Enter = {
  type: 'enter';
  label?: never;
  onSubmit: (value: string) => void;
};

type Props = CommonProps & TextFiledProps;

export const TextField = (props: Props) => {
  const { value: _value, modules, size = 'medium', inputProps, isDisabled, isError, placeholder, onChange } = props;

  const [value, setValue] = useState<string>(_value);

  const add = modules?.find((module) => module.type === 'add') as Add | undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    // onChange?.(newValue);
  };

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline
        as="input"
        {...inputProps}
        title={value}
        customSize={size}
        hasAdd={!!add}
        value={value}
        disabled={isDisabled}
        isError={isError}
        placeholder={placeholder}
        onChange={handleChange}
      />
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
