import { Card, Space } from 'antd';

export interface QuestionType {
  q: string;
  a: string;
}
export const QuestionsCom: React.FC<{
  questions: QuestionType[];
}> = ({ questions }) => {
  const dom = questions.map((item) => {
    const answerArr = item.a.split('\n');
    return (
      <Card title={item.q} key={item.q}>
        {answerArr.map((aItem, index) => {
          return (
            <div key={index}>
              <div>{aItem}</div>
            </div>
          );
        })}
      </Card>
    );
  });
  return (
    <Space style={{ width: '100%' }} direction="vertical" size={24}>
      {dom}
    </Space>
  );
};
