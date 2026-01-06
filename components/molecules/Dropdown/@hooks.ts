import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DropdownItem, InferType, Props, SortType, StickyBottomItemType, ValueType } from './@types';
import { flattenDropdown, getFilteredList, getItemFromList, getValueFromList } from './@utils';

export const useDropdown = <T>({
  list,
  hasSort,
  hasCustomSearch,
  stickyItem,
}: Pick<Props<T>, 'value' | 'list'> & {
  hasSort?: boolean;
  hasCustomSearch?: boolean;
  stickyItem?: DropdownItem<ValueType<T>>;
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType>('asc');

  const filteredList = useMemo(
    () => getFilteredList(list, hasCustomSearch ? '' : search, hasSort ? sort : undefined),
    [hasCustomSearch, search, list, sort]
  );

  return {
    search,
    sort,
    filteredList,
    searchedValues: [...getValueFromList(filteredList), ...(stickyItem ? [stickyItem] : [])] as DropdownItem<
      ValueType<T>
    >[],
    handler: {
      search: setSearch,
      sort: setSort,
    },
  };
};

export const useInitDropdown = <T, SortT>(
  props: Omit<Props<T, SortT>, 'renderAnchor' | 'width'> & { closeRef: MutableRefObject<(() => void) | undefined> }
) => {
  const { value, list, indeterminate: _indeterminate, onSelect, closeRef } = props;

  const [isCustomSearching, setIsCustomSearching] = useState(false);
  const [indeterminate, setIndeterminate] = useState<ValueType<T>[]>([]);

  const lastValueRef = useRef<T | undefined>(value as T);
  const storedItemsRef = useRef<DropdownItem<ValueType<T>>[]>([]);

  const isMultiple = Array.isArray(value);
  const stickyItem = props.modules?.find(
    (v) => typeof v === 'object' && v.type === 'sticky-bottom' && !v.element && v.value !== undefined
  ) as StickyBottomItemType<T> | undefined;

  const flatItems: DropdownItem<ValueType<T>>[] = useMemo(
    () => [
      ...flattenDropdown(list),
      ...(stickyItem
        ? [
            {
              label: stickyItem.label,
              value: stickyItem.value,
            },
          ]
        : []),
    ],
    [stickyItem, list]
  );

  const values = (isMultiple ? value : value !== undefined ? [value] : []) as ValueType<T>[];

  const [selectedItems, setSelectedItems] = useState<DropdownItem<ValueType<T>>[]>(
    values.map((v) => getItemFromList(v, flatItems))
  );

  const selectableValue = (() => {
    const arr = [...flatItems].filter((item) => !item.isDisabled);

    storedItemsRef.current.forEach((v) => {
      if (!arr.some((v2) => v2.value === v.value) && !v.isDisabled) {
        arr.push(v);
      }
    });

    return arr;
  })();

  const hasList = list.length > 0;
  const is1DepthSingle = props.modules?.includes('1-depth-single');

  const anchorValues = (() => {
    const isAllSelected =
      isMultiple &&
      !isCustomSearching &&
      value.length !== 0 &&
      (value.length === flatItems.length || (value.length === 1 && value[0] === -1));

    if (isAllSelected) {
      return [
        {
          value: -1,
          label: 'All',
        },
      ];
    }

    /*
      in single selection case,
      null is selectable, but it is not displayed as selected in filter button
     */
    if (!isMultiple && value === null) {
      return [];
    }

    return values.flatMap((v) => storedItemsRef.current.find((v1) => v1.value === v) || { label: `${v}`, value: v });
  })();

  const handleClose = () => {
    if (isMultiple) {
      const newValue = selectedItems.flatMap((v) => v.value);
      const isNotChanged = newValue.length === values.length && newValue.every((v) => values.includes(v));

      if (isNotChanged) {
        return;
      }

      props.onChange?.(newValue as InferType<T>, indeterminate as InferType<T>);
      lastValueRef.current = newValue as T;
    }
  };

  const handleChange = (
    newSelectItems: DropdownItem<ValueType<T>>[],
    isSelected: boolean,
    close: () => void,
    forceSingle?: boolean
  ) => {
    const newValues: ValueType<T>[] = newSelectItems.flatMap((v) => v.value);
    storeValues(newValues);

    if (onSelect) {
      const adaptedValue = onSelect(
        newValues,
        selectedItems.flatMap((v) => v.value),
        isSelected
      )
        .map((v) => flatItems.find((v2) => v2.value === v) || selectedItems.find((v2) => v2.value === v))
        .filter((item): item is DropdownItem<ValueType<T>> => !!item);

      setSelectedItems(adaptedValue);
      return;
    }

    if (isMultiple && newSelectItems.length === 1 && newSelectItems[0].value === -1) {
      // infinite all
      if (isSelected) {
        setSelectedItems([
          {
            label: 'All',
            value: -1 as ValueType<T>,
          },
        ]);
      } else {
        setSelectedItems([]);
      }
      setIndeterminate([]);
    } else if (!isMultiple || forceSingle) {
      // single select
      setSelectedItems(newSelectItems);
      close();
      if (forceSingle) {
        props.onChange?.(newSelectItems.map((v) => v.value) as InferType<T>);
        lastValueRef.current = newSelectItems.map((v) => v.value) as T;
      } else {
        props.onChange?.(newSelectItems[0].value as InferType<T>);
        lastValueRef.current = newSelectItems[0].value as T;
      }
    } else {
      // multi select
      if (isSelected) {
        setSelectedItems((ps) => {
          if (is1DepthSingle) {
            return newSelectItems;
          }
          const newArr = [...ps];

          newSelectItems.forEach((newValue) => {
            if (ps.every((prevValue) => prevValue.value !== newValue.value)) {
              newArr.push(newValue);
            }
          });
          return newArr;
        });
      } else {
        const isInfiniteAll = selectedItems[0]?.value === -1;
        if (isInfiniteAll) {
          setSelectedItems(flatItems.filter((v) => !newSelectItems.some((v2) => v2.value === v.value)));
        }
        setSelectedItems((ps) => ps.filter((v) => !newSelectItems.some((v2) => v2.value === v.value)));
      }
      setIndeterminate((ps) => ps.filter((v) => !newSelectItems.some((v2) => v2.value === v)));
    }
  };

  const handleClear = () => {
    if (onSelect) {
      const adaptedValue = onSelect(
        selectedItems.flatMap((v) => v.value),
        selectedItems.flatMap((v) => v.value),
        false
      )
        .map((v) => flatItems.find((v2) => v2.value === v) || selectedItems.find((v2) => v2.value === v))
        .filter((item): item is DropdownItem<ValueType<T>> => !!item);
      setSelectedItems(adaptedValue);
    } else {
      setSelectedItems([]);
    }
    setIndeterminate([]);
  };

  const storeValues = useCallback(
    (newValues: ValueType<T>[]) => {
      const temp = [...storedItemsRef.current];

      newValues.forEach((v) => {
        const findIndex = temp.findIndex((v2) => v2.value === v);
        if (findIndex < 0) {
          const item = getItemFromList(v, flatItems);
          if (item.value !== undefined) {
            temp.push(item);
          }
        } else {
          if (temp[findIndex].label === `${temp[findIndex].value}`) {
            const item = getItemFromList(v, flatItems);
            if (item.value !== undefined) {
              temp[findIndex] = item;
            }
          }
        }
      });

      storedItemsRef.current = temp;
    },
    [flatItems]
  );

  useEffect(() => {
    if (!hasList) {
      return;
    }

    const values = (isMultiple ? value : value !== undefined ? [value] : []) as ValueType<T>[];
    const lastValue = (
      Array.isArray(lastValueRef.current)
        ? lastValueRef.current
        : lastValueRef.current !== undefined
        ? [lastValueRef.current]
        : []
    ) as ValueType<T>[];

    const isSomeDiff = values.some((v) => !lastValue.includes(v)) || lastValue.some((v) => !values.includes(v));
    const isSomeAdded = lastValue.every((v) => values.includes(v)) && values.length > lastValue.length;

    if (!isSomeDiff) {
      setSelectedItems((ps) =>
        ps.map((v) => (`${v.value}` === `${v.label}` ? getItemFromList(v.value, flatItems) : v))
      );
      return;
    }

    if (isSomeAdded) {
      const addedItems = values.filter((v) => !lastValue.includes(v)).map((v) => getItemFromList(v, flatItems));
      setSelectedItems((ps) => [...ps, ...addedItems]);
    } else {
      setSelectedItems(values.map((v) => getItemFromList(v, flatItems)));
      setTimeout(() => {
        closeRef.current?.();
      }, 0);
    }
    lastValueRef.current = value;
    // intentional missing deps [flatItems]
  }, [JSON.stringify(value), hasList, isMultiple, closeRef]);

  useEffect(() => {
    if (_indeterminate) {
      setIndeterminate((ps) => {
        const indet = (Array.isArray(_indeterminate) ? _indeterminate : [_indeterminate]) as ValueType<T>[];
        const isSomeDiff = indet?.some((v) => !(ps || []).includes(v)) || (ps || []).some((v) => !indet.includes(v));

        if (isSomeDiff) {
          return indet;
        }
        return ps;
      });
    } else {
      setIndeterminate([]);
    }
  }, [_indeterminate]);

  useEffect(() => {
    if (value === undefined) {
      return;
    }
    const newValues = (Array.isArray(value) ? value : [value]) as ValueType<T>[];

    storeValues(newValues);
  }, [value, storeValues]);

  return {
    selectedItems,
    selectableValue,
    indeterminate,
    anchorValues,
    handler: {
      change: handleChange,
      clear: handleClear,
      close: handleClose,
      setIsCustomSearching,
    },
  };
};

export type UseDropdownReturn<T> = ReturnType<typeof useDropdown<T>>;
