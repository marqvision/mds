import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { MDSTypography } from '../../atoms/Typography';
import { MDSSliderProps, SliderTrackProps, SliderThumbProps } from './@types';
import { SLIDER_CONFIG } from './@constants';
import { clampValue, roundToStep, valueToPercentage, percentageToValue, getPercentageFromEvent } from './@utils';

export type { MDSSliderProps };

export const MDSSlider = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  isDisabled = false,
  hasLabel = true,
  ariaLabel,
  ariaLabelledby,
}: MDSSliderProps) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const clampedValue = clampValue({ value, min, max });
  const percentage = valueToPercentage({ value: clampedValue, min, max });

  const _ariaLabel = ariaLabelledby ? undefined : ariaLabel ?? 'Slider';

  const handleValueChange = useCallback(
    (clientX: number) => {
      if (!trackRef.current || isDisabled) return;

      const newPercentage = getPercentageFromEvent(clientX, trackRef.current);
      const rawValue = percentageToValue({ percentage: newPercentage, min, max });
      const steppedValue = roundToStep({ value: rawValue, step, min });
      const finalValue = clampValue({ value: steppedValue, min, max });

      if (finalValue !== value) {
        onChange(finalValue);
      }
    },
    [min, max, step, value, onChange, isDisabled]
  );

  const handleValueChangeRef = useRef(handleValueChange);

  useLayoutEffect(() => {
    handleValueChangeRef.current = handleValueChange;
  });

  const handleMouseDown = (event: React.MouseEvent) => {
    if (isDisabled) return;
    event.preventDefault();
    setIsDragging(true);
    handleValueChange(event.clientX);
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    if (isDisabled) return;
    setIsDragging(true);
    handleValueChange(event.touches[0].clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event: MouseEvent) => {
      handleValueChangeRef.current(event.clientX);
    };

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      handleValueChangeRef.current(event.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isDisabled) return;

    let newValue = clampedValue;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = clampValue({ value: clampedValue + step, min, max });
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = clampValue({ value: clampedValue - step, min, max });
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    event.preventDefault();
    if (newValue !== clampedValue) {
      onChange(newValue);
    }
  };

  return (
    <Container ref={trackRef} isDisabled={isDisabled} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart}>
      <Track percentage={percentage} isDisabled={isDisabled}>
        <FilledTrack percentage={percentage} isDisabled={isDisabled} />
        <Thumb
          percentage={percentage}
          isDisabled={isDisabled}
          isDragging={isDragging}
          tabIndex={isDisabled ? -1 : 0}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={clampedValue}
          aria-disabled={isDisabled}
          aria-label={_ariaLabel}
          aria-labelledby={ariaLabelledby}
          onKeyDown={handleKeyDown}
        >
          {hasLabel && (
            <MDSTypography
              variant="body"
              size="l"
              weight="medium"
              color="color/content/on_default_color"
              style={{ userSelect: 'none', pointerEvents: 'none' }}
            >
              {clampedValue}
            </MDSTypography>
          )}
        </Thumb>
      </Track>
    </Container>
  );
};

const Container = styled.div<{ isDisabled: boolean }>`
  width: 100%;
  padding: ${SLIDER_CONFIG.thumbSize / 2}px 0;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
`;

const Track = styled.div<SliderTrackProps>`
  position: relative;
  width: 100%;
  height: ${SLIDER_CONFIG.trackHeight}px;
  background-color: ${({ theme }) => theme._raw_color.blue200};
  border-radius: 100px;
  cursor: inherit;
`;

const FilledTrack = styled.div<SliderTrackProps>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${({ percentage }) => percentage}%;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.color.bg.fill.primary.default.disabled : theme.color.bg.fill.primary.default.normal};
  border-radius: 100px;
  transition: width 0.05s ease-out;
`;

const Thumb = styled.div<SliderThumbProps>`
  position: absolute;
  top: 50%;
  left: ${({ percentage }) => percentage}%;
  transform: translate(-50%, -50%);
  min-width: 28px;
  height: ${SLIDER_CONFIG.thumbSize}px;
  padding: 0 8px;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.color.bg.fill.primary.default.disabled : theme.color.bg.fill.primary.default.normal};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'grab')};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.16), 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  transition: transform 0.1s ease-out, box-shadow 0.15s ease;
  outline: none;

  ${({ isDragging, isDisabled }) =>
    isDragging &&
    !isDisabled &&
    `
    cursor: grabbing;
    transform: translate(-50%, -50%) scale(1.1);
  `}

  &:hover:not([aria-disabled='true']) {
    background-color: ${({ theme }) => theme.color.bg.fill.primary.default.hover};
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.color.bg.fill.primary.tint.normal}, 0 0 2px 0 rgba(0, 0, 0, 0.16),
      0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;
