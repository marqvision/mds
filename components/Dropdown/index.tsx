import { cloneElement, SetStateAction, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { MDSPopover } from '../Popover';
import { MDSTypography } from '../Typography';
import { MDSCheckbox } from '../Checkbox';
import { MDSIcon } from '../Icon';
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

const StyledWrap = styled.div``;

const StyledSticky = styled.div`
  position: sticky;
  top: 0;
  padding: 8px;
  box-shadow: 0 1px 8px 0 #0000001f, 0 1px 2px 0 #0000000a;
  border-bottom: 1px solid ${({ theme }) => theme._raw_color.bluegray100};
  background-color: white;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const StyledStickyBottom = styled.button`
  position: sticky;
  bottom: 0;
  width: 100%;
  border: none;
  border-top: 1px solid ${({ theme }) => theme._raw_color.bluegray150};
  height: 48px;
  text-align: left;
  padding: 0 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
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

const Dropdown = <T, SortT>({
  value,
  list: _list,
  modules,
  selectedValues,
  selectableValues,
  indeterminate: _indeterminate,
  onChange,
  onClose,
}: Omit<Props<T, SortT>, 'renderAnchor' | 'onChange'> & {
  selectedValues: SelectedType<ValueType<T>>[];
  selectableValues: SelectedType<ValueType<T>>[];
  onChange: (value: SelectedType<ValueType<T>>[], isSelected: boolean) => void;
  onClose: () => void;
}) => {
  const {
    search,
    sort,
    filteredList: list,
    handler,
  } = useDropdown<T>({ value, list: _list, hasSort: modules?.includes('sort') });

  const infiniteRef = useRef<HTMLDivElement>(null);

  const isMultiple = Array.isArray(value);
  const isSelectedAll =
    isMultiple && (selectableValues.length === selectedValues.length || selectedValues[0]?.value === -1)
      ? true
      : selectedValues.length
      ? 'indeterminate'
      : false;
  const isEmpty = list.length === 0;
  const hasSearch = modules?.some((v) => v === 'search' || (typeof v === 'object' && v.type === 'search'));
  const hasSort = modules?.some((v) => v === 'sort' || (typeof v === 'object' && v.type === 'sort'));
  const is1DepthSingle = modules?.some((v) => v === '1-depth-single');
  const hideSelectAll = is1DepthSingle;
  const isShowStickyHeader = hasSearch || hasSort || isMultiple;

  const stickyBottom = modules?.find((v) => typeof v === 'object' && v.type === 'bottom-button') as
    | BottomButtonModule
    | undefined;
  const customSearch = modules?.find((v) => typeof v === 'object' && v.type === 'search') as SearchModule | undefined;
  const customSort = modules?.find((v) => typeof v === 'object' && v.type === 'sort') as SortModule<SortT>;
  const infinite = modules?.find((v) => typeof v === 'object' && v.type === 'infinite') as InfiniteModule | undefined;

  const allCount = (infinite?.total || selectableValues.length).toLocaleString();
  const isInfiniteAll = selectedValues.length === 1 && selectedValues[0].value === -1;
  const selectedCount = (isInfiniteAll ? allCount : selectedValues.length).toLocaleString();

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
        color: 'color/content/primary/default/normal',
      })
    : undefined;

  const indeterminate = (Array.isArray(_indeterminate) ? _indeterminate : [_indeterminate]) as ValueType<T>[];

  const handleChangeSearch = (s: string) => {
    handler.search(s);
    if (customSearch) {
      customSearch.onChange(s);
    }
  };

  const handleClickStickyBottom = () => {
    stickyBottom?.onClick();
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
    } else {
      onChange(selectableValues, !isSelectedAll);
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
        if (infinite && !infinite.isLoading) {
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

  return (
    <StyledWrap>
      {isShowStickyHeader && (
        <StyledSticky>
          {hasSearch && <Search onChange={handleChangeSearch} />}
          {(isMultiple || hasSort) && (
            <StyledAction>
              <StyledSelectAll as={!hideSelectAll && isMultiple ? 'label' : 'div'}>
                {!hideSelectAll && isMultiple && <MDSCheckbox value={isSelectedAll} onChange={handleSelectAll} />}
                <MDSTypography variant="T14" weight="medium">
                  {isMultiple && selectedValues.length > 0 ? `Selected (${selectedCount})` : `All (${allCount})`}
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
      {list.map((v) => (
        <Item<ValueType<T>>
          key={`dropItem_0_${v.value !== undefined ? v.value : v.label}`}
          item={v}
          indeterminate={indeterminate}
          search={search}
          isMultiple={isMultiple}
          selectedValue={selectedValues}
          is1DepthSingle={is1DepthSingle}
          isInfiniteAll={isInfiniteAll}
          onChange={onChange}
          onClose={onClose}
        />
      ))}
      {infinite && (
        <>
          {infinite.isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
              <MDSIcon.IndicatorCircle size={24} />
            </div>
          )}
          <div ref={infiniteRef} style={{ height: '1px' }} />
        </>
      )}
      {stickyBottom && (
        <StyledStickyBottom onClick={handleClickStickyBottom}>
          {stickyBottomIcon}
          <MDSTypography variant="T14" weight="medium" color="color/content/primary/default/normal">
            {stickyBottom.label}
          </MDSTypography>
        </StyledStickyBottom>
      )}
    </StyledWrap>
  );
};

export const MDSDropdown = <T = unknown, SortT = unknown>(props: Props<T, SortT>) => {
  const { renderAnchor, width, ...restProps } = props;

  const { value, list, isLoading } = restProps;

  const { selectedValues, selectableValue, labels, returnObj, handler } = useInitDropdown<T, SortT>(restProps);

  return (
    <MDSPopover
      isLoading={isLoading}
      hasDim={false}
      padding={0}
      anchor={
        renderAnchor ? (
          renderAnchor(value, returnObj, list)
        ) : (
          <FilterChip label={props.label || ''} selectedLabel={labels} />
        )
      }
      width={width || 'auto'}
      onClose={handler.close}
    >
      {({ close }) => (
        <Dropdown<T, SortT>
          {...restProps}
          selectedValues={selectedValues}
          selectableValues={selectableValue}
          onChange={(v: SelectedType<ValueType<T>>[], isSelected, forceClose?: boolean) =>
            handler.change(v, isSelected, close, forceClose)
          }
          onClose={close}
        />
      )}
    </MDSPopover>
  );
};
