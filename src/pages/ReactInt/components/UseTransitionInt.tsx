import { Card, List, Radio } from 'antd';
import { memo, useState, useTransition } from 'react';

const SlowItem = () => {
  const now = performance.now();
  while (performance.now() - now < 5) {}
  return <List.Item style={{ color: '#fff' }}>slow</List.Item>;
};
const arr = new Array(500);
arr.fill(null);
const SlowList = memo(() => {
  return (
    <List
      bordered
      style={{ background: '#1677ff', height: 200, overflow: 'auto' }}
    >
      {arr.map((item, index) => {
        return <SlowItem key={index} />;
      })}
    </List>
  );
});
const SlowDemo = () => {
  const [value, setValue] = useState('fast');
  return (
    <>
      <Radio.Group
        style={{ marginBottom: 24 }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        <Radio.Button value="fast">fast</Radio.Button>
        <Radio.Button value="slow">slow</Radio.Button>
        <Radio.Button value="third">third</Radio.Button>
      </Radio.Group>
      {value === 'fast' || value === 'third' ? (
        <List bordered>
          <List.Item>{value}</List.Item>
        </List>
      ) : (
        <SlowList />
      )}
    </>
  );
};
const TransitionDemo = () => {
  const [, startTransition] = useTransition();
  const [value, setValue] = useState('fast');
  return (
    <>
      <Radio.Group
        style={{ marginBottom: 24 }}
        value={value}
        onChange={(e) => startTransition(() => setValue(e.target.value))}
      >
        <Radio.Button value="fast">fast</Radio.Button>
        <Radio.Button value="slow">slow</Radio.Button>
        <Radio.Button value="third">third</Radio.Button>
      </Radio.Group>
      {value === 'fast' || value === 'third' ? (
        <List bordered>
          <List.Item>{value}</List.Item>
        </List>
      ) : (
        <SlowList />
      )}
    </>
  );
};
export const UseTransitionInt = () => {
  return (
    <Card title="useTransition基本用法">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <h4>useTransition</h4>
          <TransitionDemo />
        </div>
        <div style={{ flex: 1 }}>
          <h4>useState</h4>
          <SlowDemo />
        </div>
      </div>
    </Card>
  );
};
export default UseTransitionInt;
