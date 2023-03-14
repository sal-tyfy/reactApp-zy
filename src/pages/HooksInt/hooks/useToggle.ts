import { useReducer } from 'react';

const toggleReducer = (state: boolean, action?: boolean) => {
  return typeof action === 'boolean' ? action : !state;
};
export const useToggle = (
  initialValue: boolean,
): [boolean, (action?: boolean) => void] => {
  const [value, dispatch] = useReducer(toggleReducer, initialValue);
  return [value, dispatch];
};
