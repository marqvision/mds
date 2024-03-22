import { ReactNode, SVGAttributes } from 'react';
import { resolveColor } from '../../@system/resolvers';
import { Features } from './@types';
import { SVGArrowLeft, SVGArrowRight, SVGArrowUp, SVGArrowDown } from './Arrows';
import {
  SVGAddPlus,
  SVGCards,
  SVGCheck,
  SVGCloseDelete,
  SVGErrorWarning,
  SVGEyesVisibility,
  SVGFlag,
  SVGHelp,
  SVGHourglassDelay,
  SVGInfo,
  SVGMinus,
  SVGPriority,
  SVGSend,
  SVGView,
} from './Symbols';

export type MDSIconProps = Features & SVGAttributes<SVGElement>;

const createIcon = (Icon: (features: Features) => ReactNode) => {
  const IconComponent = ({ size = 24, color = 'color/content/neutral/default/normal', variant }: MDSIconProps) => {
    const props = {
      size: size || 24,
      color: resolveColor(color),
      variant,
    };
    return (
      <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Icon variant={props.variant} />
      </svg>
    );
  };

  return IconComponent;
};

const ArrowLeft = createIcon(SVGArrowLeft);
const ArrowRight = createIcon(SVGArrowRight);
const ArrowUp = createIcon(SVGArrowUp);
const ArrowDown = createIcon(SVGArrowDown);

const Check = createIcon(SVGCheck);
const AddPlus = createIcon(SVGAddPlus);
const Minus = createIcon(SVGMinus);
const CloseDelete = createIcon(SVGCloseDelete);

const Flag = createIcon(SVGFlag); // variant 수정 필요

const Help = createIcon(SVGHelp);
const ErrorWarning = createIcon(SVGErrorWarning);
const Priority = createIcon(SVGPriority);

const Info = createIcon(SVGInfo);
const Send = createIcon(SVGSend);
const HourglassDelay = createIcon(SVGHourglassDelay);
const View = createIcon(SVGView);
const Cards = createIcon(SVGCards);

// @ts-ignore
// todo-@jamie: fix types!
const EyesVisibility = createIcon(SVGEyesVisibility);


export const MDSIcon = {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Check,
  AddPlus,
  Minus,
  CloseDelete,
  Flag,
  Help,
  ErrorWarning,
  Priority,
  Info,
  Send,
  HourglassDelay,
  View,
  Cards,
  EyesVisibility
};
