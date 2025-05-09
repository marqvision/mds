import { MDSTheme } from '../../../types';
import { ItemType, LNBItem } from './@types';

export const checkIsNested = (list: LNBItem[] | LNBItem[][]): list is LNBItem[][] => {
  // divider 를 구분자로 출력하기 위해 list 가 2차원 배열일 필요가 있음
  // 다만 편의상 list props 을 1차원 배열로 전달받을 수 있으므로
  // 2차원 배열로 변환하기 위해 전달받은 list props 가 2차원 배열인지 확인함
  return Array.isArray(list[0]);
};

export const resolveNavItemPadding = ({ isOpen, type }: { isOpen: boolean; type: ItemType }) => {
  if (type === 'popover') return '5.5px 8px';
  if (isOpen) return type === 'group' ? '8.5px 8px' : '5.5px 12px';
  return '8.5px 9px';
};

export const resolveNavItemColor = ({ theme, selected }: { theme: MDSTheme; selected?: boolean }) => {
  const color = selected ? theme.comp.lnb.color.content.selected : theme.comp.lnb.color.content.unSelected;
  const hoverColor = selected ? theme.comp.lnb.color.content.selected : theme.comp.lnb.color.content.hover;
  const backgroundColor = selected ? theme.comp.lnb.color.bg.selected : 'transparent';
  const hoverBackgroundColor = selected ? theme.comp.lnb.color.bg.selectedHover : theme.comp.lnb.color.bg.hover;

  return { color, hoverColor, backgroundColor, hoverBackgroundColor };
};
