import { Button, Card, Input, Space } from 'antd';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const UseLocalStorageStateInt = () => {
  const [num, setNum] = useLocalStorageState('number', 0);
  const [visible, setVisible] = useLocalStorageState('boolean', false);
  const [text, setText] = useLocalStorageState('text', '');
  return (
    <Card title="useLocalStorageState">
      <div style={{ marginBottom: 24 }}>{`num : ${num}`}</div>
      <div style={{ marginBottom: 24 }}>{`visible : ${visible}`}</div>
      <Space>
        <Button
          type="primary"
          onClick={() => {
            setNum(num + 1);
          }}
        >
          add
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setNum(num - 1);
          }}
        >
          minus
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          toggle visible
        </Button>
      </Space>
      <div style={{ marginTop: 24 }}>
        <Input
          style={{ width: 300 }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
      </div>
    </Card>
  );
};
