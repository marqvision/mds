import React, { forwardRef, JSX, Ref, useEffect, useState } from 'react';
import { MDSIcon } from '../../atoms/Icon';
import { MDSDropdown, ValueType } from '../Dropdown';
import { MDSInput, MDSInputProps } from '../Input';
import { MDSTooltip } from '../Tooltip';
import { Styled } from './@components/Styled';
import { SearchProps } from './@types';
import { getFirstValue, getSelectedLabel } from './@utils';

export const MDSSearch = forwardRef(<T,>(props: SearchProps<T>, ref: Ref<HTMLInputElement | HTMLDivElement>) => {
  const {
    size = 'small',
    option,
    value,
    onChange,
    trigger = 'enter',
    placeholder = 'Search',
    minSearchLetters = 2,
    isDisabled,
    debounce,
    inputProps,
  } = props;

  const optionWidth = option && 'width' in option ? option?.width : undefined;
  const optionList = option && 'list' in option ? option?.list : option || [];
  const optionValue: T | undefined = option && 'value' in option ? option?.value : getFirstValue(optionList);

  const [selectedOption, setSelectedOption] = useState<T>(optionValue ?? ('' as T));
  const [error, setError] = useState<boolean>(false);

  const width = typeof props.width === 'string' ? props.width : undefined;
  const expandWidth =
    typeof props.width !== 'string'
      ? {
          defaultWidth: props.width?.default || '120px',
          focusWidth: props.width?.focused || '200px',
        }
      : undefined;

  const handleErrorReset = () => {
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
      onChange?.(trimmedValue, selectedOption);
    } else {
      onChange?.(trimmedValue);
    }
  };

  const [_searchKeyword, setSearchKeyword] = useState<string>(value || '');
  const handleChange = (value: string) => {
    setSearchKeyword(value);
    if (trigger === 'change') {
      handleSearch(value);
    } else {
      handleErrorReset();
    }
  };
  useEffect(() => {
    // reset filter로 keyword query parameter를 날렸을 때 화면에 보이는 keyword도 같이 초기화한다.
    // -> query parameter가 react-router의 내부 state로 관리 되고 있기 때문에 query parameter가 변했을 때 effect를 이용하여 뒤이어 state 싱크를 맞춰야한다.
    if (!props.value) {
      setSearchKeyword('');
    }
  }, [props.value]);

  const searchBarProps: MDSInputProps<string> = {
    size,
    value: _searchKeyword,
    onChange: handleChange,
    placeholder,
    status: error ? 'error' : undefined,
    custom: {
      alwaysShowDelete: true,
      onEnter: trigger === 'enter' ? handleSearch : undefined,
      prefix: <MDSIcon.Search size={16} />,
      expandOnFocus: expandWidth,
      suffix: error ? (
        <MDSTooltip title={`Search more than ${minSearchLetters - 1} letters`}>
          <MDSIcon.ErrorWarning variant="fill" size={16} color="color/content/critical/default/normal" />
        </MDSTooltip>
      ) : undefined,
      debounce,
    },
    isDisabled,
    inputProps,
  };

  if (!option) return <MDSInput {...searchBarProps} width={width} ref={ref as React.Ref<HTMLInputElement>} />;

  return (
    <Styled.wrapper width={width} ref={ref}>
      <MDSDropdown
        width={optionWidth}
        list={optionList}
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
              isDisabled={isDisabled}
            />
          );
        }}
      />
      <MDSInput
        {...searchBarProps}
        width={width ? '100%' : undefined}
        custom={{ ...searchBarProps.custom, flatLeft: true }}
        style={{ transform: 'translateX(-1px)' }}
      />
    </Styled.wrapper>
  );
}) as (<T>(props: SearchProps<T> & { ref?: Ref<HTMLInputElement | HTMLDivElement> }) => JSX.Element) & {
  displayName?: string;
};
MDSSearch.displayName = 'MDSSearch';

export type MDSSearchProps<T> = SearchProps<T>;
