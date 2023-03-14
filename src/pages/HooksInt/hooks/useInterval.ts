import { useRef, useEffect } from 'react';
export const useInterval = (fn: () => unknown, delay: number) => {
  const timerRef = useRef<NodeJS.Timer>();
  const fnRef = useRef(fn);
  fnRef.current = fn;
  useEffect(() => {
    timerRef.current = setInterval(() => {
      fnRef.current();
    }, delay);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [delay]);
};
