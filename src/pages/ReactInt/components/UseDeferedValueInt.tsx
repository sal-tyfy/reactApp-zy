import { Card, Input, List } from 'antd';
import { memo, useDeferredValue, useState } from 'react';
import { debounce } from 'lodash';

const arr = new Array(50);
arr.fill(null);
const SlowItem = memo(({ text }: { text: string }) => {
  const now = performance.now();
  while (performance.now() - now < 10) {}
  return <List.Item>{text}</List.Item>;
});
const SlowedList = memo(({ val }: { val: string }) => {
  return (
    <List bordered>
      {arr.map((item, index) => {
        return <SlowItem key={index} text={val} />;
      })}
    </List>
  );
});
export const UseDeferedValueInt = () => {
  const [value, setValue] = useState<string>('111');
  const [valueCompare, setValueCompare] = useState<string>('111');
  const [valueCompareDe, setValueCompareDe] = useState<string>('111');
  const deferedValue = useDeferredValue(value);
  const fn = debounce((inputVal) => {
    setValueCompareDe(inputVal);
  }, 300);
  return (
    <Card title="useDeferedValue基础用法——延迟低优先级组件渲染">
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: 24 }}>
          <h4>useDeferedValue</h4>
          <Input
            style={{ width: 300, marginBottom: 24 }}
            value={value}
            onChange={(e) => {
              const intputVal = e.target.value;
              setValue(intputVal);
            }}
          />
          <div style={{ height: 200, overflowY: 'auto' }}>
            <SlowedList val={deferedValue} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h4>useState</h4>
          <Input
            style={{ width: 300, marginBottom: 24 }}
            value={valueCompare}
            onChange={(e) => {
              const intputVal = e.target.value;
              setValueCompare(intputVal);
            }}
          />
          <div style={{ height: 200, overflowY: 'auto' }}>
            <SlowedList val={valueCompare} />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h4>debounce</h4>
          <Input
            defaultValue={'111'}
            style={{ width: 300, marginBottom: 24 }}
            onChange={(e) => {
              const inputVal = e.target.value;
              fn(inputVal);
            }}
          />
          <div style={{ height: 200, overflowY: 'auto' }}>
            <SlowedList val={valueCompareDe} />
          </div>
        </div>
      </div>
    </Card>
  );
};
