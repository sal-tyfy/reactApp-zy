// 整数转32位二进制数
export const printBit = (num: number): string => {
  let str = '';
  for (let i = 31; i >= 0; i -= 1) {
    const tempNum = (num & (1 << i)) === 0 ? 0 : 1;
    str = str.concat(tempNum.toString());
  }
  return str;
};
