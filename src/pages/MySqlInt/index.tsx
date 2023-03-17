import { QuestionsCom, QuestionType } from '@/components';
import { PageContainer } from '@ant-design/pro-components';

const questions: QuestionType[] = [
  { q: 'mysql用户名和密码?', a: '用户名: root\n密码: password' },
  {
    q: '如何启动和关闭mysql服务?',
    a: '以管理员身份运行;\n启动mysql: net start mysql80;\n关闭mysql: net stop mysql80;',
  },
  {
    q: '如何连接myql?',
    a: 'mysql -u root -p',
  },
  {
    q: 'sql分类?',
    a: 'DDL: 用来定义数据库、表、字段；\nDML: 对数据进行增删改;\n DQL: 查;\nDCL: 创建用户、控制权限',
  },
  {
    q: 'DDL-查询所有数据库?',
    a: 'show databases',
  },
  {
    q: '创建数据库?',
    a: 'create database',
  },
  {
    q: '删除数据库?',
    a: 'drop database',
  },
  {
    q: '使用数据库?',
    a: 'use',
  },
  {
    q: '查询当前数据库?',
    a: 'select database()',
  },
];
const MySqlInt = () => {
  return (
    <PageContainer>
      <QuestionsCom questions={questions} />
    </PageContainer>
  );
};
export default MySqlInt;
