import { useEffect, useMemo, useState } from 'react';
import { InferType, ObjType, Props, SelectedType, SortType, ValueType } from './@types';
import { flattenDropdown, getFilteredList, getValueFromList } from './@utils';

export const useDropdown = <T>({ value, list, hasSort }: Pick<Props<T>, 'value' | 'list'> & { hasSort?: boolean }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortType | undefined>(hasSort ? 'asc' : undefined);

  const filteredList = useMemo(() => getFilteredList(list, search, sort), [search, list, sort]);

  useEffect(() => {
    setTimeout(() => {
      if (!Array.isArray(value) && !!value) {
        document.querySelector(`#mds-drop-item-${value}`)?.scrollIntoView({
          block: 'center',
        });
      }
    }, 0);
  }, [value]);

  return {
    search,
    sort,
    filteredList,
    handler: {
      search: setSearch,
      sort: setSort,
    },
  };
};

export const useInitDropdown = <T, SortT>(props: Omit<Props<T, SortT>, 'renderAnchor' | 'width'>) => {
  const { value, list, indeterminate: _indeterminate } = props;

  const [selectedValues, setSelectedValues] = useState<SelectedType<ValueType<T>>[]>([]);
  const [indeterminate, setIndeterminate] = useState<ValueType<T>[]>([]);

  const isMultiple = Array.isArray(value);
  const flatItems = flattenDropdown(list);
  const selectableValue = getValueFromList(list);
  const hasList = list.length > 0;
  const is1DepthSingle = props.modules?.includes('1-depth-single');

  const values = (isMultiple ? value : value ? [value] : []) as ValueType<T>[];

  const labels = (() => {
    const isAllSelected = isMultiple && (value.length === list.length || (value.length === 1 && value[0] === -1));

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

  const returnObj = (
    Array.isArray(value) ? list.filter((v) => value.includes(v.value)) : list.find((v) => v.value === value)
  ) as ObjType<T>;

  const handleClose = () => {
    if (isMultiple) {
      props.onChange?.(selectedValues.flatMap((v) => v.value) as InferType<T>, indeterminate);
    }
  };

  const handleChange = (
    newValues: SelectedType<ValueType<T>>[],
    isSelected: boolean,
    close: () => void,
    forceSingle?: boolean
  ) => {
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
      } else {
        props.onChange?.(newValues[0].value as InferType<T>);
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
      setIndeterminate((ps) => ps?.filter((v) => !newValues.some((v2) => v2.value === v)));
    }
  };

  useEffect(() => {
    if (hasList) {
      const values = (isMultiple ? value : value ? [value] : []) as ValueType<T>[];
      const flat = selectedValues.flatMap((v) => v.value);

      const isSomeDiff = values.some((v) => !flat.includes(v)) || flat.some((v) => !values.includes(v));

      if (isSomeDiff) {
        setSelectedValues(
          values.map((v) => ({
            label: flatItems.find((item) => item.value === v)?.label || v,
            value: v,
          })) as SelectedType<ValueType<T>>[]
        );
      }
    }
    // intentional missing deps [flatItems, selectedValue]
  }, [value, hasList, isMultiple]);

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
    returnObj,
    handler: {
      change: handleChange,
      close: handleClose,
    },
  };
};
