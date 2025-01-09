import _debounce from 'lodash/debounce';
import { useRef } from 'react';
export const useDebounce = <T>(fn: (props: T) => unknown, rate?: number) => {
  const fnRef = useRef<(props: T) => unknown>();

  fnRef.current = fn;

  return { debouncedFn: _debounce(fnRef.current!, rate ?? 250) };
};
