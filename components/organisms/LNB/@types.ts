import React from 'react';

export type ItemType = 'group' | 'sub' | 'popover';

export type Item<Type extends ItemType> = {
  path?: string;
  key: string;
  label: string;

  items?: never;
} & (Type extends 'group' ? { icon: React.ReactElement } : { icon?: never });

export type Group = {
  key: string;
  label: string;
  icon: React.ReactElement;
  items: Item<'sub'>[];

  path?: never;
};

export type LNBItem = Group | Item<'group'>;

type CommonProps = Required<Omit<LNBProps, 'list'>>;

export type GroupProps = CommonProps & LNBItem;

export type ItemProps<Type extends ItemType> = {
  type: Type;
  selected?: boolean;
  isSubOpen?: boolean;
  onClick?: () => void;
} & CommonProps &
  Item<Type>;

export type SubNavPopoverProps = {
  label: string;
  items?: Item<'sub'>[];
} & CommonProps;

export type LNBProps = {
  /*
   * LNB 펼침 여부
   * `true` 일 경우 LNB 가 펼쳐지고 label 이 보여집니다.
   * `false` 일 경우 LNB 가 접히며 label 이 숨겨집니다.
   */
  isOpen: boolean;
  /*
   * 현재 pathname
   * LNBItem 의 path 와 비교하여 현재 선택된 메뉴를 표시합니다.
   */
  value: string;
  /*
   * 출력할 메뉴 리스트
   * LNBItem 을 이중 배열로 전달하면 배열 사이에 divider 가 출력됩니다.
   */
  list: LNBItem[] | LNBItem[][];
  /*
   * 렌더링할 컴포넌트
   * MDSLNB 는 react-router-dom 을 내장하고 있지 않습니다.
   * react-router-dom 의 Link 를 주입하여 사용해야 합니다.
   * LinkComponent 를 주입하지 않으면 기본적으로 a 태그로 렌더링됩니다. (storybook 에서 사용)
   */
  LinkComponent?: React.ComponentType<{ to: string; children: React.ReactNode }>;
};
