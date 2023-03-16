import { LOGIN_USER_KEY, LOGIN_USER_PASS } from '@/constants/sessionStorage';
import { needLogin } from '@/utils/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message, Tabs } from 'antd';

export default () => {
  if (!needLogin()) {
    history.push('/');
  }
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: 'calc(100vh - 48px)',
        margin: -24,
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        title="Int"
        subTitle="zy"
        onFinish={(value) => {
          if (value.username === 'zy' && value.password === 'zy') {
            sessionStorage.setItem(LOGIN_USER_KEY, LOGIN_USER_PASS);
            history.push('/');
            return Promise.resolve(true);
          } else {
            return new Promise((res, rej) => {
              setTimeout(() => {
                message.error('用户名或密码错误');
                rej('error');
              }, 2000);
            });
          }
        }}
      >
        <Tabs centered activeKey={'account'}>
          <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
        </Tabs>

        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名: admin or user'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码: ant.design'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginFormPage>
    </div>
  );
};
