import { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Provider, useAtom } from 'jotai';
import { MDSTypography } from '../../atoms/Typography';
import { MDSLoadingIndicator } from '../LoadingIndicator';
import { MDSPopover } from '../Popover';
import { foldedItemIndexAtom } from './@atoms';
import { FilterButton } from './@components/FilterButton';
import { Item } from './@components/Item';
import { StickyBottom } from './@components/StickyBottom';
import { DEFAULT_MIN_SEARCH_LETTERS } from './@constants';
import { useDropdown, useInitDropdown } from './@hooks';
import {
  DropdownItem,
  FilterButtonModule,
  InfiniteModule,
  ObjType,
  Props,
  SearchModule,
  StickyBottomModule,
  ValueType,
} from './@types';
import { getAllListIndex } from './@utils';
import { StickyTop } from './@components/StickyTop';

export type MDSDropdownItem<T> = DropdownItem<T>;

const StyledDropdownWrap = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const StyledScrollSection = styled.div`
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
`;

const StyledStickyTrigger = styled.div`
  height: 1px;
  flex: 0 0 1px;
  width: 100%;
  margin-top: -1px;
`;

const Dropdown = <T, SortT>(
  props: Omit<Props<T, SortT>, 'renderAnchor' | 'onChange' | 'indeterminate'> & {
    indeterminate: ValueType<T>[];
    selectedValues: DropdownItem<ValueType<T>>[];
    selectableValues: DropdownItem<ValueType<T>>[];
    onChange: (value: DropdownItem<ValueType<T>>[], isSelected: boolean) => void;
    onClose: () => void;
    onMount: () => void;
    onUnmount: () => void;
    onClear: () => void;
    onSearching: (isSearching: boolean) => void;
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
    isLoading,
    onChange,
    onClear,
    onClose,
    onMount,
    onUnmount,
    onSearching,
  } = props;

  const stickyBottom = modules?.find(
    (v) => typeof v === 'object' && v.type === 'sticky-bottom'
  ) as StickyBottomModule<T>;

  const hasCustomSearch = modules?.some((v) => typeof v === 'object' && v.type === 'search');

  const handlers = useDropdown<T>({
    value,
    list: _list,
    hasSort: modules?.includes('sort'),
    hasCustomSearch,
    stickyItem: (() => {
      if (!stickyBottom || stickyBottom.element || stickyBottom.value === undefined) {
        return undefined;
      }
      return {
        label: stickyBottom.label,
        value: stickyBottom.value,
      };
    })(),
  });

  const { search, filteredList: list, handler } = handlers;

  const [isScrollTop, setIsScrollTop] = useState(false);
  const [needToFocus, setNeedToFocus] = useState(false);
  const [minWidth, setMinWidth] = useState<number>(30);
  const [foldedItemIndex, setFoldedItemIndex] = useAtom(foldedItemIndexAtom);

  const infiniteRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number>();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyTrigger = useRef<HTMLDivElement>(null);

  const is1DepthSingle = modules?.some((v) => v === '1-depth-single');
  const customSearch = modules?.find((v) => typeof v === 'object' && v.type === 'search') as SearchModule | undefined;
  const infinite = modules?.find((v) => typeof v === 'object' && v.type === 'infinite') as InfiniteModule | undefined;

  const isMultiple = Array.isArray(value);

  const isEmpty = list.length === 0 && !infinite?.isLoading && !isLoading;
  const isInfiniteAll = selectedValues.length === 1 && selectedValues[0].value === -1;
  const hasSearchValue = !!search.trim().length;
  const isSearchTooShort =
    !!customSearch && hasSearchValue && search.trim().length < (customSearch.minLength || DEFAULT_MIN_SEARCH_LETTERS);

  const itemProps = {
    indeterminate: indeterminate,
    isMultiple: isMultiple,
    selectedValue: selectedValues,
    is1DepthSingle: is1DepthSingle,
    isInfiniteAll: isInfiniteAll,
    onChange: onChange,
    onClose: onClose,
  };

  const isSomeExpanded = list.every(
    (item, index) => !item.children || (item.children.length > 0 && !foldedItemIndex.includes(`${index}`))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsScrollTop(!entries.some((v) => v.isIntersecting));
      },
      {
        root: wrapperRef.current,
      }
    );

    const sticky = stickyTrigger.current;

    if (sticky) {
      observer.observe(sticky);
    }

    return () => {
      if (sticky) {
        observer.unobserve(sticky);
      }
      handler.search('');
    };
    // intentional missing dependencies
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(([entries]) => {
      const newWidth = entries.contentRect.width || 0;

      if (!props.width && newWidth > (minWidth || 0)) {
        setMinWidth(newWidth);
      }
    });

    const offset = wrapperRef.current;

    if (offset) {
      observer.observe(offset);
    }

    return () => {
      if (offset) {
        observer.unobserve(offset);
      }
    };
  }, [minWidth, props.width]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((v) => v.isIntersecting)) {
        if (
          infinite &&
          !infinite.isLoading &&
          infinite.hasNextPage &&
          !debounceRef.current &&
          !isLoading &&
          !isSearchTooShort &&
          isSomeExpanded
        ) {
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
  }, [infinite, isLoading, isSearchTooShort, isSomeExpanded]);

  useEffect(() => {
    onMount();

    return () => {
      onUnmount();
    };
  }, [onMount, onUnmount]);

  useEffect(() => {
    if (isFoldAll) {
      const { arr, valueIndex } = getAllListIndex(
        list,
        value && !Array.isArray(value) ? (value as ValueType<T>) : undefined
      );
      let allIndex = arr;
      if (typeof isFoldAll === 'number') {
        allIndex = allIndex.filter((v) => v.split('_').length > isFoldAll);
      }
      if (valueIndex !== undefined) {
        allIndex = allIndex.filter((v) => valueIndex.indexOf(v) !== 0);

        setNeedToFocus(true);
      }

      setFoldedItemIndex(allIndex);
    } else if (value !== undefined && !Array.isArray(value)) {
      setNeedToFocus(true);
    }
    // intentionally omitting list, value
  }, [getAllListIndex, isFoldAll, setFoldedItemIndex]);

  useEffect(() => {
    if (hasCustomSearch) {
      onSearching(hasSearchValue);
    }
  }, [hasSearchValue, hasCustomSearch, onSearching]);

  useEffect(() => {
    const el = document.getElementById(`mds-drop-item-${CSS.escape(String(value))}`);
    const scrollSection = wrapperRef.current?.querySelector('.mds-dropdown-scroll');

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          if (el) {
            el.scrollIntoView({ block: 'center', inline: 'center' });
          }
        }
      },
      {
        root: scrollSection || undefined,
      }
    );

    if (needToFocus) {
      if (el) {
        el.scrollIntoView({ block: 'center', inline: 'center' });
        observer.observe(el);
      }
      setTimeout(() => {
        setNeedToFocus(false);
      }, 500);
    }

    return () => {
      observer.disconnect();
    };
  }, [needToFocus]);

  return (
    <StyledDropdownWrap ref={wrapperRef} style={{ minWidth }}>
      <StickyTop<T, SortT>
        isScrollTop={isScrollTop}
        modules={modules}
        selectedValues={selectedValues}
        selectableValues={selectableValues}
        isMultiple={isMultiple}
        isLoading={isLoading}
        debounceRef={debounceRef}
        onClear={onClear}
        onChange={onChange}
        onClose={onClose}
        handlers={handlers}
      />
      {isEmpty && (
        <MDSTypography
          variant="body"
          size="m"
          weight="regular"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          No results
        </MDSTypography>
      )}
      {isSearchTooShort && (
        <MDSTypography
          variant="body"
          size="m"
          weight="regular"
          color="color/content/neutral/default/disabled"
          style={{ height: '48px', padding: '0 12px', display: 'flex', alignItems: 'center' }}
        >
          Search more than {customSearch?.minLength || DEFAULT_MIN_SEARCH_LETTERS} letters
        </MDSTypography>
      )}
      <StyledScrollSection className="mds-dropdown-scroll">
        <StyledStickyTrigger ref={stickyTrigger} />
        {!isSearchTooShort &&
          list.map((v, index) => (
            <Item<ValueType<T>>
              key={`dropItem_0_${v.value ?? `${v.label}_${index}`}`}
              parentIndex={`${index}`}
              item={v}
              search={search}
              {...itemProps}
            />
          ))}
        {(infinite?.isLoading || isLoading) && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '48px' }}>
            <MDSLoadingIndicator size={24} strokeWidth={2} />
          </div>
        )}
        {infinite && <div ref={infiniteRef} style={{ height: '1px' }} />}
      </StyledScrollSection>
      {stickyBottom && <StickyBottom item={stickyBottom} {...itemProps} />}
    </StyledDropdownWrap>
  );
};

