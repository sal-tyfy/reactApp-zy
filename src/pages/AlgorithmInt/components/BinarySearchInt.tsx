import {
  Button,
  Card,
  Descriptions,
  Form,
  Input,
  List,
  message,
  Tag,
} from 'antd';
import { useState } from 'react';
import {
  binarySearchDetail,
  BinarySearchDetailResultType,
} from '../utils/binarySearch';

export const BinarySearchInt = () => {
  const [result, setResult] = useState<BinarySearchDetailResultType>();
  const [text, setText] = useState('');
  const [number, setNumber] = useState<number | string>();
  return (
    <Card title="二分查找">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Form.Item
          label="请输入一个数字数组"
          style={{ flex: 1, marginRight: 24 }}
        >
          <Input.TextArea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="请输入要查找的数字" style={{ marginRight: 24 }}>
          <Input
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
            style={{ width: 160 }}
            type="number"
          />
        </Form.Item>
        <Button
          type="primary"
          onClick={() => {
            let searchedArr;
            try {
              searchedArr = JSON.parse(text);
            } catch (e) {
              message.error('请输入一个数组');
              return;
            }
            if (Array.isArray(searchedArr) && searchedArr.length > 0) {
              let flag = false;
              for (let v of searchedArr) {
                if (typeof v !== 'number') {
                  flag = true;
                  break;
                }
              }
              if (flag) {
                message.error('数组元素应该是数字');
                return;
              }
              searchedArr.sort((a, b) => a - b);
              searchedArr = Array.from(new Set(searchedArr));
            } else {
              message.error('请输入一个长度大于0的数组');
              return;
            }

            if (number === undefined || number === null || number === '') {
              message.warning('请输入要查找的数字');
              return;
            }
            const res = binarySearchDetail(searchedArr, Number(number));
            setResult(res);
          }}
        >
          二分查找
        </Button>
      </div>
      {result !== undefined && (
        <div>
          <Descriptions>
            <Descriptions.Item label="查找结果">
              {result?.result ? (
                <Tag color={'success'}> 查找成功</Tag>
              ) : (
                <Tag color={'error'}>查找失败 </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="查找次数">
              {result?.detail.count}
            </Descriptions.Item>
          </Descriptions>
          <List bordered>
            {(result?.detail.everyTimeArr || []).map((item, index) => {
              const compareValue = result.detail.compareNumArr[index];
              const orderIndex = item.indexOf(compareValue);
              return (
                <List.Item key={index}>
                  <div>{`第 ${index + 1} 次查找：`}</div>
                  <div>
                    <div style={{ marginBottom: 8 }}>
                      {item.map((child, index) => {
                        return (
                          <span
                            style={{
                              display: 'inline-block',
                              marginRight: 8,
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: '#1677ff',
                              textAlign: 'center',
                              color: '#fff',
                            }}
                            key={index}
                          >
                            {child}
                          </span>
                        );
                      })}
                    </div>
                    <div>
                      <span
                        style={{
                          display: 'inline-block',
                          width: 24,
                          height: 24,
                          marginLeft: 32 * orderIndex,
                          borderRadius: '50%',
                          background:
                            result.detail.target === compareValue
                              ? 'green'
                              : 'red',
                          textAlign: 'center',
                          color: '#fff',
                        }}
                        key={index}
                      >
                        {result?.detail?.target}
                      </span>
                    </div>
                  </div>
                </List.Item>
              );
            })}
          </List>
        </div>
      )}
    </Card>
  );
};
