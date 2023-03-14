import { useRef, useEffect } from 'react';

export const useTimeoutFn = (fn: () => unknown, ms: number) => {
  const callbackRef = useRef(fn);
  callbackRef.current = fn;

  useEffect(() => {
    const timer = setTimeout(() => {
      callbackRef.current();
    }, ms);
    return () => clearTimeout(timer);
  }, [ms]);
};
