export const bubbleSort = (arr: number[]) => {
  const length = arr.length;
  for (let i = 0; i < length - 1; i += 1) {
    for (let j = 0; j < length - 1 - i; j += 1) {
      const temp = arr[j];
      if (arr[j] > arr[j + 1]) {
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
};
