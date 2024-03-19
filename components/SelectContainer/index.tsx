import { cloneElement, Children, ReactElement, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styled from '@emotion/styled';
import { IcoCheckFill } from '@marqvision/mds/assets';
import { MDSTypography } from '../Typography';
import { MDSThemeValue } from '../../foundation';
import { MDSSelectContainerProps, MDSSelectContainerItemProps } from './@types';

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
  position: absolute;
  top: -9px;
  left: -9px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 100px;
  background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};

  & path {
    width: 16px;
    height: 16px;
  }
`;

const SelectContainerItemStyles = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &.isNotSelected {
    background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
    outline: 1px solid ${MDSThemeValue.color.border.neutral.default.normal};

    .checked-icon-wrapper path {
      fill: ${MDSThemeValue.color.content.primary.default.normal};
    }

    &:hover {
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};

      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.hover};
      }
    }
  }

  &.isSelected {
    background-color: ${MDSThemeValue.color.bg.surface.neutral.default.normal};
    outline: 2px solid ${MDSThemeValue.color.border.primary.default.normal};

    .checked-icon-wrapper path {
      fill: ${MDSThemeValue.color.content.primary.default.normal};
    }

    &:hover {
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.hover};

      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.hover};
      }
    }
  }

  &.disabled {
    outline: 1px solid ${MDSThemeValue.color.border.neutral.default.normal};

    p {
      color: ${MDSThemeValue.color.content.neutral.default.disabled};
    }

    .checked-icon-wrapper path {
      fill: ${MDSThemeValue.color.content.primary.default.disabled};
    }

    &:hover {
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.disabled};
    }
  }

  &.disabledAndSelected {
    outline: 2px solid ${MDSThemeValue.color.border.primary.default.disabled};

    p {
      color: ${MDSThemeValue.color.content.neutral.default.disabled};
    }

    .checked-icon-wrapper path {
      fill: ${MDSThemeValue.color.content.primary.default.disabled};
    }

    &:hover {
      background-color: ${MDSThemeValue.color.bg.surface.neutral.default.disabled};

      .checked-icon-wrapper path {
        fill: ${MDSThemeValue.color.content.primary.default.disabled};
      }
    }
  }
`;

const Wrapper = <T extends string | string[]>({ onChange, value, children }: MDSSelectContainerProps<T>) => {
  const modifiedChildrenWithProps = Children.map(
    children,
    (child: ReactElement<MDSSelectContainerItemProps<T> & HTMLAttributes<HTMLDivElement>>) => {
      const childValueProps = child.props.value;
      const childDisabledProps = child.props.disabled;
      const isSelected = Array.isArray(value) ? value.includes(childValueProps as string) : childValueProps === value;

      return cloneElement(child, {
        isSelected,
        onChange: () => !childDisabledProps && onChange(childValueProps),
      });
    }
  );

  return <SelectContainerStyles>{modifiedChildrenWithProps}</SelectContainerStyles>;
};

const Item = <T extends string>({
  main,
  title,
  content,
  disabled,
  isSelected,
  ...props
}: MDSSelectContainerItemProps<T>) => {
  const className = clsx({
    isSelected: isSelected,
    isNotSelected: !isSelected,
    disabled: disabled,
    disabledAndSelected: disabled && isSelected,
  });

  return (
    <SelectContainerItemStyles className={className} {...props}>
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
