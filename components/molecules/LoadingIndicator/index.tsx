import { forwardRef } from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
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

const Wrapper = styled.i<{ size: number; padding: number }>`
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  ${({ size, padding }) => css`
    width: ${size}px;
    height: ${size}px;
    padding: ${padding}px;
  `}
`;

const SVG = styled.svg<{ color: string; progress?: LoadingIndicatorProps['progress'] }>`
  ${({ color }) => css`
    color: ${color};
    width: 100%;
    height: 100%;
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
  transition: 0.2s;

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

const BackgroundCircle = styled.circle<{
  backgroundColor: Exclude<LoadingIndicatorProps['backgroundColor'], undefined>;
}>`
  stroke: ${({ backgroundColor }) => (backgroundColor ? theme.color.backgroundColor : '')};
`;

const Label = styled(MDSTypography)<{ customColor: string }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${({ customColor }) => `color: ${customColor};`};
`;

export const MDSLoadingIndicator = forwardRef<HTMLElement, LoadingIndicatorProps>((props, ref) => {
  const {
    isDeterminate,
    size: _size = DEFAULT_SIZE.indeterminate.size,
    progress,
    color: _color = 'default',
    strokeWidth: _strokeWidth,
    backgroundColor,
    className,
    style,
    ...restProps
  } = props;

  const widthLabel = !isDeterminate && typeof progress === 'number';
  const size = widthLabel ? Math.max(DEFAULT_SIZE.determinate.size, _size) : _size; // label 이 있으면 최소 사이즈 설정
  const strokeWidth =
    _strokeWidth ||
    (widthLabel // size 입력하지 않으면 기본 사이즈 적용
      ? DEFAULT_SIZE.determinate.strokeWidth
      : DEFAULT_SIZE.indeterminate.strokeWidth * (size / DEFAULT_SIZE.indeterminate.size));
  const label = widthLabel && progress;

  const padding = widthLabel
    ? DEFAULT_SIZE.determinate.padding
    : DEFAULT_SIZE.indeterminate.padding * (size / DEFAULT_SIZE.indeterminate.size);
  const viewBow = `0 0 ${size - padding} ${size - padding}`;
  const cxy = (size - padding) / 2;
  const r = cxy - strokeWidth / 2;

  const color = theme.color[_color];

  return (
    <Wrapper size={size} padding={padding} className={className} style={style} role="loading-indicator" ref={ref}>
      <SVG
        viewBox={viewBow}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
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
        <Label variant="body" size="xs" weight="regular" whiteSpace="nowrap" customColor={color}>
          {label}%
        </Label>
      )}
    </Wrapper>
  );
});
MDSLoadingIndicator.displayName = 'MDSLoadingIndicator';

const getProgressStroke = (r: number, progress: number) => {
  const dashArray = 2 * Math.PI * r;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  return `
    stroke-dasharray: ${dashArray};
    stroke-dashoffset: ${dashOffset};
  `;
};
