import { useEffect, useRef, useState } from 'react';

export const useDebounce = <Input>(input: Input, delay = 300) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [output, setOutput] = useState(input);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setOutput(input);
    }, delay);

    return () => {
      if (!timeoutRef.current) return;
      clearTimeout(timeoutRef.current);
    };
  }, [input, delay]);

  return output;
};
