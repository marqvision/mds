import { cloneElement, Children, ReactElement, HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { IcoCheckFill } from '@marqvision/mds/assets';
import { MDSTypography } from '../Typography';
import { MDSSelectContainerProps, MDSSelectContainerItemProps, SelectContainerItemStyles } from './@types';
import { getCorrectContainerStyle } from './@utils';

const SelectContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectContainerTitleStyles = styled.div`
  display: flex;
`;

const SelectContainerItemContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MainIconWrapperStyles = styled.div`
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

const SelectContainerItemStyles = styled.div`
  ${({ disabled, isSelected }: SelectContainerItemStyles) => {
    const containerStyle = getCorrectContainerStyle(disabled, isSelected);

    return ` 
      position: relative;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out; 

      ${containerStyle}
    `;
  }}
`;

const Wrapper = <T extends string | string[]>({ value, children }: MDSSelectContainerProps<T>) => {
  const modifiedChildrenWithProps = Children.map(
    children,
    (child: ReactElement<MDSSelectContainerItemProps<T> & HTMLAttributes<HTMLDivElement>>) => {
      const childValueProps = child.props.value;
      const isSelected = Array.isArray(value) ? value.includes(childValueProps as string) : childValueProps === value;

      return cloneElement(child, {
        isSelected,
      });
    }
  );

  return <SelectContainerStyles>{modifiedChildrenWithProps}</SelectContainerStyles>;
};

const Item = <T extends string | string[]>({
  main,
  value,
  title,
  content,
  onClick,
  disabled,
  isSelected,
  ...props
}: MDSSelectContainerItemProps<T>) => {
  return (
    <SelectContainerItemStyles onClick={() => onClick(value)} disabled={disabled} isSelected={isSelected} {...props}>
      {isSelected && (
        <CheckedIconWrapperStyles className="checked-icon-wrapper">
          <IcoCheckFill className="check-icon" />
        </CheckedIconWrapperStyles>
      )}
      {main?.icon && <MainIconWrapperStyles>{main.icon}</MainIconWrapperStyles>}
      <SelectContainerItemContentStyles>
        <SelectContainerTitleStyles>
          {title.icon}
          <MDSTypography variant="T14" weight="medium" color={title.color}>
            {title.label}
          </MDSTypography>
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
