import { DropdownItem, SelectedType, SortType } from './@types';

export const flattenDropdown = <T>(items: DropdownItem<T>[]): DropdownItem<T>[] => {
  const result: DropdownItem<T>[] = [];

  const flatten = (item: DropdownItem<T>) => {
    if (item.value) {
      result.push(item);
    }
    if (item.children) {
      item.children.forEach(flatten);
    }
  };

  items.forEach(flatten);
  return result;
};

export const getFilteredList = <T>(items: DropdownItem<T>[], search: string, sort?: SortType) => {
  const getAllChildLabel = (item: DropdownItem<T>) => {
    const arr: string[] = [];

    const loop = (currentItem: DropdownItem<T>) => {
      if (typeof currentItem.label === 'string' && (currentItem.value || currentItem.children)) {
        arr.push(currentItem.label);
      }
      if (currentItem.children) {
        currentItem.children.forEach((loopItem) => loop(loopItem));
      }
    };
    loop(item);

    return arr;
  };

  const loop = (currentItem: DropdownItem<T>): DropdownItem<T>[] => {
    const regex = getRegExpByKeyword(search);
    if (
      typeof currentItem.label === 'string' &&
      (currentItem.value || currentItem.children) &&
      currentItem.label.match(regex)
    ) {
      return [currentItem];
    } else if (getAllChildLabel(currentItem).some((value) => value.match(regex))) {
      return [
        /* @ts-ignore */
        {
          ...currentItem,
          children: currentItem.children?.reduce(
            (totalArr: DropdownItem<T>[], value: DropdownItem<T>) => [...totalArr, ...loop(value)],
            []
          ),
        },
      ];
    } else {
      return [];
    }
  };
  if (search) {
    return items.reduce<DropdownItem<T>[]>(
      (totalArr: DropdownItem<T>[], value: DropdownItem<T>) => [...totalArr, ...loop(value)],
      []
    );
  }
  const sortLoop = (currentItems: DropdownItem<T>[]): DropdownItem<T>[] => {
    return (
      sort
        ? currentItems.toSorted((a, b) => {
            if (typeof a.label === 'string' && typeof b.label === 'string') {
              return stringSort(a.label, b.label, sort);
            }
            return 0;
          })
        : currentItems
    ).map((v) =>
      v.children
        ? {
            ...v,
            children: sortLoop(v.children),
          }
        : v
    );
  };
  return sort ? sortLoop(items) : items;
};

export const getRegExpByKeyword = (keyword: string) => {
  return new RegExp(keyword.replace(/[.*+?^${}()\[\]\\]/g, '\\$&'), 'ig');
};

export const getValueFromList = <T>(list: DropdownItem<T>[]): SelectedType<T>[] => {
  const arrValues: T[] = [];

  const loop = (curList: DropdownItem<T>[]): SelectedType<T>[] =>
    curList.reduce<SelectedType<T>[]>((arr, item) => {
      if (item.children) {
        return [...arr, ...loop(item.children)];
      } else if (item.value !== undefined && !arrValues.includes(item.value)) {
        arrValues.push(item.value);
        return [
          ...arr,
          {
            label: item.label,
            value: item.value as T,
          },
        ];
      }
      return arr;
    }, []);

  return loop(list);
};

const stringSort = (a: string, b: string, orderBy: SortType) => {
  const nameA = a.toLowerCase();
  const nameB = b.toLowerCase();
  if (nameA < nameB) return orderBy === 'asc' ? -1 : 1;
  if (nameA > nameB) return orderBy === 'asc' ? 1 : -1;

  return 0;
};
