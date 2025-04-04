import { ChangeEvent, isValidElement, MouseEvent, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { MDSIcon } from '../../../atoms/Icon';
import { getTypographyProps, MDSTypography2 } from '../../../atoms/Typography2';
import { theme } from '../@constants';
import { CommonProps, Size, TextFieldProps } from '../@types';
import { StyledBaseLabel, StyledIcon, StyledOutline } from './@styled';
import { AddButton } from './AddButton';

const StyledLabel = styled(StyledBaseLabel)<{ size: Size; isError?: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: stretch;
  width: 100%;
`;

const StyledInput = styled.input<{ customSize: Size; typographySize: ReturnType<typeof getTypographyProps>['size'] }>`
  width: 100%;
  height: 100%;
  font-size: ${({ customSize }) => theme.size[customSize].fontSize};
  word-break: break-word;
  font-weight: ${`var(--font-body-regular)`};
  letter-spacing: ${({ typographySize }) => `var(--font-body-letter-spacing-${typographySize}-regular)`};
  &[type=number] {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button, &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
,
`;

const StyledPrefix = styled(MDSTypography2)`
  cursor: default;
  flex: 0 0 auto;
`;

const StyledMirror = styled.div<{ isMultiline: boolean }>`
  position: absolute;
  visibility: hidden;
  overflow: hidden;
  white-space: ${({ isMultiline }) => (isMultiline ? 'pre-wrap' : 'pre')};
`;

type Props = CommonProps & TextFieldProps & { onFocus: () => void; onResize: (gap: number) => void };

export const TextField = (props: Props) => {
  const {
    value,
    custom,
    size = 'medium',
    inputProps,
    isDisabled,
    isReadOnly,
    isMultiline: _isMultiline,
    status,
    placeholder,
    style,
    format,
    onChange,
    onBlur,
    onFocus,
    onResize,
  } = props;

  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [mirrorText, setMirrorText] = useState<string>('');
  const [height, setHeight] = useState<number | string>();

  const lastValueRef = useRef('');
  const debounceRef = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const formatRef = useRef(format);
  const preventResizeRef = useRef(false);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<number>();

  const add = custom?.add;
  const debounce = custom?.debounce || 0;
  const enter = custom?.onEnter;
  const prefix = custom?.prefix;
  const isError = status === 'error';
  const hasCustomToFit = !!custom?.expandToFit;
  const isMultiline = _isMultiline || !!custom?.multiline;
  const toFitMultiline = custom?.multiline?.expandToFit;
  const py = parseFloat(theme.size[size].paddingY) * 2 + 2;

  const typographySize = getTypographyProps(parseInt(theme.size[size].fontSize.replace('px', ''))).size;

  const Prefix = prefix ? (
    isValidElement(prefix) ? (
      prefix
    ) : (
      <StyledPrefix size={typographySize} color="color/content/neutral/secondary/normal">
        {prefix}
      </StyledPrefix>
    )
  ) : undefined;
  const suffix = custom?.suffix;
  const Suffix = suffix ? (
    isValidElement(suffix) ? (
      suffix
    ) : (
      <StyledPrefix size={typographySize} color="color/content/neutral/secondary/normal">
        {suffix}
      </StyledPrefix>
    )
  ) : undefined;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShowDelete(!!e.target.value);
    lastValueRef.current = formatRef.current ? formatRef.current(value) : value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    setIsDebouncing(true);
    debounceRef.current = window.setTimeout(() => {
      onChange?.(e.target.value);
      setIsDebouncing(false);
    }, debounce);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!preventResizeRef.current) {
      onBlur?.(e.target.value);
    }
  };

  const handleDelete = (e: MouseEvent) => {
    if (enter) {
      e.preventDefault();
      enter('');
      onBlur?.('');
    } else if (onChange) {
      onChange('');
    } else if (onBlur) {
      onBlur('');
    }
    setIsShowDelete(false);

    if (inputRef.current) {
      inputRef.current.value = '';
    }

    if (isDebouncing) {
      setIsDebouncing(false);
      clearTimeout(debounceRef.current);
    }
  };

  const handleEnter = () => {
    enter?.(inputRef.current?.value || '');
  };

  useEffect(() => {
    const input = inputRef.current;

    if (isInit && input && !isDebouncing) {
      if (value !== lastValueRef.current) {
        const formattedValue = formatRef.current ? formatRef.current(value) : value;
        input.value = formattedValue;
        lastValueRef.current = formattedValue;
        setMirrorText(formattedValue);
        setIsShowDelete(!!formattedValue);
      }
    }
  }, [value, isDebouncing, isInit]);

  useEffect(() => {
    setIsInit(true);
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const fn = () => {
        if (hasCustomToFit) {
          const gap = (entries[0].target.clientWidth || 0) - (entries[0].target.nextElementSibling?.clientWidth || 0);
          onResize(gap);
        }
        if (toFitMultiline) {
          const defaultHeight = toFitMultiline.defaultHeight || py + parseInt(theme.size[size].fontSize) * 1.5 * 2;

          let newHeight = Math.max((entries[0].target.clientHeight || 0) + py, parseInt(`${defaultHeight}`));

          if (toFitMultiline.maxHeight) {
            newHeight = Math.min(parseFloat(`${toFitMultiline.maxHeight}`), newHeight);
          }

          setHeight(newHeight);
        }
      };

      if (resizeRef.current) {
        clearTimeout(resizeRef.current);
      }
      setTimeout(fn, 50);
    });

    if (mirrorRef.current && (hasCustomToFit || toFitMultiline)) {
      observer.observe(mirrorRef.current);
    }

    return () => {
      observer.disconnect();
    };

    // intentionally separating dependencies of toFitMultiline
  }, [hasCustomToFit, toFitMultiline?.defaultHeight, toFitMultiline?.maxHeight, py, size, onResize]);

  const isOverflowed =
    toFitMultiline && parseFloat(`${toFitMultiline.maxHeight}`) < (mirrorRef.current?.clientHeight || 0) + py;

  const mirrorMaxWidth = custom?.expandToFit?.maxWidth || inputRef.current?.clientWidth;

  return (
    <StyledLabel size={size} isError={isError}>
      <StyledOutline
        customSize={size}
        flatRight={add ? 'add' : custom?.flatRight}
        flatLeft={custom?.flatLeft}
        disabled={isDisabled}
        readOnly={isReadOnly}
        isError={isError}
        style={{
          ...style,
          height: height || toFitMultiline?.defaultHeight || style?.height,
        }}
      >
        {Prefix}
        <StyledMirror ref={mirrorRef} isMultiline={isMultiline} style={{ maxWidth: mirrorMaxWidth }}>
          <MDSTypography2 size={typographySize} wordBreak="break-word">
            {mirrorText.split('\n').at(-1) === '' ? `${mirrorText} ` : mirrorText}
          </MDSTypography2>
        </StyledMirror>
        {isInit && (
          <StyledInput
            ref={inputRef}
            {...inputProps}
            as={isMultiline ? 'textarea' : 'input'}
            customSize={size}
            typographySize={typographySize}
            title={isMultiline ? undefined : value}
            disabled={isDisabled}
            readOnly={isReadOnly}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={onFocus}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleEnter();
              }
            }}
            style={{
              overflow: isMultiline ? (isOverflowed ? 'scroll' : 'hidden') : undefined,
            }}
          />
        )}
        {Suffix}
        <StyledIcon
          as={MDSIcon.CloseDelete}
          color={isDisabled || isReadOnly ? 'color/content/neutral/default/disabled' : undefined}
          variant="border"
          size={theme.size[size].iconSize}
          onClick={!(isDisabled || isReadOnly) ? handleDelete : undefined}
          className={isShowDelete ? 'show' : undefined}
          onMouseEnter={() => (preventResizeRef.current = true)}
          onMouseLeave={() => (preventResizeRef.current = false)}
        />
      </StyledOutline>
      {add && (
        <AddButton
          label={add.label}
          size={size}
          isDisabled={isDisabled || isReadOnly || !value}
          isError={isError}
          onClick={() => add.onSubmit(value)}
        />
      )}
    </StyledLabel>
  );
};
