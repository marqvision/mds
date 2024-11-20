import { DropdownItem } from '../Dropdown/@types';

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
