import { Card } from 'antd';
import { useState } from 'react';
import { useInterval } from '../hooks/useInterval';

const UseIntervalInt = () => {
  const [num, setNum] = useState(0);
  useInterval(() => {
    setNum(num + 1);
  }, 1000);
  return (
    <Card title="useInterval">
      <div>number: {num}</div>
    </Card>
  );
};

export default UseIntervalInt;
