import { Button, Card, message } from 'antd';
import { useState } from 'react';

export const StopPropagation = () => {
  const [stopPropagation, setStopProgapation] = useState(false);
  return (
    <Card title="React阻止事件冒泡">
      <div
        onClick={() => {
          message.success('the div was clicked.');
        }}
        style={{
          border: '1px solid #1677ff',
          cursor: 'pointer',
          minHeight: 40,
          padding: 24,
          marginBottom: 24,
        }}
      >
        <Button
          type="primary"
          onClick={(e) => {
            if (stopPropagation) {
              e.stopPropagation();
            }
            message.success('the button was clicked.');
          }}
        >
          click to message
        </Button>
      </div>
      <Button
        style={{ marginRight: 24 }}
        onClick={() => {
          setStopProgapation(!stopPropagation);
        }}
      >
        toggle propagation
      </Button>
      <span>stopPropagation: {stopPropagation.toString()}</span>
    </Card>
  );
};
