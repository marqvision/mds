import { useEffect, useRef, useState } from 'react';
import { MDSInput } from '../../Input';
import { MDSIcon } from '../../Icon';

export const Search = ({ onChange }: { onChange: (value: string) => void }) => {
  const [value, setValue] = useState('');

  const ref = useRef(onChange);

  useEffect(() => {
    ref.current(value);
  }, [value]);

  return (
    <MDSInput
      value={value}
      onChange={setValue}
      custom={{ prefix: <MDSIcon.Search size={16} /> }}
      placeholder="Search"
      fullWidth
      inputProps={{ autoFocus: true }}
    />
  );
};
