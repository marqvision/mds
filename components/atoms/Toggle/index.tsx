import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../Icon';
import { MDSTypography } from '../Typography';
import { IconWrapperProps, Props, StyledToggleProps, WrapperProps } from './@types';
import { TOGGLE_CONFIG } from './@constants';
import { resolveToggleTrackColor, resolveToggleTrackHoverColor } from './@utils';

export const MDSToggle = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  const { value, size = 'medium', onChange, isDisabled = false, label, ...restProps } = props;

  const config = TOGGLE_CONFIG[size];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled && onChange) {
      onChange(event.target.checked);
    }
  };

  const stopPropagation = (event: React.MouseEvent<HTMLLabelElement>) => {
    event.stopPropagation();
  };

  const renderLabel = () => {
    if (!label) return null;

    if (typeof label === 'string') {
      return (
        <MDSTypography variant="body" size={config.fontSize}>
          {label}
        </MDSTypography>
      );
    }

    return label;
  };

  return (
    <Wrapper
      ref={ref}
      size={size}
      isClickable={!isDisabled}
      value={value}
      isDisabled={isDisabled}
      onClick={stopPropagation}
    >
      <input type="checkbox" checked={value} disabled={isDisabled} onChange={handleChange} {...restProps} />
      <ToggleTrack size={size} value={value} isDisabled={isDisabled}>
        <ToggleThumb size={size} value={value} isDisabled={isDisabled}>
          <IconWrapper isVisible={value}>
            <MDSIcon.Check color="color/bg/fill/inverse/default/normal" size={config.iconSize} variant="fill" />
          </IconWrapper>
          <IconWrapper isVisible={!value}>
            <MDSIcon.Circle color="color/bg/fill/inverse/default/normal" size={config.iconSize} variant="fill" />
          </IconWrapper>
        </ToggleThumb>
      </ToggleTrack>
      {renderLabel()}
    </Wrapper>
  );
});

const ToggleTrack = styled.div<StyledToggleProps>`
  position: relative;
  width: ${({ size }) => TOGGLE_CONFIG[size].width}px;
  height: ${({ size }) => TOGGLE_CONFIG[size].height}px;
  border-radius: 10px;
  background-color: ${({ value, isDisabled, theme }) => resolveToggleTrackColor(theme, value, isDisabled)};
  transition: background-color 0.15s ease;
`;

const Wrapper = styled.label<WrapperProps>`
  display: inline-flex;
  align-items: center;
  gap: ${({ size }) => (size === 'medium' ? '4px' : '2px')};
  margin: 0;
  padding: 2px;
  cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'default')};

  & input {
    display: none;
  }

  ${({ isClickable, value, isDisabled, theme }) =>
    isClickable &&
    `
    &:hover {
      & ${ToggleTrack} {
        background-color: ${resolveToggleTrackHoverColor(theme, value, isDisabled)};
      }
    }
  `}
`;

const ToggleThumb = styled.div<StyledToggleProps>`
  position: absolute;
  left: ${({ value, size }) => (value ? `${TOGGLE_CONFIG[size].activeLeft}px` : '0px')};
  width: ${({ size }) => TOGGLE_CONFIG[size].thumbSize}px;
  height: ${({ size }) => TOGGLE_CONFIG[size].thumbSize}px;
  border-radius: 50%;
  transition: left 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.37);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrapper = styled.div<IconWrapperProps>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.15s ease;
`;
