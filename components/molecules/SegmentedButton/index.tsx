import { Fragment } from 'react';
import styled from '@emotion/styled';
import clsx from 'clsx';
import { MDSButton } from '../Button';
import { SegmentedButtonProps } from './@types';

const SegmentedButtonWrapper = styled.div<{ variant: string; fixedWidth?: string; tintHeight?: number }>`
  display: flex;
  border-radius: 8px;
  gap: 1px;
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

  &.tint {
    background-color: ${({ theme }) => theme.color.bg.fill.neutral.default.normal};
    border: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
  }

  &.fill {
    background-color: ${({ theme }) => theme.color.bg.fill.neutral.tint.normal};
    border: none;
  }
`;

const StyledMDSButton = styled(MDSButton)<{ isSelected?: boolean; segmentVariant?: string; tintHeight?: number }>`
  cursor: pointer;
  user-select: none;

  &:hover {
    transition: background-color 150ms ease-in-out;
  }

  ${({ theme, isSelected, segmentVariant }) =>
    segmentVariant === 'tint' &&
    isSelected &&
    `
      outline: 1px solid ${theme.color.border.primary.default.normal};
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

export const MDSSegmentedButton = <T extends string | number>(props: SegmentedButtonProps<T>) => {
  const { buttonGroupList, selectedValue, variant, type, fixedWidth, onClick, size = 'medium' } = props;

  const tintHeight = size === 'small' ? 24 : size === 'medium' ? 28 : 32;

  return (
    <SegmentedButtonWrapper
      className={clsx(variant, type)}
      variant={variant}
      fixedWidth={fixedWidth}
      tintHeight={variant === 'tint' ? tintHeight : undefined}
    >
      {buttonGroupList.map(({ label, value, Icon, SelectedIcon }) => {
        const isSelected = selectedValue === value;

        return (
          <Fragment key={`Segmented_Button_Selection_${value}`}>
            {variant === 'fill' ? (
              <StyledMDSButton
                size={size}
                color={isSelected ? 'blue' : 'bluegray'}
                variant={isSelected ? 'fill' : 'tint'}
                startIcon={isSelected && SelectedIcon ? SelectedIcon : !isSelected && Icon ? Icon : undefined}
                onClick={() => onClick(value)}
              >
                {label}
              </StyledMDSButton>
            ) : (
              <StyledMDSButton
                size={size}
                color={isSelected ? 'blue' : 'white'}
                variant={isSelected ? 'border' : 'fill'}
                startIcon={isSelected && SelectedIcon ? SelectedIcon : !isSelected && Icon ? Icon : undefined}
                onClick={() => onClick(value)}
                isSelected={isSelected}
                segmentVariant={variant}
                tintHeight={tintHeight}
              >
                {label}
              </StyledMDSButton>
            )}
          </Fragment>
        );
      })}
    </SegmentedButtonWrapper>
  );
};
