import { useCallback, useEffect, useRef, useState } from 'react';
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
  width: 100%;
  max-width: ${({ size, fullWidth }) => (fullWidth ? undefined : theme.size[size].maxWidth)};
  transition: max-width ${theme.transitionTiming} ease;
  &:has(input:focus),
  &:has(button:focus) {
    position: relative;
    z-index: 1;
  }
`;

/**
 * @param {TextFieldProps | SelectProps} props.type Input에 대한 props
 * */
export const MDSInput = <T,>(props: Props<T>) => {
  const {
    type = 'textField',
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
      const w = parseInt(`${focus.defaultWidth}`);
      setMaxWidth(isNaN(w) ? parseInt(theme.size[size].maxWidth) : w);
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
  }, [focus, toFit]);

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
        width: width || style?.width,
        maxWidth: width || style?.maxWidth || maxWidth,
      }}
    >
      {label && <Label size={size} label={label} isDisabled={isDisabled} />}
      {type === 'textField' && (
        <TextField
          {...({
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
      {type === 'select' && (
        <Select<T>
          {...({
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
          } as Omit<SelectProps<T>, 'type'>)}
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
};
