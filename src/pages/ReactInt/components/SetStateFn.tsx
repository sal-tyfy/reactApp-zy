import { Button, Card } from 'antd';
import { useState } from 'react';

export const SetStateFn = () => {
  const [number, setNumber] = useState(0);
  const [useFn, setUseFn] = useState(false);
  const str = `setNumber((num) => num + 1);`;
  const str2 = ` setNumber(number + 1);`;
  return (
    <Card title="setState 接收一个函数">
      <div style={{ marginBottom: 24 }}>number: {number}</div>
      <div>
        {useFn ? (
          <>
            <pre>{str}</pre>
            <pre>{str}</pre>
            <pre>{str}</pre>
          </>
        ) : (
          <>
            <pre>{str2}</pre>
            <pre>{str2}</pre>
            <pre>{str2}</pre>
          </>
        )}
      </div>
      <Button
        onClick={() => {
          if (useFn) {
            setNumber((num) => num + 1);
            setNumber((num) => num + 1);
            setNumber((num) => num + 1);
          } else {
            setNumber(number + 1);
            setNumber(number + 1);
            setNumber(number + 1);
          }
        }}
        style={{ marginTop: 24, marginBottom: 24 }}
        type="primary"
      >
        click to add
      </Button>
      <br />
      <Button
        style={{ marginRight: 24 }}
        onClick={() => {
          setUseFn(!useFn);
        }}
      >
        toggle
      </Button>
      <span>useFn: {useFn.toString()}</span>
    </Card>
  );
};
