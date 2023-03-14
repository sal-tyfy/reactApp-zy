import { Button, Card } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';

const UseEffectDemo = () => {
  const [num, setNum] = useState(0);
  useEffect(() => {
    if (num === 1) {
      setNum(Math.random());
    }
  }, [num]);
  const now = new Date();
  while (new Date().valueOf() - now.valueOf() < 200) {}
  return (
    <div style={{ flex: 1 }}>
      <p>useEffect</p>
      <div>num:{num}</div>
      <Button
        onClick={() => {
          setNum(1);
        }}
      >
        click
      </Button>
    </div>
  );
};
const UseLayoutEffectDemo = () => {
  const [num, setNum] = useState(0);
  useLayoutEffect(() => {
    if (num === 1) {
      setNum(Math.random());
    }
  });
  const now = new Date();
  while (new Date().valueOf() - now.valueOf() < 200) {}
  return (
    <div style={{ flex: 1 }}>
      <p>useLayoutEffect</p>
      <div>num:{num}</div>
      <Button
        onClick={() => {
          setNum(1);
        }}
      >
        click
      </Button>
    </div>
  );
};
export const UseEffectInt = () => {
  return (
    <Card title="useEffect和useLayoutEffect区别">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}
      >
        <UseEffectDemo />
        <UseLayoutEffectDemo />
      </div>
    </Card>
  );
};

export default UseEffectInt;
