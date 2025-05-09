import React from 'react';
import { MDSPopover } from '../../../molecules/Popover';
import { SubNavPopoverProps } from '../@types';
import { SubPopoverContent } from './SubPopoverContent';

export const GroupMainItem = (props: SubNavPopoverProps & { children: React.ReactElement }) => {
  const { children, ...restProps } = props;

  const isGroupTitle = !!(props.items && props.items.length);
  const position = isGroupTitle ? 'right-bottom' : 'right-center';
  const width = isGroupTitle ? '172px' : 'auto';
  const padding = isGroupTitle ? '0px' : '4px 8px';
  const marginLeft = isGroupTitle ? '4px' : undefined;

  if (props.isOpen) return children;

  return (
    <MDSPopover
      trigger="hover"
      position={position}
      width={width}
      anchor={children}
      style={{ padding, marginLeft, borderRadius: '4px' }}
    >
      <SubPopoverContent {...restProps} />
    </MDSPopover>
  );
};
