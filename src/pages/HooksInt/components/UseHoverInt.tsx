import { Card } from 'antd';
import { useHover } from '../hooks/useHover';

const UseHoverInt = () => {
  const ele = (
    <div
      onMouseEnter={() => {
        console.log('hover');
      }}
      style={{
        border: '1px solid #000',
        width: 100,
        height: 100,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: '100px',
      }}
    >
      hover me
    </div>
  );
  const [element, hover] = useHover(ele);
  return (
    <Card title="useHover">
      {element}
      {hover ? 'hover' : 'leave'}
    </Card>
  );
};

export default UseHoverInt;
