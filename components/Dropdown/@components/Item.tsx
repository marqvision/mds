import { useState, MouseEvent, CSSProperties, useEffect, cloneElement, useRef } from 'react';
import styled from '@emotion/styled';
import { DropdownItem, SelectedType } from '../@types';
import { MDSTypography } from '../../Typography';
import { MDSCheckbox } from '../../Checkbox';
import { MDSIcon } from '../../Icon';
import { MDSTag } from '../../Tag';
import { MDSThemeValue } from '../../../foundation';
import { getValueFromList } from '../@utils';
import { MDSTooltip } from '../../Tooltip';
import { HighLightLabel } from './HighlightLabel';

type Props<T> = {
  parentIndex?: string;
  selectedValue: SelectedType<T>[];
  indeterminate: T[];
  isMultiple: boolean;
  item: DropdownItem<T>;
  search: string;
  depth?: number;
  is1DepthSingle?: boolean;
  isInfiniteAll: boolean;
  isDefaultFold: boolean;
  style?: CSSProperties;
  onChange: (value: SelectedType<T>[], checked: boolean, forceClose?: boolean) => void;
  onClose: () => void;
};

const StyledWrap = styled.label<{ bgColor: string; isDisabled?: boolean }>`
  min-height: 48px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: ${({ isDisabled }) => (isDisabled ? undefined : 'pointer')};
  background-color: ${({ bgColor }) => bgColor};
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme, isDisabled }) => (!isDisabled ? theme._raw_color.blue50 : undefined)};
  }
`;

const StyledLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  & > * {
    flex-shrink: 0;
  }
`;

const StyledLabelWrap = styled.div`
  flex-shrink: 1;
  & .highlight {
    color: ${({ theme }) => theme._raw_color.yellow600};
  }
