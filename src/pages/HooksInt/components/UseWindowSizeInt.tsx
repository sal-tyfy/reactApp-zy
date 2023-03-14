import { Card, Descriptions } from 'antd';
import { useWindowSize } from '../hooks/useWindowSize';

export const UseWindowSizeInt = () => {
  const windowSize = useWindowSize();
  return (
    <Card title="useWindowSize">
      <Descriptions labelStyle={{ width: 200 }} bordered>
        <Descriptions.Item label="文档宽度">
          {windowSize.width}
        </Descriptions.Item>
        <Descriptions.Item label="文档高度">
          {windowSize.height}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};
