import React, { isValidElement } from 'react';
import { MDSThemeColorPath } from '../../foundation';
import { resolveColor } from '../../@system';

export const getNodeText = (node: React.ReactNode | React.ReactNode[]): string => {
  if (['string', 'number'].includes(typeof node)) return String(node);
  if (node instanceof Array) return node.map(getNodeText).join('');
  if (isValidElement(node)) return getNodeText(node.props.children);
  return '';
};

const isColorPath = (color: string): color is MDSThemeColorPath => {
  return color.startsWith('color/');
};

export const getColor = (color?: MDSThemeColorPath | string) => {
  if (!color) return '';
  if (isColorPath(color)) return resolveColor(color);
  return color;
};
