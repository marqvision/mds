export type MDSSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  isDisabled?: boolean;
  hasLabel?: boolean;
  ariaLabel?: string;
  ariaLabelledby?: string;
};

export type SliderTrackProps = {
  percentage: number;
  isDisabled: boolean;
};

export type SliderThumbProps = {
  percentage: number;
  isDisabled: boolean;
  isDragging: boolean;
};
