import { cloneElement, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MDSPopover } from '../Popover';
import { MDSTypography } from '../Typography';
import { MDSCheckbox } from '../Checkbox';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { MDSIcon } from '../Icon';
import { MDSThemeValue } from '../../foundation';
import { Item } from './@components/Item';
import { useDropdown, useInitDropdown } from './@hooks';
import {
  BottomButtonModule,
  DropdownItem,
  InferType,
  InfiniteModule,
  Props,
  SearchModule,
  SelectedType,
  SortModule,
  SortType,
  ValueType,
} from './@types';
import { FilterChip } from './@components/FilterChip';
import { Search } from './@components/Search';
import { DEFAULT_DEBOUNCE_TIMING, DEFAULT_MIN_SEARCH_LETTERS } from './@constants';

export type MDSDropdownItem<T> = DropdownItem<T>;

const StyledWrap = styled.div``;

const StyledSticky = styled.div`
  position: sticky;
  top: 0;
  padding: 8px;
  box-shadow:
    0 1px 8px 0 #0000001f,
    0 1px 2px 0 #0000000a;
  border-bottom: 1px solid ${({ theme }) => theme._raw_color.bluegray100};
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledStickyBottom = styled.button<{ isDisabled?: boolean }>`
  position: sticky;
  bottom: 0;
  width: 100%;
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

const StyledAction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4px 4px;
`;

const StyledSelectAll = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  padding-right: 4px;
  border-radius: 4px;
  transition: background-color 225ms ease;
  ${({ as, theme }) =>
    as === 'label'
      ? {
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: theme.color.content.inverse.default.hover,
          },
        }
      : undefined}
`;

const StyledSort = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.color.content.inverse.default.hover};
  }
`;

const StyledStickyRightSection = styled.div`
  margin-left: auto;
  flex-shrink: 0;
