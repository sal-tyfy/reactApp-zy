import { Button, Card, Descriptions, Input, message, Space } from 'antd';
import { useState } from 'react';
import { getArrayStr, getParsedResFromStr, isNumArray } from '../utils';
import { selectSort } from '../utils/selectSort';

export const SelectSortInt = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState<number[]>([]);
  return (
    <Card title="选择排序">
      <Space style={{ marginBottom: 24 }}>
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult([]);
          }}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => {
            const res = getParsedResFromStr(text);
            if (isNumArray(res)) {
              const sortedArr = selectSort(res);
              setResult(sortedArr);
            } else {
              message.warning('请输入一个数组');
            }
          }}
        >
          sort
        </Button>
      </Space>
      {result.length > 1 && (
        <Descriptions bordered>
          <Descriptions.Item label="原始数组">
            {isNumArray(getParsedResFromStr(text))
              ? getArrayStr(getParsedResFromStr(text))
              : '[]'}
          </Descriptions.Item>
          <Descriptions.Item label="排序后数组">
            {getArrayStr(result)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};
