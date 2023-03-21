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
  {
    q: 'sql语句注意要点',
    a: 'esc可以删除当前行;\n输完语句后要输入;再按回车。',
  },
  {
    q: '显示所有表?',
    a: 'show tables;',
  },
  {
    q: '查看表结构?',
    a: 'desc',
  },
  {
    q: 'mysql数字类型?',
    a: 'tinyint、smallint、mediumint、int、bigint、float、double、decimal',
  },
  {
    q: '字符串类型',
    a: 'char、varchar、tinyblob、tinytext、blob、text、mediummblob、mediumtext、longblob、longtext',
  },
  {
    q: '日期类型',
    a: 'date、time、year、datetime、timestamp',
  },
  {
    q: '表添加字段',
    a: 'alter table 表名 add 字段名 类型',
  },
  {
    q: '修改字段数据类型',
    a: 'alter table modify',
  },
  {
    q: '修改字段名和字段类型',
    a: 'alter table change',
  },
  {
    q: '删除字段',
    a: 'alter table delete',
  },
  {
    q: '修改表名称',
    a: 'alter table rename to',
  },
  {
    q: '删除表',
    a: 'drop table',
  },
  {
    q: '给指定字段添加数据',
    a: 'insert into',
  },
  {
    q: '更新字段',
    a: 'update',
  },
  {
    q: '删除字段',
    a: 'delete from',
  },
  {
    q: '查询字段',
    a: 'select',
  },
  {
    q: '查询去重',
    a: 'distinct',
  },
  {
    q: '聚合函数',
    a: 'count、max、min、avg、sum',
  },
  {
    q: '排序',
    a: 'orderby',
  },
  {
    q: '分页查询',
    a: 'limit',
  },
  {
    q: 'jdbc',
    a: 'java数据库连接',
  },
  {
    q: 'javaee和javase的区别?',
    a: 'javaee是企业版本,功能更全面;javase是基础版本。',
  },
  {
    q: 'servlet生命周期',
    a: 'init、service、destroy',
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
