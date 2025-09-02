import React from 'react';

export type Props = {
  value: boolean;
  size?: 'small' | 'medium';
  onChange: (checked: boolean) => void;
  isDisabled?: boolean;
  label?: React.ReactNode;
};

export type StyledToggleProps = {
  size: 'small' | 'medium';
  value: boolean;
  isDisabled: boolean;
};

export type WrapperProps = {
  isClickable: boolean;
  hasLabel: boolean;
  size?: 'small' | 'medium';
};

export type ToggleTrackProps = StyledToggleProps & {
  isHovered: boolean;
};

export type IconWrapperProps = {
  isVisible: boolean;
};
