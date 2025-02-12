import { cloneElement, Children, ReactElement, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { MDSTypography2 } from '../Typography2';
import { MDSIcon } from '../Icon';
import { getCorrectContainerStyle, getLayoutStyle, getSizeStyle } from './@utils';
import {
  MDSSelectContainerItemProps,
  MDSSelectContainerProps,
  SelectContainerItemFeatures,
  StyledWrapperProps,
  UnwrapArray,
} from './@types';

const SelectContainerStyles = styled.div<StyledWrapperProps>`
  display: flex;
  flex-direction: ${({ orientation }) => (orientation === 'horizontal' ? 'row' : 'column')};
  flex-wrap: wrap;
  gap: 8px;
  width: inherit;
`;

const SelectContainerTitleStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SelectContainerItemContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MainIconWrapperStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const CheckedIconWrapperStyles = styled.div`
  ${({ theme }) => `
    position: absolute;
    top: -9px;
    left: -9px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 100px;
    background-color: ${theme.color.bg.surface.neutral.default.normal};
    
    & path {
      width: 16px;
      height: 16px;
    }
  `}
`;

const SelectContainerItemStyles = styled.div<SelectContainerItemFeatures>`
  ${({ disabled, isSelected, isVariantCenter, orientation, orientationType, fixedHeightValue, fixedWidthValue }) => {
    const containerStyle = getCorrectContainerStyle(disabled, isSelected);
    const layoutStyle = getLayoutStyle(orientationType, isVariantCenter);
    const sizeStyle = getSizeStyle(orientation, fixedHeightValue, fixedWidthValue);

    console.log(layoutStyle, orientationType, isVariantCenter, '!?');

    return ` 
      position: relative;
      gap: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out; 
     
      ${sizeStyle} 
      ${containerStyle}
      ${layoutStyle}
    `;
  }}
`;

const Wrapper = <T extends string | string[] | number | number[]>({
  value,
  children,
  fixedWidthValue,
  fixedHeightValue,
  variant = 'left',
  orientationType = 'hug',
  orientation = 'horizontal',
}: MDSSelectContainerProps<T>) => {
  const modifiedChildrenWithProps = Children.map(
    children,
    (child: ReactElement<MDSSelectContainerItemProps<UnwrapArray<T>> & HTMLAttributes<HTMLDivElement>>) => {
      const childValueProps = child.props.value;
      const isSelected = Array.isArray(value)
        ? value.some((item) => item === childValueProps)
        : childValueProps === value;

      return cloneElement(child, {
        isSelected,
        orientation,
        orientationType,
        fixedWidthValue,
        fixedHeightValue,
        isVariantCenter: variant === 'center',
      });
    }
  );

  return <SelectContainerStyles orientation={orientation}>{modifiedChildrenWithProps}</SelectContainerStyles>;
};

const Item = <T extends string | number>({
  main,
  value,
  title,
  content,
  onClick,
  disabled,
  isSelected,
  orientation,
  fixedWidthValue,
  fixedHeightValue,
  isVariantCenter,
  orientationType,
  ...props
}: MDSSelectContainerItemProps<T>) => {
  return (
    <SelectContainerItemStyles
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
      isSelected={isSelected}
      isVariantCenter={isVariantCenter}
      fixedWidthValue={fixedWidthValue}
      fixedHeightValue={fixedHeightValue}
      orientation={orientation}
      orientationType={orientationType}
      {...props}
    >
      {isSelected && (
        <CheckedIconWrapperStyles className="checked-icon-wrapper">
          <MDSIcon.Check variant="fill" size={16} />
        </CheckedIconWrapperStyles>
      )}
      {!isVariantCenter && main?.icon && <MainIconWrapperStyles>{main.icon}</MainIconWrapperStyles>}
      <SelectContainerItemContentStyles>
        <SelectContainerTitleStyles>
          {title.icon}
          <MDSTypography2 variant="body" size="m" weight="medium" color={title.color}>
            {title.label}
          </MDSTypography2>
          {title.tag}
        </SelectContainerTitleStyles>
        {content}
      </SelectContainerItemContentStyles>
    </SelectContainerItemStyles>
  );
};

export const MDSSelectContainer = {
  Wrapper,
  Item,
};
