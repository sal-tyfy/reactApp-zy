// 二分查找
export const binarySearch = (arr: number[], target: number): boolean => {
  let maxIndex = arr.length - 1;
  let minIndex = 0;
  let middleIndex = Math.floor((maxIndex - minIndex) / 2);
  if (minIndex < maxIndex) {
    if (arr[middleIndex] === target) {
      return true;
    } else if (arr[middleIndex] < target) {
      minIndex = middleIndex + 1;
      maxIndex += 1;
    } else {
      maxIndex = middleIndex;
    }
    const targetArr = arr.slice(minIndex, maxIndex);
    return binarySearch(targetArr, target);
  } else {
    if (arr[minIndex] === target) {
      return true;
    }
  }
  return false;
};

export interface BinarySearchDetailResultType {
  result: boolean;
  detail: {
    count: number;
    compareNumArr: number[];
    everyTimeArr: number[][];
    target: number;
  };
}
// 二分查找显示详情
export const binarySearchDetail = (
  arr: number[],
  target: number,
  detail: {
    count: number;
    compareNumArr: number[];
    everyTimeArr: number[][];
    target: number;
  } = {
    count: 0,
    compareNumArr: [],
    everyTimeArr: [],
    target: 0,
  },
): BinarySearchDetailResultType => {
  let maxIndex = arr.length - 1;
  let minIndex = 0;
  let middleIndex = Math.floor((maxIndex - minIndex) / 2);
  detail.count += 1;
  detail.compareNumArr.push(arr[middleIndex]);
  detail.everyTimeArr.push(arr);
  detail.target = target;
  if (arr[middleIndex] === target) {
    return {
      result: true,
      detail,
    };
  }
  if (minIndex < maxIndex) {
    if (arr[middleIndex] < target) {
      minIndex = middleIndex + 1;
      maxIndex += 1;
    } else {
      maxIndex = middleIndex;
    }
    const targetArr = arr.slice(minIndex, maxIndex);
    return binarySearchDetail(targetArr, target, detail);
  }
  return {
    result: false,
    detail,
  };
};
