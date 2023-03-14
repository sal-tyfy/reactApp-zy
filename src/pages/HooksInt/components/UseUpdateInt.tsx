import { Button, Card } from 'antd';
import { useUpdate } from '../hooks/useUpdate';

const UseUpdateInt = () => {
  const update = useUpdate();
  return (
    <Card
      title="useUpdate"
      extra={
        <Button
          type="primary"
          onClick={() => {
            update();
          }}
        >
          update
        </Button>
      }
    >
      <div>
        <span>time: {new Date().toLocaleString()}</span>
      </div>
    </Card>
  );
};

export default UseUpdateInt;
