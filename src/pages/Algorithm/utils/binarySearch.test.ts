import { binarySearch, binarySearchDetail } from './binarySearch';

describe('binarySearch', () => {
  test('should return true', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 5)).toBe(true);
  });
  test('should not return true', () => {
    const arr = [1, 2, 3, 4, 5];
    expect(binarySearch(arr, 6)).toBe(false);
  });
});

describe('binarySearchDetail', () => {
  test('should return true', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = binarySearchDetail(arr, 5);
    expect(res.result).toBe(true);
    expect(res.detail.count).toBe(3);
    expect(res.detail.compareNumArr).toEqual([3, 4, 5]);
  });
  test('should not return true', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = binarySearchDetail(arr, 6);
    expect(res.result).toBe(false);
    expect(res.detail.count).toBe(3);
    expect(res.detail.compareNumArr).toEqual([3, 4, 5]);
  });
  test('should find first', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = binarySearchDetail(arr, 3);
    expect(res.result).toBe(true);
    expect(res.detail.count).toBe(1);
    expect(res.detail.compareNumArr).toEqual([3]);
  });
  test('should find 1', () => {
    const arr = [1, 2, 3, 4, 5];
    const res = binarySearchDetail(arr, 1);
    expect(res.result).toBe(true);
    expect(res.detail.count).toBe(2);
    expect(res.detail.compareNumArr).toEqual([3, 1]);
  });
  test('have one ele and find', () => {
    const arr = [3];
    const res = binarySearchDetail(arr, 3);
    expect(res.result).toBe(true);
    expect(res.detail.count).toBe(1);
    expect(res.detail.compareNumArr).toEqual([3]);
  });
  test('have one ele and cannot find', () => {
    const arr = [3];
    const res = binarySearchDetail(arr, 4);
    expect(res.result).toBe(false);
    expect(res.detail.count).toBe(1);
    expect(res.detail.compareNumArr).toEqual([3]);
  });
});
