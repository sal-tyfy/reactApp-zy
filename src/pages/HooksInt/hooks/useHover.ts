import React, { useState } from 'react';
export const useHover = (element: React.ReactElement) => {
  const [hover, setHover] = useState(false);
  const onMouseEnter = (e: React.MouseEvent) => {
    element.props.onMouseEnter?.(e);
    setHover(true);
  };
  const onMouseLeave = (e: React.MouseEvent) => {
    element.props.onMouseLeave?.(e);
    setHover(false);
  };
  const el = React.cloneElement(element, {
    onMouseEnter,
    onMouseLeave,
  });
  return [el, hover];
};
