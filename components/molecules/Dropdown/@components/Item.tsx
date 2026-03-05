import { useState, MouseEvent, cloneElement, useRef, isValidElement, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import styled from '@emotion/styled';
import { foldedItemIndexAtom } from '../@atoms';
import { DropdownItem } from '../@types';
import { MDSTypography } from '../../../atoms/Typography';
import { MDSCheckbox } from '../../../atoms/Checkbox';
import { MDSIcon } from '../../../atoms/Icon';
import { MDSTag } from '../../Tag';
import { getValueFromList } from '../@utils';
import { MDSTooltip } from '../../Tooltip';
import { HighLightLabel } from './HighlightLabel';

type Props<T> = {
  parentIndex?: string;
  selectedValue: DropdownItem<T>[];
  indeterminate: T[];
  isMultiple: boolean;
  item: DropdownItem<T>;
  search: string;
  depth?: number;
  is1DepthSingle?: boolean;
  isInfiniteAll: boolean;
  onChange: (value: DropdownItem<T>[], checked: boolean, forceClose?: boolean) => void;
  onClose: () => void;
};

const MIN_ITEM_HEIGHT = 48;

const StyledWrap = styled.label<{ colorDepth: 'default' | 'secondary' | 'tertiary'; isDisabled?: boolean }>`
  min-height: ${MIN_ITEM_HEIGHT}px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  cursor: ${({ isDisabled }) => (isDisabled ? undefined : 'pointer')};
  background-color: ${({ theme, colorDepth }) => theme.color.bg.surface.neutral[colorDepth].normal};
  transition: background-color 225ms ease;
  &:hover {
    background-color: ${({ theme, isDisabled, colorDepth }) =>
      !isDisabled ? theme.color.bg.surface.neutral[colorDepth].hover : undefined};
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
  transition: background-color 225ms ease, outline-color 225ms ease;
  outline: 4px solid transparent;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.comp.dropdown.radius};
  ${({ theme, disabled }) =>
    disabled
      ? undefined
      : {
          '&:hover': {
            outlineColor: theme._raw_color.blackAlpha5,
            backgroundColor: theme._raw_color.blackAlpha5,
          },
        }}
`;

const StyledImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.comp.dropdown.radius};
`;

const StyledDivider = styled(MDSTypography)`
  background-color: ${({ theme }) => theme.color.bg.surface.neutral.tertiary.normal};
  padding: 6px 12px;
`;

const StyledBlank = styled.div`
  height: ${MIN_ITEM_HEIGHT}px;
