// 是否在后台页面
export const isInAdmin = (): boolean => {
  const flag = location.pathname.startsWith('/admin');
  return flag;
};
