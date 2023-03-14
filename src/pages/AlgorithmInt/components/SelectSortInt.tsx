import { Button, Card, Input, message, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getArrayStr, getParsedResFromStr, isNumArray } from '../utils';
import { insertSortDetail, InsertSortDetailType } from '../utils/insertSort';

export const SelectSortInt = () => {
  const [text, setText] = useState('[1,4,2,1,3,5,3,7,5,2,1,4,2,1,3]');
  const [result, setResult] = useState<InsertSortDetailType | null>(null);
  const originalArr = result?.originalArr;
  const [snapshot, setSnapshot] =
    useState<InsertSortDetailType['indexSnapshot'][number]>();
  const ref = useRef(0);
  useEffect(() => {
    if (result) {
      const timer = setInterval(() => {
        setSnapshot(result.indexSnapshot[ref.current]);
        if (ref.current === result.indexSnapshot.length - 1) {
          clearInterval(timer);
          return;
        }
        ref.current += 1;
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [result]);
  return (
    <Card title="插入排序">
      <Space style={{ marginBottom: 24 }}>
        <Input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{ width: 300 }}
        />
        <Button
          type="primary"
          onClick={() => {
            setResult(null);
            setSnapshot(undefined);
            ref.current = 0;
            const res = getParsedResFromStr(text);
            if (isNumArray(res)) {
              const sortDetail = insertSortDetail(res);
              setResult(sortDetail);
            } else {
              message.warning('请输入一个数组');
            }
          }}
        >
          插入排序
        </Button>
        <Button
          onClick={() => {
            const arr = [];
            for (let i = 0; i < 10; i += 1) {
              arr.push(Math.floor(Math.random() * 10 + 1));
            }
            setText(getArrayStr(arr));
          }}
        >
          随机数组
        </Button>
      </Space>
      {result !== null && (
        <div style={{ position: 'relative', height: 200 }}>
          {originalArr?.map((item, index) => {
            let height = 24;
            const maxVal = Math.max(...originalArr);
            if (item < 0) {
              height = 24;
            } else if (item < Math.floor(maxVal / 8)) {
              height = 24;
            } else {
              height = Math.floor((item / maxVal) * 192);
            }
            const indexArr = snapshot?.indexArr || [];
            const focused =
              snapshot?.focusIndex?.indexOf(index) !== -1 &&
              snapshot?.focusIndex !== null &&
              snapshot?.focusIndex !== undefined;
            const posIndex = indexArr.indexOf(index);
            let left = index * 40;
            if (posIndex !== -1) {
              left = posIndex * 40;
            }
            let style = {};
            if (focused) {
              style = { background: '#1677ff', color: '#fff' };
            }
            return (
              <span
                style={{
                  display: 'inline-block',
                  width: 24,
                  height,
                  background: '#fff',
                  color: '#000',
                  textAlign: 'center',
                  position: 'absolute',
                  transition: 'left 1.5s',
                  left,
                  bottom: 0,
                  border: '1px solid #000',
                  ...style,
                }}
                key={index}
              >
                {item}
              </span>
            );
          })}
        </div>
      )}
    </Card>
  );
};
