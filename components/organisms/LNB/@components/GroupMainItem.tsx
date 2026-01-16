import React from 'react';
import { SubNavPopoverProps } from '../@types';
import { MDSTooltip } from '../../../molecules/Tooltip';
import { SubPopoverContent } from './SubPopoverContent';

export const GroupMainItem = (props: SubNavPopoverProps & { children: React.ReactElement }) => {
  const { children, ...restProps } = props;

  if (props.isOpen) return children;

  const isGroupTitle = !!(props.items && props.items.length);
  const position = isGroupTitle ? 'right-bottom' : 'right-center';
  const width = isGroupTitle ? '172px' : 'auto';

  const style = isGroupTitle
    ? {
        padding: '0px',
        marginLeft: '8px',
      }
    : undefined;

  return (
    <MDSTooltip
      size="small"
      interactive={isGroupTitle}
      position={position}
      width={width}
      title={<SubPopoverContent {...restProps} />}
      style={style}
      bgColor="white"
    >
      {children}
    </MDSTooltip>
  );
};
