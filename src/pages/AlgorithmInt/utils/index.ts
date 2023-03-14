// 判断一个元素是不是数字数组
export const isNumArray = (input: unknown): boolean => {
  if (Array.isArray(input)) {
    let flag = true;
    for (let v of input) {
      if (typeof v !== 'number') {
        flag = false;
        break;
      }
    }
    return flag;
  } else {
    return false;
  }
};

// 字符串解析为对象或者数组
export const getParsedResFromStr = (input: unknown) => {
  let parsedRes;
  if (typeof input === 'string') {
    try {
      parsedRes = JSON.parse(input);
    } catch (e) {
      console.error(e);
    }
  } else {
    parsedRes = input;
  }
  return parsedRes;
};

// 数组转字符串
export const getArrayStr = (arr: unknown[]): string => {
  const res = `[${arr.toString()}]`;
  return res;
};
