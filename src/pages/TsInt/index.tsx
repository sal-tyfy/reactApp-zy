import { QuestionsCom, QuestionType } from '@/components';
import { PageContainer } from '@ant-design/pro-components';

const questions: QuestionType[] = [
  {
    q: 'any和unknown的区别?',
    a: 'any相当于放弃了类型检查;\nunknown是让类型检查更加严格,比如函数中入参的类型可能是undefined或者null之类的,需要对于异常情况考虑更全面;',
  },
];
const TsInt = () => {
  return (
    <PageContainer title="TS">
      <QuestionsCom questions={questions} />
    </PageContainer>
  );
};
export default TsInt;
