import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import { MyButtonWrapper } from './components/MyButton';

const ComponentsInt = () => {
  return (
    <PageContainer title="components">
      <Space style={{ width: '100%' }} direction="vertical" size={24}>
        <MyButtonWrapper />
      </Space>
    </PageContainer>
  );
};
export default ComponentsInt;
