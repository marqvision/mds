import { cloneElement } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { SelectedType, StickyBottomElementType, StickyBottomItemType, StickyBottomModule, ValueType } from '../@types';
import { MDSTypography } from '../../../atoms/Typography';
import { Item } from './Item';

const StyledStickyBottom = styled.button<{ isDisabled?: boolean }>`
  border: none;
  border-top: 1px solid ${({ theme }) => theme._raw_color.bluegray150};
  text-align: left;
  padding: 11px 16px 12px;
  min-height: 48px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  background-color: white;
`;

const StyledStickyRightSection = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

type Props<T> = {
  item: StickyBottomModule<T>;
  indeterminate: ValueType<T>[];
  isMultiple: boolean;
  is1DepthSingle?: boolean;
  isInfiniteAll: boolean;
  selectedValue: SelectedType<ValueType<T>>[];
  onChange: (value: SelectedType<ValueType<T>>[], checked: boolean, forceClose?: boolean | undefined) => void;
  onClose: () => void;
};

export const StickyBottom = <T,>({
  item,
  indeterminate,
  isMultiple,
  selectedValue,
  is1DepthSingle,
  isInfiniteAll,
  onChange,
  onClose,
}: Props<T>) => {
  const { _raw_color } = useTheme();

  const { stickyBottomElement, stickyBottomItem } = (() => {
    const stickyBottom = item;

    const stickyBottomElement = (stickyBottom as StickyBottomElementType).element
      ? (stickyBottom as StickyBottomElementType)
      : undefined;
    const stickyBottomItem = !stickyBottomElement ? (stickyBottom as StickyBottomItemType<T>) : undefined;

    return {
      stickyBottomElement,
      stickyBottomItem,
    };
  })();

  const stickyBottomIcon = stickyBottomItem?.icon
    ? cloneElement(stickyBottomItem.icon, {
        size: stickyBottomItem.icon.props.size || 16,
        color: stickyBottomItem.isDisabled
          ? 'color/content/primary/default/disabled'
          : 'color/content/primary/default/normal',
        style: { flexShrink: 0 },
      })
    : undefined;

  const stickyBottomRightSection = stickyBottomItem?.rightSection
    ? cloneElement(stickyBottomItem.rightSection, {
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
          stickyBottomItem.rightSection?.props.onClick?.();
          if (!stickyBottomItem?.preventClose) {
            onClose();
          }
        },
      })
    : undefined;

  const handleClickStickyBottom = () => {
    if (stickyBottomItem?.isDisabled) {
      return;
    }
    stickyBottomItem?.onClick?.();
    if (!stickyBottomItem?.preventClose) {
      onClose();
    }
  };

  return (
    <>
      {stickyBottomItem && (
        <>
          {stickyBottomItem.onClick ? (
            <StyledStickyBottom isDisabled={stickyBottomItem.isDisabled} onClick={handleClickStickyBottom}>
              {stickyBottomIcon}
              <MDSTypography
                variant="body"
                size="m"
                weight="medium"
                color={
                  stickyBottomItem.isDisabled
                    ? 'color/content/primary/default/disabled'
                    : 'color/content/primary/default/normal'
                }
                whiteSpace="pre-wrap"
                wordBreak="break-word"
              >
                {stickyBottomItem.label}
              </MDSTypography>
              {stickyBottomRightSection && (
                <StyledStickyRightSection>{stickyBottomRightSection}</StyledStickyRightSection>
              )}
            </StyledStickyBottom>
          ) : (
            <Item<ValueType<T>>
              item={{
                label: stickyBottomItem.label,
                value: stickyBottomItem.value,
                rightSection: stickyBottomItem.rightSection,
                isDisabled: stickyBottomItem.isDisabled,
                icon: stickyBottomItem.icon,
                style: {
                  position: 'sticky',
                  bottom: 0,
                  borderTop: `1px solid ${_raw_color.bluegray150}`,
                },
              }}
              indeterminate={indeterminate}
              search={''}
              isMultiple={isMultiple}
              selectedValue={selectedValue}
              is1DepthSingle={is1DepthSingle}
              isInfiniteAll={isInfiniteAll}
              onChange={onChange}
              onClose={onClose}
            />
          )}
        </>
      )}
      {stickyBottomElement?.element}
    </>
  );
};
