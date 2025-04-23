import { useEffect, useMemo, useRef, useState, MutableRefObject } from 'react';
import {
  StickyBottomItemType,
  DropdownItem,
  InferType,
  ObjType,
  Props,
  SelectedType,
  SortType,
  ValueType,
} from './@types';
import { flattenDropdown, getFilteredList, getValueFromList } from './@utils';

export const useDropdown = <T>({
  value,
  list,
  hasSort,
  hasCustomSearch,
  stickyItem,
}: Pick<Props<T>, 'value' | 'list'> & {
  hasSort?: boolean;
  hasCustomSearch?: boolean;
  stickyItem?: SelectedType<ValueType<T>>;
}) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>(hasSort ? 'asc' : undefined);

  const filteredList = useMemo(
    () => getFilteredList(list, hasCustomSearch ? '' : search, sort),
    [hasCustomSearch, search, list, sort]
  );

  useEffect(() => {
    setTimeout(() => {
      if (!Array.isArray(value) && !!value) {
        document.querySelector(`#mds-drop-item-${`${value}`.replaceAll(' ', '\\ ')}`)?.scrollIntoView({
          block: 'center',
        });
      }
    }, 0);
  }, [value]);

  return {
    search,
    sort,
    filteredList,
    searchedValues: [...getValueFromList(filteredList), ...(stickyItem ? [stickyItem] : [])],
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

  const isMultiple = Array.isArray(value);
  const stickyItem = props.modules?.find(
    (v) => typeof v === 'object' && v.type === 'sticky-bottom' && !v.element && v.value !== undefined
  ) as StickyBottomItemType<T> | undefined;

  const flatItems = [
    ...flattenDropdown(list),
    ...(stickyItem
      ? [
          {
            label: stickyItem.label,
            value: stickyItem.value,
          } as DropdownItem<ValueType<T>>,
        ]
      : []),
  ];
  const selectableValue = [
    ...getValueFromList(list),
    ...(stickyItem
      ? [
          {
            label: stickyItem.label,
            value: stickyItem.value,
          } as SelectedType<ValueType<T>>,
        ]
      : []),
  ];

  const [selectedValues, setSelectedValues] = useState<SelectedType<ValueType<T>>[]>(() => {
    if (value !== undefined) {
      return Array.isArray(value)
        ? value.map((v) => ({ label: flatItems.find((item) => item.value === v)?.label || v, value: v }))
        : [{ label: value, value }];
    }

    return [];
  });

  const hasList = list.length > 0;
  const is1DepthSingle = props.modules?.includes('1-depth-single');

  const values = (isMultiple ? value : value ? [value] : []) as ValueType<T>[];

  const labels = (() => {
    const isAllSelected =
      isMultiple &&
      !isCustomSearching &&
      value.length !== 0 &&
      (value.length === selectableValue.length || (value.length === 1 && value[0] === -1));

    if (isAllSelected) {
      return ['All'];
    }

    return values.flatMap(
      (v) =>
        selectedValues.find((v1) => v1.value === v)?.label ||
        flatItems.find((v1) => v1.value === v)?.label ||
        (v as string)
    );
  })();

  const selectedItems = (
    Array.isArray(value)
      ? value.map((v) => ({
          label: flatItems.find((item) => item.value === v)?.label || v,
          value: v,
        }))
      : flatItems.find((v) => v.value === value) || { label: value, value }
  ) as ObjType<T>;

  const handleClose = () => {
    if (isMultiple) {
      const newValue = selectedValues.flatMap((v) => v.value);
      const isNotChanged = newValue.length === values.length && newValue.every((v) => values.includes(v));

      if (isNotChanged) {
        return;
      }

      props.onChange?.(newValue as InferType<T>, indeterminate as InferType<T>);
      lastValueRef.current = newValue as T;
    }
  };

  const handleChange = (
    newValues: SelectedType<ValueType<T>>[],
    isSelected: boolean,
    close: () => void,
    forceSingle?: boolean
  ) => {
    if (onSelect) {
      const temp = newValues.flatMap((v) => v.value);
      const adaptedValue = onSelect(
        temp,
        selectedValues.flatMap((v) => v.value),
        isSelected
      ).map(
        (v) =>
          (selectableValue.find((v2) => v2.value === v) || selectedValues.find((v2) => v2.value === v)) as SelectedType<
            ValueType<T>
          >
      );

      setSelectedValues(adaptedValue);
      return;
    }

    if (isMultiple && newValues.length === 1 && newValues[0].value === -1) {
      // infinite all
      if (isSelected) {
        setSelectedValues([
          {
            label: 'All',
            value: -1 as ValueType<T>,
          },
        ]);
      } else {
        setSelectedValues([]);
      }
      setIndeterminate([]);
    } else if (!isMultiple || forceSingle) {
      // single select
      setSelectedValues(newValues);
      close();
      if (forceSingle) {
        props.onChange?.(newValues.map((v) => v.value) as InferType<T>);
        lastValueRef.current = newValues.map((v) => v.value) as T;
      } else {
        props.onChange?.(newValues[0].value as InferType<T>);
        lastValueRef.current = newValues[0].value as T;
      }
    } else {
      // multi select
      if (isSelected) {
        setSelectedValues((ps) => {
          if (is1DepthSingle) {
            return newValues;
          }
          const newArr = [...ps];

          newValues.forEach((newValue) => {
            if (ps.every((prevValue) => prevValue.value !== newValue.value)) {
              newArr.push(newValue);
            }
          });
          return newArr;
        });
      } else {
        const isInfiniteAll = selectedValues[0]?.value === -1;
        if (isInfiniteAll) {
          setSelectedValues(selectableValue.filter((v) => !newValues.some((v2) => v2.value === v.value)));
        }
        setSelectedValues((ps) => ps.filter((v) => !newValues.some((v2) => v2.value === v.value)));
      }
      setIndeterminate((ps) => ps.filter((v) => !newValues.some((v2) => v2.value === v)));
    }
  };

  const handleClear = () => {
    if (onSelect) {
      const adaptedValue = onSelect(
        selectedValues.flatMap((v) => v.value),
        selectedValues.flatMap((v) => v.value),
        false
      ).map(
        (v) =>
          (selectableValue.find((v2) => v2.value === v) || selectedValues.find((v2) => v2.value === v)) as SelectedType<
            ValueType<T>
          >
      );
      setSelectedValues(adaptedValue);
    } else {
      setSelectedValues([]);
    }
    setIndeterminate([]);
  };

  useEffect(() => {
    if (!hasList) {
      return;
    }

    const values = (isMultiple ? value : value ? [value] : []) as ValueType<T>[];
    const lastValue = (
      Array.isArray(lastValueRef.current) ? lastValueRef.current : lastValueRef.current ? [lastValueRef.current] : []
    ) as ValueType<T>[];

    const isSomeDiff = values.some((v) => !lastValue.includes(v)) || lastValue.some((v) => !values.includes(v));
    const isSomeAdded = lastValue.every((v) => values.includes(v)) && values.length > lastValue.length;

    if (!isSomeDiff) {
      return;
    }

    if (isSomeAdded) {
      const addedItems = values
        .filter((v) => !lastValue.includes(v))
        .map((v) => ({
          label: flatItems.find((item) => item.value === v)?.label || v,
          value: v,
        })) as SelectedType<ValueType<T>>[];
      setSelectedValues((ps) => [...ps, ...addedItems]);
    } else {
      setSelectedValues(
        values.map((v) => ({
          label: flatItems.find((item) => item.value === v)?.label || v,
          value: v,
        })) as SelectedType<ValueType<T>>[]
      );
      setTimeout(() => {
        closeRef.current?.();
      }, 0);
    }
    lastValueRef.current = value;
    // intentional missing deps [flatItems, selectedValue]
  }, [JSON.stringify(value), hasList, isMultiple]);

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

  return {
    selectedValues,
    selectableValue,
    indeterminate,
    labels,
    selectedItems,
    handler: {
      change: handleChange,
      clear: handleClear,
      close: handleClose,
      setIsCustomSearching,
    },
  };
};
