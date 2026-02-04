import { isValidElement } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { THEME } from './@constants';
import { InternalTabProps, PublicCardItemProps } from './@type';

const Styled = {
  Root: styled.button`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2px;
    border: 1px solid ${({ theme }) => theme.color.border.neutral.default.normal};
    padding: 8px 12px;
    border-radius: 8px;
    align-self: center;
    margin: 11px 8px 11px 0;
    background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.normal};
    cursor: pointer;
    text-align: left;
    flex-shrink: 1;
    transition: border-color ${THEME.transitionTiming} ease;
    height: stretch;
    &.selected {
      border-color: ${({ theme }) => theme.color.border.primary.default.normal};
    }
    &.disabled {
      opacity: 0.5;
      cursor: default;
    }
    &:hover:not(.disabled) {
      background-color: ${({ theme }) => theme.color.bg.surface.neutral.default.hover};
    }
  `,
  Description: styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    white-space: nowrap;
  `,
};

type Props<T> = PublicCardItemProps<T> & InternalTabProps;

export const CardItem = <T,>(props: Props<T>) => {
  const { value, onClick, tags, title, description, style, isDisabled, ...internalProps } = props;
  const { isSelected } = internalProps;

  const className = isSelected ? 'selected' : isDisabled ? 'disabled' : undefined;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDisabled) return;
    onClick?.(e, value);
  };

  return (
    <Styled.Root className={className} onClick={handleClick} style={style} disabled={isDisabled}>
      <MDSTypography
        whiteSpace="nowrap"
        weight="medium"
        color={isSelected ? 'color/content/primary/default/normal' : undefined}
      >
        {title}
      </MDSTypography>
      <Styled.Description>
        {description && (
          <>
            {isValidElement(description) ? (
              description
            ) : (
              <MDSTypography whiteSpace="nowrap" size="s" color="color/content/neutral/secondary/normal">
                {description}
              </MDSTypography>
            )}
          </>
        )}
        {tags}
      </Styled.Description>
    </Styled.Root>
  );
};

CardItem.displayName = 'MDSTabsCardItem';
