import { Button, Card, Descriptions, Input, Space } from 'antd';
import { Fragment, useState } from 'react';
import { printBit } from '../utils/printBit';

export const PrintBitInt = () => {
  const [number, setNumber] = useState<number | string>('');
  const [resultArr, setResultArr] = useState<
    { originalNum: string; result: string }[]
  >([]);
  return (
    <Card title="位运算(整数转换为32位二进制数)">
      <Space style={{ marginBottom: 24 }}>
        <Input
          value={number}
          onChange={(e) => {
            const v = e.target.value;
            setNumber(v);
          }}
          type="number"
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => {
            if (number !== '') {
              const res = printBit(Number(number));
              setResultArr([
                ...resultArr,
                {
                  originalNum: number.toString(),
                  result: res,
                },
              ]);
              setNumber('');
            }
          }}
        >
          转换
        </Button>
        <Button
          onClick={() => {
            setResultArr([]);
          }}
        >
          清空
        </Button>
      </Space>
      {resultArr.length > 0 && (
        <Descriptions column={2} bordered>
          {resultArr.map((item, index) => {
            return (
              <Fragment key={index}>
                <Descriptions.Item label={'原始数字'}>
                  {item.originalNum}
                </Descriptions.Item>
                <Descriptions.Item label={'32位二进制数字'}>
                  {item.result}
                </Descriptions.Item>
              </Fragment>
            );
          })}
        </Descriptions>
      )}
    </Card>
  );
};
