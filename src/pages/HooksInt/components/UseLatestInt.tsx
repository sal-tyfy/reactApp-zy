import { Card, Button, message, Space } from 'antd';
import { useState } from 'react';
import { useLatest } from '../hooks/useLatest';

const UseLatestInt = () => {
  const [num, setNum] = useState(0);
  const latest = useLatest(num);
  return (
    <Card title="useLatest">
      <div>num: {num}</div>
      <Space style={{ marginTop: 24 }}>
        <Button
          type="primary"
          onClick={() => {
            setNum(num + 1);
          }}
        >
          add
        </Button>
        <Button
          onClick={() => {
            setTimeout(() => {
              message.success(latest.current);
            }, 3000);
          }}
        >
          message
        </Button>
      </Space>
    </Card>
  );
};
export default UseLatestInt;
