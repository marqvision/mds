import { Fragment } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { MDSButton } from '../Button';
import { SegmentedButtonProps, SegmentedButtonVariant } from './@types';

const SIZE_TO_HEIGHT_MAP: Record<NonNullable<SegmentedButtonProps<any>['size']>, number> = {
  small: 24,
  medium: 28,
  large: 32,
};

type SegmentedButtonWrapperProps = {
  variant: SegmentedButtonVariant;
  fixedWidth?: string;
  tintHeight?: number;
};

type StyledMDSButtonProps = {
  isSelected?: boolean;
  segmentVariant?: SegmentedButtonVariant;
  tintHeight?: number;
};

const SegmentedButtonWrapper = styled.div<SegmentedButtonWrapperProps>`
  display: flex;
  border-radius: 8px;
  height: ${({ variant, tintHeight }) => (variant === 'tint' && tintHeight ? `${tintHeight}px` : 'auto')};
  min-height: ${({ variant, tintHeight }) => (variant === 'tint' && tintHeight ? `${tintHeight}px` : 'auto')};
  width: ${({ fixedWidth }) => fixedWidth || 'auto'};

  &.hug {
    width: fit-content;
  }

  &.fit {
    justify-content: space-evenly;

    & > button {
      width: 100%;
    }
  }

  &.fixed {
    & > button {
      width: 100%;
    }
  }

  &.tint {
    background-color: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
    border: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
    gap: 1px;
  }

  &.fill {
    background-color: ${({ theme }) => theme.color.bg.fill.neutral.tint.normal};
    border: none;
  }
`;

const StyledMDSButton = styled(MDSButton)<StyledMDSButtonProps>`
  cursor: pointer;
  user-select: none;

  &:hover {
    transition: background-color 150ms ease-in-out;
  }

  ${({ theme, isSelected, segmentVariant }) =>
    segmentVariant === 'tint' &&
    `
    outline: 1px solid ${isSelected ? theme.color.border.primary.default.normal : 'transparent'};
    border: none;
  `}

  ${({ isSelected, segmentVariant }) =>
    segmentVariant === 'tint' &&
    !isSelected &&
    `
      outline: none;
    `}

  ${({ tintHeight }) =>
    tintHeight &&
    `
      height: ${tintHeight - 2}px;
      min-height: ${tintHeight - 2}px;
    `}
`;

const getButtonProps = (variant: SegmentedButtonVariant, isSelected: boolean) => {
  if (variant === 'fill') {
    return {
      color: isSelected ? 'blue' : 'bluegray',
      variant: isSelected ? 'fill' : 'tint',
    } as const;
  }

  return {
    color: isSelected ? 'blue' : 'white',
    variant: isSelected ? 'border' : 'fill',
  } as const;
};

const getIcon = (isSelected: boolean, icon?: React.ReactElement, selectedIcon?: React.ReactElement) => {
  if (isSelected && selectedIcon) return selectedIcon;
  if (!isSelected && icon) return icon;
  return undefined;
};

export const MDSSegmentedButton = <T extends string | number>(props: SegmentedButtonProps<T>) => {
  const { buttonGroupList, value, variant, type, fixedWidth, onChange, size = 'medium' } = props;

  const tintHeight = SIZE_TO_HEIGHT_MAP[size] || SIZE_TO_HEIGHT_MAP.medium;

  return (
    <SegmentedButtonWrapper
      className={clsx(variant, type)}
      variant={variant}
      fixedWidth={fixedWidth}
      tintHeight={variant === 'tint' ? tintHeight : undefined}
    >
      {buttonGroupList.map(({ label, value: itemValue, icon, selectedIcon }) => {
        const isSelected = value === itemValue;
        const buttonProps = getButtonProps(variant, isSelected);
        const iconElement = getIcon(isSelected, icon, selectedIcon);

        return (
          <Fragment key={`segmented-button-${itemValue}`}>
            <StyledMDSButton
              size={size}
              {...buttonProps}
              startIcon={iconElement}
              onClick={() => onChange(itemValue)}
              isSelected={isSelected}
              segmentVariant={variant}
              tintHeight={tintHeight}
            >
              {label}
            </StyledMDSButton>
          </Fragment>
        );
      })}
    </SegmentedButtonWrapper>
  );
};
