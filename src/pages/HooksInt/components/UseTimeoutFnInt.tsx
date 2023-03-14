import { Card } from 'antd';
import { useTimeoutFn } from '../hooks/useTimeoutFn';

const UseTimeoutFnInt = () => {
  useTimeoutFn(() => {
    document.title = 'useTimeoutFn';
  }, 2000);
  return <Card title="useTimeoutFn">useTimeoutFn</Card>;
};
export default UseTimeoutFnInt;
