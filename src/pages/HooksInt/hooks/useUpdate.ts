import { useReducer } from 'react';

const updateReducer = (state: number) => {
  return (state + 1) % 1000000;
};
export const useUpdate = () => {
  const [, dispatch] = useReducer(updateReducer, 0);
  return dispatch;
};
