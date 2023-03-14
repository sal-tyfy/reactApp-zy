import { Button, Card, Descriptions } from 'antd';
import { useState } from 'react';
import { useWindowScroll } from '../hooks/useWindowScroll';

export const UseWindowScrollInt = () => {
  const offset = useWindowScroll();
  const [visible, setVisible] = useState(false);
  return (
    <Card
      title="useWindowScroll"
      extra={
        <Button
          type="primary"
          onClick={() => {
            setVisible(!visible);
          }}
        >
          toggle scroll ele
        </Button>
      }
    >
      <Descriptions
        bordered
        labelStyle={{ width: 200 }}
        contentStyle={{ width: 400 }}
      >
        <Descriptions.Item label="window横向滚动距离">
          {offset.x}
        </Descriptions.Item>
        <Descriptions.Item label="window纵向滚动距离">
          {offset.y}
        </Descriptions.Item>
      </Descriptions>
      {visible && (
        <div
          style={{ width: 4000, height: 2000, border: '1px solid #1677ff' }}
        ></div>
      )}
    </Card>
  );
};
