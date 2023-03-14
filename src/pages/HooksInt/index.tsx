import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import UseBeforeUnloadInt from './components/UseBeforeUnloadInt';
import { UseDocumentTitleInt } from './components/UseDocumentTitleInt';
import UseHoverInt from './components/UseHoverInt';
import UseIntervalInt from './components/UseIntervalInt';
import UseLatestInt from './components/UseLatestInt';
import { UseLocalStorageStateInt } from './components/UseLocalStorageStateInt';
import UseTimeoutFnInt from './components/UseTimeoutFnInt';
import UseToggleInt from './components/UseToggleInt';
import UseUpdateInt from './components/UseUpdateInt';
import { UseWindowScrollInt } from './components/UseWindowScrollInt';
import { UseWindowSizeInt } from './components/UseWindowSizeInt';

const HooksInt = () => {
  return (
    <PageContainer title="HooksInt">
      <Space size={24} style={{ width: '100%' }} direction="vertical">
        <UseLatestInt />
        <UseIntervalInt />
        <UseUpdateInt />
        <UseTimeoutFnInt />
        <UseToggleInt />
        <UseBeforeUnloadInt />
        <UseHoverInt />
        <UseDocumentTitleInt />
        <UseLocalStorageStateInt />
        <UseWindowScrollInt />
        <UseWindowSizeInt />
      </Space>
    </PageContainer>
  );
};
export default HooksInt;
