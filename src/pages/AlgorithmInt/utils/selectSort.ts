export const selectSort = (arr: number[]) => {
  let temp: number;
  let index: number;
  const len = arr.length;
  for (let i = 0; i < len - 1; i += 1) {
    temp = arr[i];
    index = i;
    for (let j = i + 1; j < len; j += 1) {
      if (arr[j] < temp) {
        temp = arr[j];
        index = j;
      }
    }
    if (index !== i) {
      arr[index] = arr[i];
      arr[i] = temp;
    }
  }
  return arr;
};
