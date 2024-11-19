import { useState, MouseEvent, CSSProperties, useEffect, cloneElement } from 'react';
import styled from '@emotion/styled';
import { DropdownItem, SelectedType } from '../@types';
import { MDSTypography } from '../../Typography';
import { MDSCheckbox } from '../../Checkbox';
import { MDSIcon } from '../../Icon';
import { MDSTag } from '../../Tag';
import { MDSThemeValue } from '../../../foundation';
import { getValueFromList } from '../@utils';
import { HighLightLabel } from './HighlightLabel';

type Props<T> = {
  selectedValue: SelectedType<T>[];
  indeterminate: T[];
  isMultiple: boolean;
  item: DropdownItem<T>;
  search: string;
  depth?: number;
  is1DepthSingle?: boolean;
  isInfiniteAll: boolean;
  style?: CSSProperties;
  onChange: (value: SelectedType<T>[], checked: boolean, forceClose?: boolean) => void;
  onClose: () => void;
};

const StyledWrap = styled.label<{ bgColor: string }>`
  min-height: 48px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme }) => theme._raw_color.blue50};
  }
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  & > *:not(p) {
    flex-shrink: 0;
  }
`;

const StyledLabelWrap = styled.div`
  & .highlight {
    color: ${({ theme }) => theme._raw_color.yellow600};
  }
`;

const StyledRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledExpandIcon = styled.button`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme }) => theme.color.content.inverse.default.hover};
  }
`;

const StyledImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
`;

const StyledDivider = styled(MDSTypography)`
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.tertiary.normal};
  padding: 6px 12px;
`;

const BACKGROUND_COLOR = [
  MDSThemeValue._raw_color.white,
  MDSThemeValue._raw_color.bluegray50,
  MDSThemeValue._raw_color.bluegray100,
  MDSThemeValue._raw_color.bluegray150,
];

export const Item = <T,>(props: Props<T>) => {
  const {
    item,
    search,
    indeterminate,
    isMultiple: _isMultiple,
    selectedValue,
    depth = 0,
    style,
    onChange,
    onClose,
  } = props;

  const [isExpanded, setIsExpanded] = useState(true);

  const allChildSelected = item.children
    ? getValueFromList(item.children)
    : [
        {
          label: item.label,
          value: item.value as T,
        },
      ];
  const allChildValue = allChildSelected.flatMap((v) => v.value);
  const hasChildren = !!item.children;

  const selectedChildLength = allChildValue.filter((v) => selectedValue.some((v2) => v2.value === v)).length;
  const isSelected = props.isInfiniteAll || selectedChildLength === allChildSelected.length;
  const is1DepthSingle = props.is1DepthSingle && depth === 0 && !hasChildren;
  const isMultiple = is1DepthSingle ? false : _isMultiple;

  const isIndeterminate = !isSelected && isMultiple && selectedChildLength > 0;

  const iconEle =
    item.icon &&
    cloneElement(item.icon, {
      size: 16,
      style: { marginRight: '-8px' },
    });

  const handleClick = () => {
    if (!isMultiple && item.value) {
      onChange(
        [
          {
            label: item.label,
            value: item.value,
          },
        ],
        !isSelected,
        is1DepthSingle
      );
    } else if (item.onClick) {
      item.onClick();
      onClose();
    }
  };

  const handleCheck = (value: boolean) => {
    onChange(allChildSelected, value);
  };

  const handleClickExpand = (e: MouseEvent) => {
    e.preventDefault();

    setIsExpanded((ps) => !ps);
  };

  const handleChange = (value: SelectedType<T>[], checked: boolean, forceClose?: boolean) => {
    if (props.is1DepthSingle && checked) {
      const prevGroupValue = selectedValue.filter((v) => allChildValue.includes(v.value));
      onChange([...prevGroupValue, ...value], checked, forceClose);
    } else {
      onChange(value, checked, forceClose);
    }
  };

  const subLabel = (() => {
    if (!item.subLabel) {
      return undefined;
    }
    if (typeof item.subLabel === 'string') {
      return {
        label: item.subLabel,
        position: 'bottom',
        includeSearch: false,
      };
    }
    return {
      label: item.subLabel.label,
      position: item.subLabel.position || 'bottom',
      includeSearch: item.subLabel.includeSearch || false,
    };
  })();

  const subLabelEl = subLabel && (
    <MDSTypography variant="T13" color="color/content/neutral/secondary/normal">
      {subLabel.includeSearch ? <HighLightLabel searchText={search} label={subLabel.label} /> : subLabel.label}
    </MDSTypography>
  );

  useEffect(() => {
    setIsExpanded(true);
  }, [search]);

  if (item.value === undefined && !item.onClick && !item.children) {
    return (
      <StyledDivider variant="T13" color="color/content/neutral/secondary/normal" style={item.style}>
        {item.label}
      </StyledDivider>
    );
  }

  return (
    <div style={style}>
      <StyledWrap
        id={`mds-drop-item-${item.value}`}
        bgColor={BACKGROUND_COLOR[Math.min(depth, 2)]}
        onClick={handleClick}
        style={{ paddingLeft: depth * 32 + 12, ...item.style }}
      >
        <StyledLabel>
          {isMultiple && <MDSCheckbox value={isIndeterminate ? 'indeterminate' : isSelected} onChange={handleCheck} />}
          {!isMultiple && isSelected && (
            <MDSIcon.Check
              variant="outline"
              size={16}
              color="color/content/primary/default/normal"
              style={{ flexShrink: 0 }}
            />
          )}
          {item.imgUrl && <StyledImg src={item.imgUrl} />}
          {iconEle}
          <StyledLabelWrap>
            {subLabel?.position === 'top' && subLabelEl}
            <MDSTypography
              variant="T14"
              color={!isMultiple && isSelected ? 'color/content/primary/default/normal' : undefined}
            >
              {typeof item.label === 'string' ? <HighLightLabel searchText={search} label={item.label} /> : item.label}
            </MDSTypography>
            {subLabel?.position === 'bottom' && subLabelEl}
          </StyledLabelWrap>
        </StyledLabel>
        <StyledRightDiv>
          {item.rightSection}
          {props.is1DepthSingle && depth === 0 && hasChildren && selectedChildLength > 0 ? (
            <MDSTag size="medium" variant="tint" color="blue">
              Selected {selectedChildLength}
            </MDSTag>
          ) : undefined}
          {hasChildren && (
            <StyledExpandIcon onClick={handleClickExpand}>
              {isExpanded ? <MDSIcon.Fold size={24} /> : <MDSIcon.Unfold size={24} />}
            </StyledExpandIcon>
          )}
        </StyledRightDiv>
      </StyledWrap>
      {item.children?.map((child) => (
        <Item
          key={`dropItem_${depth}_${child.value === undefined ? child.value : child.label}`}
          {...props}
          onChange={handleChange}
          item={child}
          depth={depth + 1}
          style={{ display: isExpanded ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};
