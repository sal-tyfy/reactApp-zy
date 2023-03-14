export const insertSort = (arr: number[]) => {
  const len = arr.length;
  for (let i = 1; i < len; i += 1) {
    for (let j = i; j > 0; j -= 1) {
      if (arr[j] < arr[j - 1]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
      } else {
        break;
      }
    }
  }
  return arr;
};

export interface InsertSortDetailType {
  originalArr: number[];
  resultArr: number[];
  indexSnapshot: {
    indexArr: number[];
    focusIndex: number[] | null;
    focusNumber: number[] | null;
  }[];
}
export const insertSortDetail = (arr: number[]): InsertSortDetailType => {
  const originalArr = [...arr];
  let indexSnapshot: {
    indexArr: number[];
    focusIndex: number[] | null;
    focusNumber: number[] | null;
  }[] = [];
  const indexArr: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    indexArr.push(i);
  }
  // indexSnapshot.push({
  //   indexArr: [...indexArr],
  //   focusIndex: null,
  //   focusNumber: null,
  // });
  const len = arr.length;
  for (let i = 1; i < len; i += 1) {
    indexSnapshot.push({
      indexArr: [...indexArr],
      focusIndex: [indexArr[i]],
      focusNumber: null,
    });
    for (let j = i; j > 0; j -= 1) {
      if (arr[j] < arr[j - 1]) {
        const temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;
        const tempIndex = indexArr[j - 1];
        indexArr[j - 1] = indexArr[j];
        indexArr[j] = tempIndex;
        indexSnapshot.push({
          indexArr: [...indexArr],
          focusIndex: [indexArr[j - 1]],
          focusNumber: [arr[j], arr[j - 1]],
        });
      } else {
        break;
      }
    }
    // indexSnapshot.push({
    //   indexArr: [...indexArr],
    //   focusIndex: [indexArr[i]],
    //   focusNumber: null,
    // });
  }
  indexSnapshot.push({
    indexArr: [...indexArr],
    focusIndex: null,
    focusNumber: null,
  });
  return {
    originalArr,
    resultArr: arr,
    indexSnapshot,
  };
};
