import { Button, Card, Space } from 'antd';
import { useToggle } from '../hooks/useToggle';

const UseToggleInt = () => {
  const [value, toggle] = useToggle(true);
  return (
    <Card title="useToggle">
      <div>state:{value.toString()}</div>
      <Space style={{ marginTop: 24 }}>
        <Button
          type="primary"
          onClick={() => {
            toggle();
          }}
        >
          toggle
        </Button>
        <Button
          onClick={() => {
            toggle(true);
          }}
        >
          toggle true
        </Button>
        <Button
          onClick={() => {
            toggle(false);
          }}
        >
          toggle false
        </Button>
      </Space>
    </Card>
  );
};
export default UseToggleInt;