`;

const StyledRightDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StyledExpandIcon = styled.button<{ disabled?: boolean }>`
  border: 0;
  margin: 0;
  padding: 0;
  background: transparent;
  cursor: ${({ disabled }) => (disabled ? undefined : 'pointer')};
  transition: background-color 225ms ease;
  display: flex;
  align-items: center;
  border-radius: 4px;
  &:hover {
    background-color: ${({ theme, disabled }) => (!disabled ? theme.color.content.inverse.default.hover : undefined)};
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

export const ItemInnerComponent = <T,>(props: Props<T>) => {
  const {
    item,
    parentIndex = '',
    search,
    indeterminate,
    isMultiple: _isMultiple,
    selectedValue,
    isDefaultFold,
    depth = 0,
    style,
    onChange,
    onClose,
  } = props;

  const [isExpanded, setIsExpanded] = useState(!isDefaultFold);

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
  const isSelected =
    props.isInfiniteAll || (selectedChildLength === allChildSelected.length && allChildSelected.length !== 0);
  const is1DepthSingle = props.is1DepthSingle && depth === 0 && !hasChildren;
  const isMultiple = is1DepthSingle ? false : _isMultiple;

  const isIndeterminate = (!isSelected && isMultiple && selectedChildLength > 0) || indeterminate.includes(item.value);

  const iconEle =
    item.icon &&
    cloneElement(item.icon, {
      size: item.icon.props.size || 16,
      style: { marginRight: '-8px' },
    });

  const handleClick = () => {
    if (item.isDisabled) {
      return;
    }
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

    if (item.isDisabled) {
      return;
    }

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
    if (typeof item.subLabel === 'string' || typeof item.subLabel === 'number') {
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
    <MDSTypography
      variant="T13"
      color={
        subLabel.position === 'bracket'
          ? 'color/content/neutral/default/normal'
          : 'color/content/neutral/secondary/normal'
      }
      style={{ display: 'inline', marginLeft: subLabel.position === 'bracket' ? '4px' : undefined }}
    >
      {subLabel.position === 'bracket' && '('}
      {subLabel.includeSearch ? <HighLightLabel searchText={search} label={`${subLabel.label}`} /> : subLabel.label}
      {subLabel.position === 'bracket' && ')'}
    </MDSTypography>
  );

  useEffect(() => {
    if (search) {
      setIsExpanded(true);
    } else if (isDefaultFold) {
      setIsExpanded(false);
    }
  }, [search, isDefaultFold]);

  useEffect(() => {
    if (item.isDisabled) {
      setIsExpanded(false);
    }
  }, [item]);

  if (item.value === undefined && !item.onClick && !item.children) {
    return (
      <StyledDivider variant="T13" color="color/content/neutral/secondary/normal" style={item.style}>
        {item.label}
      </StyledDivider>
    );
  }

  return (
    <div
      style={{
        ...style,
        ...item.style,
      }}
    >
      <StyledWrap
        isDisabled={item.isDisabled}
        bgColor={BACKGROUND_COLOR[Math.min(depth, 2)]}
        onClick={handleClick}
        style={{ paddingLeft: depth * 32 + 12 }}
      >
        <StyledLabel>
          {isMultiple && (
            <MDSCheckbox
              value={isIndeterminate ? 'indeterminate' : isSelected}
              isDisabled={item.isDisabled || item.children?.length === 0}
              onChange={handleCheck}
            />
          )}
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
              color={
                !isMultiple && isSelected
                  ? 'color/content/primary/default/normal'
                  : item.isDisabled
                  ? 'color/content/neutral/default/disabled'
                  : undefined
              }
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {typeof item.label === 'string' ? <HighLightLabel searchText={search} label={item.label} /> : item.label}
              {subLabel?.position === 'tooltip' && (
                <MDSTooltip title={subLabel.label} anchorStyle={{ display: 'inline', marginLeft: '4px' }}>
                  <MDSIcon.Help variant="fill" size={12} />
                </MDSTooltip>
              )}
              {subLabel?.position === 'bracket' && subLabelEl}
            </MDSTypography>
            {subLabel?.position === 'bottom' && subLabelEl}
          </StyledLabelWrap>
        </StyledLabel>
        {(item.rightSection ||
          (props.is1DepthSingle && depth === 0 && hasChildren && selectedChildLength > 0) ||
          hasChildren) && (
          <StyledRightDiv>
            {item.rightSection}
            {props.is1DepthSingle && depth === 0 && hasChildren && selectedChildLength > 0 ? (
              <MDSTag size="medium" variant="tint" color="blue">
                Selected {selectedChildLength}
              </MDSTag>
            ) : undefined}
            {hasChildren && (
              <StyledExpandIcon disabled={item.isDisabled || !item.children.length} onClick={handleClickExpand}>
                {isExpanded ? (
                  <MDSIcon.Fold
                    size={24}
                    color={
                      item.isDisabled || !item.children.length ? 'color/content/neutral/default/disabled' : undefined
                    }
                  />
                ) : (
                  <MDSIcon.Unfold
                    size={24}
                    color={
                      item.isDisabled || !item.children.length ? 'color/content/neutral/default/disabled' : undefined
                    }
                  />
                )}
              </StyledExpandIcon>
            )}
          </StyledRightDiv>
        )}
      </StyledWrap>
      {item.children?.map((child, index) => (
        <Item
          key={`dropItem_${depth}_${child.value ?? `${child.label}_${parentIndex}_${index}`}`}
          {...props}
          parentIndex={`${parentIndex}_${index}`}
          onChange={handleChange}
          item={child}
          depth={depth + 1}
          style={{ display: isExpanded ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
};

export const Item = <T,>(props: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [height, setHeight] = useState(48);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      setIsIntersecting(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const entry = entries.at(-1);
      if (!entry) return;
      if (entry.contentRect.height > height) {
        setHeight(entry.contentRect.height);
      }
      if (entry.contentRect.width > width) {
        setWidth(entry.contentRect.width);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [height, width]);

  return (
    <div
      ref={ref}
      id={props.item.value ? `mds-drop-item-${props.item.value}` : undefined}
      style={{ minHeight: height, minWidth: width }}
    >
      {isIntersecting ? <ItemInnerComponent<T> {...props} /> : undefined}
    </div>
  );
};
