import { PageContainer, PageLoading } from '@ant-design/pro-components';
import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { UseDeferedValueInt } from '../ReactInt/components/UseDeferedValueInt';
import { UseEffectInt } from '../ReactInt/components/UseEffectInt';
import { MemoInt } from '../ReactInt/components/MemoInt';
import { UseTransitionInt } from '../ReactInt/components/UseTransitionInt';

const AccessPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer
      ghost
      header={{
        title: 'SlowRender',
      }}
    >
      {loading ? (
        <PageLoading />
      ) : (
        <Space direction="vertical" size={24} style={{ width: '100%' }}>
          <UseTransitionInt />
          <MemoInt />
          <UseDeferedValueInt />
          <UseEffectInt />
        </Space>
      )}
    </PageContainer>
  );
};

export default AccessPage;
