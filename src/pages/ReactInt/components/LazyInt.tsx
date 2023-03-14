import { Card, Divider, Input, Skeleton } from 'antd';
import { lazy, Suspense, useDeferredValue, useState } from 'react';

const DelayPreview = lazy(() =>
  new Promise((res) => {
    setTimeout(() => {
      res('ok');
    }, 1000);
  }).then(() => {
    return import('./UseTransitionInt');
  }),
);

export const LazyInt = () => {
  const [visible, setVisible] = useState(false);
  const deferedValue = useDeferredValue(visible);
  return (
    <Card title="Lazy基本用法">
      <label>
        <Input
          checked={visible}
          onChange={(e) => {
            setVisible(e.target.checked);
          }}
          style={{
            width: 32,
            translate: '0 2px',
          }}
          type="checkbox"
        />
        <span style={{ userSelect: 'none' }}>show component</span>
      </label>
      <Divider />
      {deferedValue && (
        <Suspense fallback={<Skeleton active />}>
          <DelayPreview />
        </Suspense>
      )}
    </Card>
  );
};
