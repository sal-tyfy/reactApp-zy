import { Button, Card, Input, InputRef, Space } from 'antd';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';

const Child = forwardRef<RefHandleType>((props, ref) => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState('');
  useImperativeHandle(
    ref,
    () => {
      return {
        focus: () => inputRef.current?.focus(),
        reset: () => setValue(''),
        random: () => setValue(Math.random().toString()),
      };
    },
    [],
  );
  return (
    <div style={{ padding: 24, border: '1px solid #1677ff', marginBottom: 24 }}>
      <span style={{ marginRight: 16 }}>child</span>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        ref={inputRef}
        style={{ width: 300 }}
      />
    </div>
  );
});
interface RefHandleType {
  focus: () => void;
  random: () => void;
  reset: () => void;
}
export const UseImperativeHandleInt = () => {
  const ref = useRef<RefHandleType>(null);
  return (
    <Card title="useImperativeHandle基础用法">
      <Child ref={ref} />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            ref.current?.focus();
          }}
        >
          focus
        </Button>
        <Button
          onClick={() => {
            ref.current?.random();
          }}
        >
          random
        </Button>
        <Button
          onClick={() => {
            ref.current?.reset();
          }}
        >
          reset
        </Button>
      </Space>
    </Card>
  );
};
