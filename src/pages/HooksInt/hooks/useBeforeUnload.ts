import { useEffect, useCallback } from 'react';
export const useBeforeUnload = (enabled: boolean) => {
  const handler = useCallback((e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = 'sure to leave';
    return 'sure to leave';
  }, []);
  useEffect(() => {
    if (!enabled) {
      return;
    }
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
    };
  }, [enabled]);
};
