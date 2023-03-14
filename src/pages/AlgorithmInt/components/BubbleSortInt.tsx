import { Button, Card, Descriptions, Form, Input, message } from 'antd';
import { useState } from 'react';
import { getArrayStr, getParsedResFromStr, isNumArray } from '../utils';
import { bubbleSort } from '../utils/bubbleSort';

export const BubbleSortInt = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<number[]>();
  return (
    <Card title="冒泡排序">
      <div style={{ display: 'flex' }}>
        <Form.Item
          style={{ flex: 1, marginRight: 24 }}
          label="请输入一个数字数组"
        >
          <Input.TextArea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></Input.TextArea>
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            const parsedRes = getParsedResFromStr(text);
            if (isNumArray(parsedRes)) {
              const res = bubbleSort(parsedRes);
              setResult(res);
            } else {
              message.warning('请输入一个数字数组');
            }
          }}
        >
          冒泡排序
        </Button>
      </div>
      {result && (
        <div>
          <Descriptions bordered>
            <Descriptions.Item label="排序结果">
              {getArrayStr(result)}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Card>
  );
};