`;

const Dropdown = <T, SortT>(
  props: Omit<Props<T, SortT>, 'renderAnchor' | 'onChange' | 'indeterminate'> & {
    indeterminate: ValueType<T>[];
    selectedValues: SelectedType<ValueType<T>>[];
    selectableValues: SelectedType<ValueType<T>>[];
    onChange: (value: SelectedType<ValueType<T>>[], isSelected: boolean) => void;
    onClose: () => void;
    onMount: () => void;
  }
) => {
  const {
    value,
    list: _list,
    modules,
    selectedValues,
    selectableValues,
    indeterminate,
    isFoldAll,
    onChange,
    onClose,
    onMount,
  } = props;

  const stickyBottom = modules?.find((v) => typeof v === 'object' && v.type === 'bottom-button') as
    | BottomButtonModule<T>
    | undefined;

  const {
    search,
    sort,
    filteredList: list,
    searchedValues,
    handler,
  } = useDropdown<T>({
    value,
    list: _list,
    hasSort: modules?.includes('sort'),
    hasCustomSearch: modules?.some((v) => typeof v === 'object' && v.type === 'search'),
    stickyItem:
      stickyBottom?.value !== undefined
        ? {
            label: stickyBottom.label,
            value: stickyBottom.value,
          }
        : undefined,
  });

  const infiniteRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number>();

  const isMultiple = Array.isArray(value);
  const isSelectedAll =
    isMultiple && (selectableValues.length === selectedValues.length || selectedValues[0]?.value === -1)
      ? true
      : selectedValues.length
        ? 'indeterminate'
        : false;
  const hasSearch = modules?.some((v) => v === 'search' || (typeof v === 'object' && v.type === 'search'));
  const hasSort = modules?.some((v) => v === 'sort' || (typeof v === 'object' && v.type === 'sort'));
  const is1DepthSingle = modules?.some((v) => v === '1-depth-single');

  const customSearch = modules?.find((v) => typeof v === 'object' && v.type === 'search') as SearchModule | undefined;
  const customSort = modules?.find((v) => typeof v === 'object' && v.type === 'sort') as SortModule<SortT>;
  const infinite = modules?.find((v) => typeof v === 'object' && v.type === 'infinite') as InfiniteModule | undefined;
  const isEmpty = list.length === 0 && !infinite?.isLoading;

  const hideSelectAllAndCount = modules?.some((v) => v === 'hide-select-all');
  const hideSelectAll = is1DepthSingle || !!infinite?.hideSelectAll;

  const isShowStickyHeader = hasSearch || ((hasSort || isMultiple) && !hideSelectAllAndCount);

  const allCount = (infinite?.total || selectableValues.length).toLocaleString();
  const searchedCount = infinite?.total || searchedValues.length;
  const isInfiniteAll = selectedValues.length === 1 && selectedValues[0].value === -1;
  const selectedCount = (isInfiniteAll ? allCount : selectedValues.length).toLocaleString();

  const isSearchTooShort =
    !!customSearch &&
    search.trim().length !== 0 &&
    search.trim().length < (customSearch.minLength || DEFAULT_MIN_SEARCH_LETTERS);

  const sortEle = customSort ? (
    <MDSDropdown<SortT>
      value={customSort.value}
      list={customSort.list as DropdownItem<ValueType<SortT>>[]}
      onChange={customSort.onChange as (value: SetStateAction<InferType<SortT>>) => void}
      renderAnchor={() => (
        <StyledSort>
          <MDSIcon.Sort size={24} />
        </StyledSort>
      )}
    />
  ) : (
    <MDSDropdown<SortType>
      value={sort}
      list={[
        { label: 'A-Z', value: 'asc' },
        { label: 'Z-A', value: 'desc' },
      ]}
      onChange={handler.sort}
      renderAnchor={() => (
        <StyledSort>
          <MDSIcon.Sort size={24} />
        </StyledSort>
      )}
    />
  );

  const stickyBottomIcon = stickyBottom?.icon
    ? cloneElement(stickyBottom.icon, {
        size: 16,
        color: stickyBottom.isDisabled
          ? 'color/content/primary/default/disabled'
          : 'color/content/primary/default/normal',
        style: { flexShrink: 0 },
      })
    : undefined;

  const stickyBottomRightSection = stickyBottom?.rightSection
    ? cloneElement(stickyBottom.rightSection, {
        onClick: (event: MouseEvent) => {
          event.stopPropagation();
          stickyBottom.rightSection?.props.onClick?.();
          if (!stickyBottom?.preventClose) {
            onClose();
          }
        },
      })
    : undefined;

  const handleChangeSearch = (s: string) => {
    if (customSearch) {
      const minLength = customSearch.minLength || DEFAULT_MIN_SEARCH_LETTERS;
      const trimmedLength = s.trim().length;
      if (trimmedLength >= minLength || trimmedLength === 0) {
        if (debounceRef.current) {
          clearTimeout(debounceRef.current);
        }
        debounceRef.current = window.setTimeout(() => {
          customSearch.onChange?.(s);
          debounceRef.current = undefined;
        }, customSearch.debounce || DEFAULT_DEBOUNCE_TIMING);
      }
    }
    handler.search(s);
  };

  const handleClickStickyBottom = () => {
    if (stickyBottom?.isDisabled) {
      return;
    }
    stickyBottom?.onClick?.();
    if (!stickyBottom?.preventClose) {
      onClose();
    }
  };

  const handleSelectAll = () => {
    if (infinite) {
      onChange(
        [
          {
            label: 'All',
            value: -1 as ValueType<T>,
          },
        ],
        !isSelectedAll
      );
    } else if (isSelectedAll) {
      onChange(selectableValues, !isSelectedAll);
    } else {
      onChange(searchedValues, !isSelectedAll);
    }
  };

  useEffect(() => {
    return () => {
      handler.search('');
    };
    // intentional missing dependencies
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((v) => v.isIntersecting)) {
        if (infinite && !infinite.isLoading && infinite.hasNextPage) {
          infinite.onScrollBottom();
        }
      }
    });

    if (infiniteRef.current) {
      observer.observe(infiniteRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [infinite]);

  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <StyledWrap>
      {isShowStickyHeader && (
        <StyledSticky>
          {hasSearch && (
            <Search
              placeholder={customSearch?.placeholder}
              prefix={customSearch?.prefix}
              onChange={handleChangeSearch}
            />
          )}
          {(isMultiple || hasSort) && !hideSelectAllAndCount && (
            <StyledAction>
              <StyledSelectAll as={!hideSelectAll && isMultiple ? 'label' : 'div'}>
                {!hideSelectAll && isMultiple && <MDSCheckbox value={isSelectedAll} onChange={handleSelectAll} />}
                <MDSTypography variant="T14" weight="medium">
                  {isMultiple && selectedValues.length > 0
                    ? `Selected (${selectedCount})`
                    : search
                      ? `Searched (${searchedCount})`
                      : `All (${allCount})`}
                </MDSTypography>
              </StyledSelectAll>
              {hasSort && sortEle}
            </StyledAction>
          )}
        </StyledSticky>
      )}
      {isEmpty && (
        <MDSTypography
          variant="T14"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          No list
        </MDSTypography>
      )}
      {isSearchTooShort && (
        <MDSTypography
          variant="T14"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          Search more than {customSearch?.minLength || DEFAULT_MIN_SEARCH_LETTERS} letters
        </MDSTypography>
      )}
      {!isSearchTooShort &&
        list.map((v, index) => (
          <Item<ValueType<T>>
            key={`dropItem_0_${v.value ?? `${v.label}_${index}`}`}
            parentIndex={`${index}`}
            item={v}
            indeterminate={indeterminate}
            search={search}
            isMultiple={isMultiple}
            selectedValue={selectedValues}
            is1DepthSingle={is1DepthSingle}
            isInfiniteAll={isInfiniteAll}
            isDefaultFold={isFoldAll || false}
            onChange={onChange}
            onClose={onClose}
          />
        ))}
      {infinite && (
        <>
          {infinite.isLoading && !isSearchTooShort && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
              <MDSLoadingIndicator size={24} strokeWidth={2} />
            </div>
          )}
          <div ref={infiniteRef} style={{ height: '1px' }} />
        </>
      )}
      {stickyBottom && (
        <>
          {stickyBottom.onClick ? (
            <StyledStickyBottom isDisabled={stickyBottom.isDisabled} onClick={handleClickStickyBottom}>
              {stickyBottomIcon}
              <MDSTypography
                variant="T14"
                weight="medium"
                color={
                  stickyBottom.isDisabled
                    ? 'color/content/primary/default/disabled'
                    : 'color/content/primary/default/normal'
                }
                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
              >
                {stickyBottom.label}
              </MDSTypography>
              {stickyBottomRightSection && (
                <StyledStickyRightSection>{stickyBottomRightSection}</StyledStickyRightSection>
              )}
            </StyledStickyBottom>
          ) : (
            <Item<ValueType<T>>
              item={{
                label: stickyBottom.label,
                value: stickyBottom.value,
                rightSection: stickyBottom.rightSection,
                isDisabled: stickyBottom.isDisabled,
                icon: stickyBottom.icon,
              }}
              indeterminate={indeterminate}
              search={search}
              isMultiple={isMultiple}
              selectedValue={selectedValues}
              is1DepthSingle={is1DepthSingle}
              isInfiniteAll={isInfiniteAll}
              isDefaultFold={isFoldAll || false}
              onChange={onChange}
              onClose={onClose}
              style={{ position: 'sticky', bottom: 0, borderTop: `1px solid ${MDSThemeValue._raw_color.bluegray150}` }}
            />
          )}
        </>
      )}
    </StyledWrap>
  );
};

export const MDSDropdown = <T = unknown, SortT = unknown>(props: Props<T, SortT>) => {
  const { renderAnchor, width, ...restProps } = props;

  const { value, list, isLoading, isDisabled } = restProps;

  const closeRef = useRef<() => void>();

  const { selectedValues, selectableValue, indeterminate, labels, returnObj, handler } = useInitDropdown<T, SortT>({
    ...restProps,
    closeRef,
  });

  const [fitWidth, setFitWidth] = useState<number>();

  const ref = useRef<EventTarget & Element>(null);

  const anchor = renderAnchor ? (
    renderAnchor(value, returnObj, list)
  ) : (
    <FilterChip
      label={props.label || ''}
      selectedLabel={labels}
      isLoading={isLoading}
      isDisabled={isDisabled || selectableValue.length === 0}
    />
  );

  const handleResize = useCallback(() => {
    if (width === 'fit-anchor' && ref.current) {
      setFitWidth(ref.current.clientWidth);
    } else {
      setFitWidth(undefined);
    }
  }, [width]);

  return (
    <MDSPopover
      isLoading={isLoading}
      hasDim={false}
      padding={0}
      forwardRef={ref}
      anchor={anchor}
      width={fitWidth || width || 'auto'}
      onClose={handler.close}
      style={props.style}
    >
      {({ close, isOpen }) => {
        closeRef.current = isOpen ? close : undefined;
        return (
          <Dropdown<T, SortT>
            {...restProps}
            selectedValues={selectedValues}
            indeterminate={indeterminate}
            selectableValues={selectableValue}
            onChange={(v: SelectedType<ValueType<T>>[], isSelected, forceClose?: boolean) =>
              handler.change(v, isSelected, close, forceClose)
            }
            onClose={close}
            onMount={handleResize}
          />
        );
      }}
    </MDSPopover>
  );
};

export * from './@types';
