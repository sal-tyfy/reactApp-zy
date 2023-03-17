import { DEV_HOST_NAME_ARR } from './../constants/env';
import { LOGIN_USER_KEY, LOGIN_USER_PASS } from './../constants/sessionStorage';

// 是否是dev环境
export const isDev = () => {
  if (DEV_HOST_NAME_ARR.includes(location.hostname)) {
    return true;
  }
  return false;
};

// 是否需要登录
export const needLogin = () => {
  if (isDev()) {
    return false;
  }
  const user = sessionStorage.getItem(LOGIN_USER_KEY);
  if (user === LOGIN_USER_PASS) {
    return false;
  }
  return true;
};
