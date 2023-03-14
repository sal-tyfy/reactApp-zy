import { useState, useEffect } from 'react';
export const useWindowScroll = () => {
  const [offset, setOffset] = useState({
    x: window.scrollX,
    y: window.scrollY,
  });
  useEffect(() => {
    const fn = () => {
      setOffset({
        x: window.scrollX,
        y: window.scrollY,
      });
    };
    window.addEventListener('scroll', fn);
    return () => {
      window.removeEventListener('scroll', fn);
    };
  }, []);
  return offset;
};
