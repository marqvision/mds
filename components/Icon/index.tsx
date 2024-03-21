import { ReactNode } from 'react';
import { resolveColor } from '../../@system/resolvers';
import { MDSIconProps } from './@types';
import {
  SVGArrowLeftOutline,
  SVGArrowLeftBorder,
  SVGArrowLeftFill,
  SVGArrowDownBorder,
  SVGArrowDownFill,
  SVGArrowDownOutline,
  SVGArrowRightBorder,
  SVGArrowRightFill,
  SVGArrowRightOutline,
  SVGArrowUpBorder,
  SVGArrowUpFill,
  SVGArrowUpOutline,
} from './Arrows';
import { SVGCheckFill, SVGCheckOutline, SVGCloseDeleteOutline } from './Symbols';

const createIcon = (Icon: ({ color }: { color: string }) => ReactNode) => {
  const IconComponent = ({ size = 24, color = 'color/content/neutral/default/normal' }: MDSIconProps) => {
    const props = {
      size: size || 24,
      color: resolveColor(color),
    };
    return (
      <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Icon color={props.color} />
      </svg>
    );
  };

  return IconComponent;
};

const ArrowLeftOutline = createIcon(SVGArrowLeftOutline);
const ArrowLeftBorder = createIcon(SVGArrowLeftBorder);
const ArrowLeftFill = createIcon(SVGArrowLeftFill);
const ArrowRightOutline = createIcon(SVGArrowRightOutline);
const ArrowRightBorder = createIcon(SVGArrowRightBorder);
const ArrowUpOutline = createIcon(SVGArrowUpOutline);
const ArrowRightFill = createIcon(SVGArrowRightFill);
const ArrowUpBorder = createIcon(SVGArrowUpBorder);
const ArrowUpFill = createIcon(SVGArrowUpFill);
const ArrowDownOutline = createIcon(SVGArrowDownOutline);
const ArrowDownBorder = createIcon(SVGArrowDownBorder);
const ArrowDownFill = createIcon(SVGArrowDownFill);

const CheckFill = createIcon(SVGCheckFill);
const CheckOutline = createIcon(SVGCheckOutline);

const CloseOutline = createIcon(SVGCloseDeleteOutline);

export {
  ArrowLeftOutline,
  ArrowLeftBorder,
  ArrowLeftFill,
  ArrowRightOutline,
  ArrowRightBorder,
  ArrowRightFill,
  ArrowUpOutline,
  ArrowUpBorder,
  ArrowUpFill,
  ArrowDownOutline,
  ArrowDownBorder,
  ArrowDownFill,
  CheckFill,
  CheckOutline,
  CloseOutline,
};
