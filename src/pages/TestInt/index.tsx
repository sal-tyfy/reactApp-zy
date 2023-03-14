import { QuestionsCom, QuestionType } from '@/components';
import { PageContainer } from '@ant-design/pro-components';

const questions: QuestionType[] = [
  {
    q: 'react中如何测试hook',
    a: '使用renderHook来执行hook\n使用act来触发更新\n使用fireEvent触发事件',
  },
  {
    q: 'react组件如何进行快照测试?',
    a: '使用react-test-renderer的create方法来创建快照\n使用toMatchSnapshot方法检查快照是否匹配\n使用jest --updateSnapshot来更新快照',
  },
];
const TestInt = () => {
  return (
    <PageContainer title="Test">
      <QuestionsCom questions={questions} />
    </PageContainer>
  );
};
export default TestInt;
