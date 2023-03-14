import { Card } from 'antd';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export const UseDocumentTitleInt = () => {
  useDocumentTitle('useDocumentTitle');
  return <Card title="useDocumentTitle">useDocumentTitle</Card>;
};
