import { ReactElement, useEffect, useRef, useState } from 'react';
import { MDSInput } from '../../Input';
import { MDSIcon } from '../../../atoms/Icon';

export const Search = ({
  placeholder,
  prefix,
  onChange,
}: {
  placeholder?: string;
  prefix?: string | ReactElement;
  onChange: (value: string) => void;
}) => {
  const [value, setValue] = useState('');

  const ref = useRef(onChange);

  useEffect(() => {
    ref.current(value);
  }, [value]);

  return (
    <MDSInput
      value={value}
      onChange={setValue}
      custom={{ prefix: prefix || <MDSIcon.Search size={16} />, alwaysShowDelete: true }}
      placeholder={placeholder || 'Search'}
      fullWidth
      inputProps={{ autoFocus: true }}
    />
  );
};
