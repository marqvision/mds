import { forwardRef, Ref, useCallback, useEffect, useRef, useState, JSX } from 'react';
import styled from '@emotion/styled';
import { theme } from './@constants';
import { Props, SelectProps, Size, TextFieldCustom, TextFieldProps } from './@types';
import { TextField } from './@modules/TextField';
import { Select } from './@modules/Select';
import { Label } from './@modules/Label';
import { Guide } from './@modules/Guide';

const StyledWrapper = styled.div<{ size: Size; fullWidth: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 100%;
  min-width: 0;
  width: ${({ size, fullWidth }) => (fullWidth ? undefined : theme.size[size].maxWidth)};
  transition: width ${theme.transitionTiming} ease;
  &:has(input:focus),
  &:has(button:focus) {
    position: relative;
    z-index: 1;
  }
`;

/**
 * @param {TextFieldProps | SelectProps} props.type Input에 대한 props
 * */
export const MDSInput = forwardRef(<T,>(props: Props<T>, ref: Ref<HTMLInputElement | HTMLButtonElement>) => {
  const {
    variant = 'textField',
    value,
    size = 'medium',
    inputProps,
    placeholder,
    fullWidth = false,
    isDisabled,
    isReadOnly,
    isMultiline,
    status,
    custom,
    list,
    format,
    label,
    guide,
    style,
    outlineStyle,
    width,
    onChange,
    onClick,
    onBlur,
  } = props;

  const handleChange = isReadOnly || isDisabled ? undefined : onChange;
  const handleClick = isReadOnly || isDisabled ? undefined : onClick;

  const [init, setInit] = useState(false);
  const [maxWidth, setMaxWidth] = useState<number>();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const guideList =
    (guide &&
      (Array.isArray(guide)
        ? guide.map((v) => {
            if (typeof v === 'string') {
              return { label: v, status };
            }
            return v;
          })
        : [{ label: guide, status }])) ||
    undefined;

  const focus = (custom as TextFieldCustom)?.expandOnFocus;
  const toFit = (custom as TextFieldCustom)?.expandToFit;

  const handleBlur = (_value: string) => {
    if (focus) {
      setTimeout(() => {
        const w = parseInt(`${focus.defaultWidth}`);
        setMaxWidth(isNaN(w) ? parseInt(theme.size[size].maxWidth) : w);
      }, 100);
    }
    onBlur?.(_value);
  };

  const handleFocus = () => {
    if (focus) {
      const w = parseInt(`${focus.focusWidth}`);
      setMaxWidth(isNaN(w) ? parseInt(theme.size[size].maxWidth) : w);
    }
  };

  const handleResize = useCallback(
    (gap: number) => {
      if (toFit) {
        const tempDefaultWidth = parseInt(`${toFit.defaultWidth}`);
        const tempMaxWidth = parseInt(`${toFit.maxWidth}`);
        const defaultWidth = isNaN(tempDefaultWidth) ? parseInt(theme.size[size].maxWidth) : tempDefaultWidth;
        const maxWidth = isNaN(tempMaxWidth) ? 10000 : tempMaxWidth;
        const clientWidth = wrapperRef.current?.clientWidth || 0;
        const newWidth = clientWidth + gap;
        if (gap < 0) {
          setMaxWidth(Math.max(newWidth, defaultWidth));
        } else if (gap > 0) {
          setMaxWidth(Math.min(newWidth, maxWidth));
        }
      }
    },
    [toFit, size]
  );

  useEffect(() => {
    if (focus?.defaultWidth) {
      setMaxWidth(parseInt(`${focus.defaultWidth}`));
    } else if (toFit?.defaultWidth) {
      setMaxWidth(parseInt(`${toFit.defaultWidth}`));
    }
    setInit(true);
  }, [focus?.defaultWidth, toFit?.defaultWidth]);

  if (!init) {
    return <></>;
  }

  return (
    <StyledWrapper
      ref={wrapperRef}
      size={size}
      fullWidth={fullWidth}
      style={{
        ...style,
        width: width || style?.width || maxWidth,
      }}
    >
      {label && <Label size={size} label={label} isDisabled={isDisabled} />}
      {variant === 'textField' && (
        <TextField
          {...({
            ref,
            value,
            size,
            custom,
            inputProps,
            isDisabled,
            isReadOnly,
            isMultiline,
            status,
            format,
            placeholder,
            style: outlineStyle,
            onChange: handleChange,
            onBlur: handleBlur,
          } as TextFieldProps)}
          onFocus={handleFocus}
          onResize={handleResize}
        />
      )}
      {variant === 'select' && (
        <Select<T>
          {...({
            ref,
            value,
            list: list || [],
            size,
            custom,
            isDisabled,
            isReadOnly,
            status,
            format,
            placeholder,
            style: outlineStyle,
            onChange: handleChange,
            onClick: handleClick,
          } as Omit<SelectProps<T>, 'variant'>)}
        />
      )}
      {guideList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {guideList.map((guideItem) => (
            <Guide key={guideItem.label} label={guideItem.label} size={size} status={guideItem.status} />
          ))}
        </div>
      )}
    </StyledWrapper>
  );
}) as (<T>(props: Props<T> & { ref?: Ref<HTMLInputElement | HTMLButtonElement> }) => JSX.Element) & {
  displayName?: string;
};
MDSInput.displayName = 'MDSInput';

export type MDSInputProps<T> = Props<T>;
