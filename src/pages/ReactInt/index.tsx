import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import { LazyInt } from './components/LazyInt';
import { SetStateFn } from './components/SetStateFn';
import { StopPropagation } from './components/Stoppropagation';
import {
  UseContextCombineUseReducer,
  UseContextInt,
} from './components/UseContextInt';
import { UseImperativeHandleInt } from './components/UseImperativeHandleInt';
import { UseReducerInt } from './components/UseReducerInt';
import { UseSyncExternalStoreInt } from './components/UseSyncExternalStoreInt';

const HomePage: React.FC = () => {
  return (
    <PageContainer ghost>
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <LazyInt />
        <UseSyncExternalStoreInt />
        <UseImperativeHandleInt />
        <StopPropagation />
        <SetStateFn />
        <UseContextInt />
        <UseReducerInt />
        <UseContextCombineUseReducer />
      </Space>
    </PageContainer>
  );
};

export default HomePage;
