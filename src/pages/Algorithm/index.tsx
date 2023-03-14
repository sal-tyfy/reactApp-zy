import { QuestionsCom } from '@/components';
import { PageContainer } from '@ant-design/pro-components';
import { Space } from 'antd';
import { BinarySearchInt } from './components/BinarySearchInt';
import { BubbleSortInt } from './components/BubbleSortInt';
import { PrintBitInt } from './components/PrintBit';

const questions = [
  {
    q: '什么是二维数组',
    a: '数组的元素也是一个数组',
  },
];

const AlgorithmCom = () => {
  return (
    <PageContainer title="AlgorithmCom">
      <Space style={{ width: '100%' }} direction="vertical" size={24}>
        <PrintBitInt />
        <BubbleSortInt />
        <BinarySearchInt />
        <QuestionsCom questions={questions} />
      </Space>
    </PageContainer>
  );
};
export default AlgorithmCom;
