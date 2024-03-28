import { SVGAttributes } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Features } from '../@types';

//#region IndicatorCircle
const BoxKeyframes = keyframes`
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
const IndicatorCircleBox = styled.span<{ size?: number; color?: string }>`
  display: inline-block;
  animation: ${BoxKeyframes} 1.4s linear infinite;
  ${({ size, color }) => `
    color: ${color};
    width: ${size}px;
    height: ${size}px;
  `}
`;
const IndicatorCircleSVG = styled.svg`
  display: block;
`;
const CircleKeyframes = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;
const IndicatorCircleSVGCircle = styled.circle`
  stroke: currentColor;
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: ${CircleKeyframes} 1.4s ease-in-out infinite;
`;

//todo-@jamie: SVGAttributes<SVGElement> 타입을 component 단위의 prop으로 설정하고 있어서 타입 선언의 통일성이 깨짐
// 애니메이션이라 약간 특이케이스이기는 한데.. 이런 케이스가 한개 뿐이라 일단은 이대로 두고,
// 추후에 또 애니메이션 들어간 아이콘이 추가되면 통일성을 맞추는 방향으로 수정해야 할 것 같음
type IndicatorCircleProps = Features & SVGAttributes<SVGElement>;
export const IndicatorCircle = ({
  size, color,
  ...rest
}: IndicatorCircleProps) => (
  <IndicatorCircleBox role="progressbar" size={size} color={color}>
    <IndicatorCircleSVG viewBox="22 22 44 44" {...rest}>
      <IndicatorCircleSVGCircle
        cx="44"
        cy="44"
        r="18.5"
        fill="none"
        strokeWidth={rest.strokeWidth}
      ></IndicatorCircleSVGCircle>
    </IndicatorCircleSVG>
  </IndicatorCircleBox>
);
//#endregion
