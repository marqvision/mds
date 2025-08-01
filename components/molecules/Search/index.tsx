import React, { forwardRef, JSX, Ref, useState } from 'react';
import { MDSIcon } from '../../atoms/Icon';
import { MDSDropdown, ValueType } from '../Dropdown';
import { MDSInput, MDSInputProps } from '../Input';
import { MDSTooltip } from '../Tooltip';
import { SearchProps } from './@types';
import { getSelectedLabel } from './@utils';
import { Styled } from './@components/Styled';

export const MDSSearch = forwardRef(<T,>(props: SearchProps<T>, ref: Ref<HTMLInputElement | HTMLDivElement>) => {
  const {
    size = 'small',
    option,
    value,
    onSearch,
    trigger = 'enter',
    placeholder = 'Search',
    minSearchLetters = 2,
  } = props;

  const [selectedOption, setSelectedOption] = useState<T>(option?.value ?? ('' as T));
  const [error, setError] = useState<boolean>(false);

  const width = props.width ?? { default: '120px', focused: '200px' };

  const handleSearchChange = () => {
    setError(false);
  };

  const handleSearch = (value: string) => {
    const trimmedValue = value.trim();
    if (trigger === 'enter' && !!trimmedValue.length && trimmedValue.length < minSearchLetters) {
      setError(true);
      return;
    }
    setError(false);
    if (option) {
      onSearch?.(trimmedValue, selectedOption);
    } else {
      onSearch?.(trimmedValue);
    }
  };

  const inputProps: MDSInputProps<string> = {
    size,
    value,
    onChange: trigger === 'change' ? handleSearch : handleSearchChange,
    placeholder,
    width: typeof width === 'string' ? width : undefined,
    status: error ? 'error' : undefined,
    custom: {
      alwaysShowDelete: true,
      onEnter: trigger === 'enter' ? handleSearch : undefined,
      prefix: <MDSIcon.Search size={16} />,
      expandOnFocus:
        typeof width === 'object'
          ? {
              defaultWidth: width.default,
              focusWidth: width.focused,
            }
          : undefined,
      suffix: error ? (
        <MDSTooltip title={`Search more than ${minSearchLetters - 1} letters`}>
          <MDSIcon.ErrorWarning variant="fill" size={16} color="color/content/critical/default/normal" />
        </MDSTooltip>
      ) : undefined,
    },
  };

  if (!option) return <MDSInput {...inputProps} ref={ref as React.Ref<HTMLInputElement>} />;

  return (
    <Styled.wrapper ref={ref}>
      <MDSDropdown
        width={option.width}
        list={option.list}
        value={selectedOption}
        onChange={(value) => setSelectedOption(value as T)}
        renderAnchor={(value, _, list) => {
          const labels = getSelectedLabel(list, value);

          return (
            <MDSInput
              size={size}
              width="auto"
              custom={{ flatRight: true }}
              variant="select"
              value={value}
              list={[{ label: labels, value: value as ValueType<T> }]}
            />
          );
        }}
      />
      <MDSInput
        {...inputProps}
        custom={{ ...inputProps.custom, flatLeft: true }}
        style={{ transform: 'translateX(-1px)' }}
      />
    </Styled.wrapper>
  );
}) as (<T>(props: SearchProps<T> & { ref?: Ref<HTMLInputElement | HTMLDivElement> }) => JSX.Element) & {
  displayName?: string;
};
MDSSearch.displayName = 'MDSSearch';

export type MDSSearchProps<T> = SearchProps<T>;