export const MDSDropdown = <T = unknown, SortT = unknown>(props: Props<T, SortT>) => {
  const { renderAnchor, width, position, ...restProps } = props;

  const { value, isLoading, isDisabled } = restProps;

  const closeRef = useRef<() => void>();
  const openFnRef = useRef<() => void | undefined>();
  const closeFnRef = useRef<() => void | undefined>();

  const { selectedItems, selectableValue, indeterminate, anchorValues, handler } = useInitDropdown<T, SortT>({
    ...restProps,
    closeRef,
  });

  const [fitWidth, setFitWidth] = useState<number>();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<EventTarget & Element>(null);

  const filterButtonProps = restProps.modules?.find((v) => typeof v === 'object' && v.type === 'filter-button') as
    | FilterButtonModule
    | undefined;

  const anchor = renderAnchor ? (
    renderAnchor(value as T, (Array.isArray(value) ? anchorValues : anchorValues[0]) as ObjType<T>, selectableValue)
  ) : (
    <FilterButton
      label={props.label || ''}
      selectedLabel={anchorValues.flatMap((v) => v.label)}
      isLoading={!isOpen && isLoading}
      isDisabled={isDisabled || selectableValue.length === 0}
      {...filterButtonProps}
    />
  );

  const handleMount = useCallback(() => {
    setIsOpen(true);
    if (width === 'fit-anchor' && ref.current) {
      setFitWidth(ref.current.clientWidth);
    } else {
      setFitWidth(undefined);
    }
    openFnRef.current?.();
  }, [width]);

  const handleUnmount = useCallback(() => {
    setIsOpen(false);
    closeFnRef.current?.();
  }, []);

  useEffect(() => {
    openFnRef.current = props.onOpen;
  }, [props.onOpen]);

  useEffect(() => {
    closeFnRef.current = props.onClose;
  }, [props.onClose]);

  return (
    <MDSPopover
      hasDim={false}
      padding={0}
      forwardRef={ref}
      anchor={anchor}
      width={fitWidth || width || 'auto'}
      onClose={handler.close}
      position={position}
      style={{
        ...props.style,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {({ close, isOpen }) => {
        closeRef.current = isOpen ? close : undefined;
        return (
          <Provider>
            <Dropdown<T, SortT>
              {...restProps}
              width={width}
              selectedValues={selectedItems}
              indeterminate={indeterminate}
              selectableValues={selectableValue}
              onChange={(v: DropdownItem<ValueType<T>>[], isSelected, forceClose?: boolean) =>
                handler.change(v, isSelected, close, forceClose)
              }
              onClear={handler.clear}
              onClose={close}
              onMount={handleMount}
              onUnmount={handleUnmount}
              onSearching={handler.setIsCustomSearching}
            />
          </Provider>
        );
      }}
    </MDSPopover>
  );
};

export * from './@types';
