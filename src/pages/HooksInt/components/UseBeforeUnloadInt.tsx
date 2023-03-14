import { Button, Card } from 'antd';
import { useState } from 'react';
import { useBeforeUnload } from '../hooks/useBeforeUnload';

const UseBeforeUnloadInt = () => {
  const [enabled, setEnabled] = useState(false);
  useBeforeUnload(enabled);
  return (
    <Card title="useBeforeUnload">
      <div>enable: {enabled.toString()}</div>
      <div>{enabled ? 'try to close or reload the tab' : ''}</div>
      <Button
        style={{ marginTop: 24 }}
        type="primary"
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        toggle enable
      </Button>
    </Card>
  );
};
export default UseBeforeUnloadInt;
