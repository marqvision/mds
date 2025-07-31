import { Fragment } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { MDSButton } from '../Button';
import { SegmentedButtonProps, SegmentedButtonVariant } from './@types';

const SIZE_TO_HEIGHT_MAP: Record<NonNullable<SegmentedButtonProps<string | number>['size']>, number> = {
  small: 24,
  medium: 28,
  large: 32,
};

type SegmentedButtonWrapperProps = {
  variant: SegmentedButtonVariant;
  fixedWidth?: string;
  height: number;
};

type StyledMDSButtonProps = {
  isSelected?: boolean;
  segmentVariant?: SegmentedButtonVariant;
  height: number;
};

const SegmentedButtonWrapper = styled.div<SegmentedButtonWrapperProps>`
  display: flex;
  border-radius: 8px;
  height: ${({ height: tintHeight }) => `${tintHeight}px`};
  min-height: ${({ height: tintHeight }) => `${tintHeight}px`};
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

  &.border {
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
    segmentVariant === 'border' &&
    `
    outline: 1px solid ${isSelected ? theme.color.border.primary.default.normal : 'transparent'};
    border: none;
  `}

  ${({ isSelected, segmentVariant }) =>
    segmentVariant === 'border' &&
    !isSelected &&
    `
      outline: none;
    `}

  ${({ segmentVariant, height: tintHeight }) =>
    segmentVariant === 'border' &&
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
    variant: isSelected ? 'tint' : 'fill',
  } as const;
};

const getIcon = (isSelected: boolean, icon?: React.ReactElement, selectedIcon?: React.ReactElement) => {
  if (isSelected) {
    // 개별 아이템의 selectedIcon이 있으면 우선 사용, 없으면 전체 selectedIcon 사용
    return selectedIcon || icon;
  }

  return icon;
};

export const MDSSegmentedButton = <T extends string | number>(props: SegmentedButtonProps<T>) => {
  const { list: buttonGroupList, value, variant, type, fixedWidth, onChange, size = 'medium', selectedIcon } = props;

  const height = SIZE_TO_HEIGHT_MAP[size] || SIZE_TO_HEIGHT_MAP.medium;

  return (
    <SegmentedButtonWrapper className={clsx(variant, type)} variant={variant} fixedWidth={fixedWidth} height={height}>
      {buttonGroupList.map(({ label, value: itemValue, icon }) => {
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
              height={height}
            >
              {label}
            </StyledMDSButton>
          </Fragment>
        );
      })}
    </SegmentedButtonWrapper>
  );
};
