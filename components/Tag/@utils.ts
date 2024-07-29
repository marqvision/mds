import React, { isValidElement } from 'react';

export const getNodeText = (node: React.ReactNode | React.ReactNode[]): string => {
  if (['string', 'number'].includes(typeof node)) return String(node);
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (isValidElement(node)) return getNodeText(node.props.children);
  return '';
};
