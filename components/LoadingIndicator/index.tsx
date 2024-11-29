import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { resolveColor } from '../../@system';
import { MDSThemeColorPath } from '../../foundation';
import { MDSTypography } from '../Typography';
import { DEFAULT_SIZE, theme } from './@constants';
import { LoadingIndicatorProps } from './@types';

const SvgKeyframes = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div<{ size?: number }>`
  position: relative;
  overflow: hidden;
  ${({ size }) => `
    width: ${size}px;
    height: ${size}px;
  `}
`;

const SVG = styled.svg<{ size?: number; color: string; progress?: LoadingIndicatorProps['progress'] }>`
  ${({ size, color }) => `
    color: ${color};
    width: ${size}px;
    height: ${size}px;
  `}
  ${({ progress }) =>
    progress === undefined
      ? css`
          animation: ${SvgKeyframes} 1.4s linear infinite;
        `
      : ''}
`;

const CircleKeyframes = keyframes`
  0% {
    stroke-dasharray: 1 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100 200;
    stroke-dashoffset: -15;
  }
  100% {
    stroke-dasharray: 100 200;
    stroke-dashoffset: -125;
  }
`;

const Circle = styled.circle<{ progress: LoadingIndicatorProps['progress'] }>`
  stroke: currentColor;
  ${({ r, progress }) =>
    progress === undefined
      ? css`
          animation: ${CircleKeyframes} 1.4s ease-in-out infinite;
          stroke-dasharray: 80 200;
          stroke-dashoffset: 0;
        `
      : css`
          transform-origin: 50% 50%;
          transform: rotate(-90deg);
          ${getProgressStroke(Number(r), progress)}
        `}
`;

const BackgroundCircle = styled.circle<{ backgroundColor: Exclude<LoadingIndicatorProps['backgroundColor'], undefined> }>`
  stroke: ${({ backgroundColor }) =>
    typeof backgroundColor === 'boolean' ? theme.color.backgroundColor : resolveColor(backgroundColor)};
`;

const Label = styled(MDSTypography)<{ customColor: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ customColor }) => `color: ${customColor};`};
`;

export const MDSLoadingIndicator = (props: LoadingIndicatorProps) => {
  const {
    label: _label,
    size: _size = DEFAULT_SIZE.INDETERMINATE.SIZE,
    progress,
    color: _color = 'default',
    strokeWidth = _label === false || _label === undefined ? DEFAULT_SIZE.INDETERMINATE.STROKEWIDTH : DEFAULT_SIZE.DETERMINATE.STROKEWIDTH,
    backgroundColor,
    ...restProps
  } = props;

  const size = _label === false || _label === undefined ? _size : Math.max(DEFAULT_SIZE.DETERMINATE.SIZE, _size); // label 이 있으면 최소 사이즈 설정
  const label = _label === true ? progress : _label;

  const viewBow = `0 0 ${size} ${size}`;
  const cxy = size / 2;
  const r = cxy - strokeWidth / 2;

  const color = isMDSThemeColorPath(_color) ? resolveColor(_color) : theme.color[_color];

  return (
    <Wrapper size={size}>
      <SVG
        viewBox={viewBow}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        size={size}
        color={color}
        progress={progress}
        {...restProps}
      >
        {backgroundColor && (
          <BackgroundCircle
            cx={cxy}
            cy={cxy}
            r={r}
            fill="none"
            strokeWidth={strokeWidth}
            backgroundColor={backgroundColor}
          />
        )}
        <Circle cx={cxy} cy={cxy} r={r} fill="none" progress={progress} />
      </SVG>
      {typeof label === 'number' && (
        <Label variant="T12" customColor={color}>
          {label}%
        </Label>
      )}
    </Wrapper>
  );
};

const isMDSThemeColorPath = (color: LoadingIndicatorProps['color']): color is MDSThemeColorPath => {
  return !!color?.startsWith('color/');
};

const getProgressStroke = (r: number, progress: number) => {
  const dashArray = 2 * Math.PI * r;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return `
    stroke-dasharray: ${dashArray};
    stroke-dashoffset: ${dashOffset};
  `;
};