`;

const COLOR_DEPTH = ['default', 'secondary', 'tertiary'] as const;

const BlankComponent = <T,>(props: Props<T>) => {
  const { item, depth = 0, parentIndex = '' } = props;

  const foldedIndex = useAtomValue(foldedItemIndexAtom);
  const isFolded = foldedIndex.includes(parentIndex) || item.isDisabled;

  return (
    <>
      <StyledBlank></StyledBlank>
      {!isFolded &&
        props.item.children?.map((child, index) => (
          <div
            key={`dropItem_${depth}_${child.value ?? `${child.label}_${parentIndex}_${index}`}`}
            id={child.value && depth ? `mds-drop-item-${CSS.escape(child.value)}` : undefined}
          >
            <BlankComponent {...props} parentIndex={`${parentIndex}_${index}`} item={child} depth={depth + 1} />
          </div>
        ))}
    </>
  );
};

const ItemInnerComponent = <T,>(props: Props<T>) => {
  const {
    item,
    parentIndex = '',
    search,
    indeterminate,
    isMultiple: _isMultiple,
    selectedValue,
    depth = 0,
    onChange,
    onClose,
  } = props;

  const [foldedIndex, setFoldedIndex] = useAtom(foldedItemIndexAtom);

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
  const is1DepthSingle = props.is1DepthSingle && depth === 0 && !hasChildren;
  const isMultiple = is1DepthSingle ? false : _isMultiple;
  const isSelected = isMultiple
    ? props.isInfiniteAll || (selectedChildLength === allChildSelected.length && allChildSelected.length !== 0)
    : selectedValue.some((v) => v.value === item.value);

  const isIndeterminate = (!isSelected && isMultiple && selectedChildLength > 0) || indeterminate.includes(item.value);

  const iconEle =
    item.icon &&
    cloneElement(item.icon, {
      size: item.icon.props.size || 16,
      // style: { marginRight: '-8px' },
    });

  const handleClick = () => {
    if (item.isDisabled) {
      return;
    }
    if (!isMultiple && item.value !== undefined && !item.children) {
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
    if (parentIndex) {
      setFoldedIndex((ps) => (ps.includes(parentIndex) ? ps.filter((v) => v !== parentIndex) : [...ps, parentIndex]));
    }
  };

  const handleChange = (values: DropdownItem<T>[], checked: boolean, forceClose?: boolean) => {
    if (props.is1DepthSingle && checked) {
      const prevGroupValue = selectedValue.filter(
        (v) => allChildValue.includes(v.value) && values.every((v2) => v2.value !== v.value)
      );
      onChange([...prevGroupValue, ...values], checked, forceClose);
    } else {
      onChange(values, checked, forceClose);
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
      variant="body"
      size="s"
      weight="regular"
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

  if (item.value === undefined && !item.onClick && !item.children) {
    if (isValidElement(item.label)) {
      return item.label;
    }

    return (
      <StyledDivider
        variant="body"
        size="s"
        weight="regular"
        color="color/content/neutral/secondary/normal"
        style={item.style}
      >
        {item.label}
      </StyledDivider>
    );
  }

  const isFolded = foldedIndex.includes(parentIndex) || item.isDisabled;

  return (
    <>
      <StyledWrap
        isDisabled={item.isDisabled}
        colorDepth={COLOR_DEPTH[Math.min(depth, 2)]}
        onClick={handleClick}
        style={{ paddingLeft: depth * 36 + 12 }}
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
              size={24}
              color="color/content/primary/default/normal"
              style={{ flexShrink: 0 }}
            />
          )}
          {item.imgUrl && <StyledImg src={item.imgUrl} />}
          {iconEle}
          <StyledLabelWrap>
            {subLabel?.position === 'top' && subLabelEl}
            <MDSTypography
              variant="body"
              size="m"
              weight={!isMultiple && isSelected ? 'medium' : 'regular'}
              color={
                !isMultiple && isSelected
                  ? 'color/content/primary/default/normal'
                  : item.isDisabled
                  ? 'color/content/neutral/default/disabled'
                  : undefined
              }
              whiteSpace="pre-wrap"
              wordBreak="break-word"
            >
              {typeof item.label === 'string' ? <HighLightLabel searchText={search} label={item.label} /> : item.label}
              {subLabel?.position === 'tooltip' && (
                <MDSTooltip title={subLabel.label}>
                  <MDSIcon.Help variant="fill" size={12} style={{ display: 'inline', marginLeft: '4px' }} />
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
                {isFolded ? (
                  <MDSIcon.Unfold
                    size={24}
                    color={
                      item.isDisabled || !item.children.length ? 'color/content/neutral/default/disabled' : undefined
                    }
                  />
                ) : (
                  <MDSIcon.Fold
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
      {!isFolded &&
        item.children?.map((child, index) => (
          <Item
            key={`dropItem_${depth}_${child.value ?? `${child.label}_${parentIndex}_${index}`}`}
            {...props}
            parentIndex={`${parentIndex}_${index}`}
            onChange={handleChange}
            item={child}
            depth={depth + 1}
          />
        ))}
    </>
  );
};

export const Item = <T,>(props: Props<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [height, setHeight] = useState<number>(MIN_ITEM_HEIGHT);

  const [foldedItemIndex] = useAtom(foldedItemIndexAtom);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1);
        if (!entry) return;
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        root: ref.current?.closest('.mds-dropdown-scroll'),
      }
    );

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
      setHeight(entry.contentRect.height);
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    setHeight(MIN_ITEM_HEIGHT);
  }, [foldedItemIndex]);

  const isShow = !props.parentIndex || !foldedItemIndex.includes(props.parentIndex.split('_').slice(0, -1).join('_'));

  return (
    <div
      ref={ref}
      id={props.item.value ? `mds-drop-item-${CSS.escape(props.item.value)}` : undefined}
      style={{
        ...props.item.style,
        minHeight: isIntersecting ? 'unset' : height,
        display: isShow ? 'block' : 'none',
      }}
    >
      {isIntersecting ? <ItemInnerComponent<T> {...props} /> : <BlankComponent<T> {...props} />}
    </div>
  );
};
