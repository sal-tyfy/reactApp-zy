import { Button, Card } from 'antd';
import { memo, useState } from 'react';

const SlowedList = () => {
  const now = performance.now();
  while (performance.now() - now < 800) {}
  return (
    <ul style={{ border: '1px solid #1677ff' }}>
      <li> I am very slow</li>
      <li> I am very slow</li>
      <li> I am very slow</li>
    </ul>
  );
};
const MemoSlowedList = memo(SlowedList);
const Demo = () => {
  const [isDark, setIsDark] = useState(false);
  let style = {
    background: '#1677ff',
    color: '#000',
    height: 100,
  };
  if (isDark) {
    style = {
      background: '#000',
      color: '#fff',
      height: 100,
    };
  }
  return (
    <div>
      <Button
        style={{ marginBottom: 24 }}
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        toggle color
      </Button>
      <div style={style}></div>
      <SlowedList />
    </div>
  );
};
const OptimizedDemo = () => {
  const [isDark, setIsDark] = useState(false);
  let style = {
    background: '#1677ff',
    color: '#000',
    height: 100,
  };
  if (isDark) {
    style = {
      background: '#000',
      color: '#fff',
      height: 100,
    };
  }
  return (
    <div>
      <Button
        style={{ marginBottom: 24 }}
        onClick={() => {
          setIsDark(!isDark);
        }}
      >
        toggle color
      </Button>
      <div style={style}></div>
      <MemoSlowedList />
    </div>
  );
};
export const MemoInt = () => {
  return (
    <Card title="memo基本用法——避免重复渲染">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <h4>使用memo</h4>
          <OptimizedDemo />
        </div>
        <div style={{ flex: 1 }}>
          <h4>不使用memo</h4>
          <Demo />
        </div>
      </div>
    </Card>
  );
};

export default MemoInt;
