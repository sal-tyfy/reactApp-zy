import { selectSort } from './selectSort';
describe('test selectSort', () => {
  test('should sort right', () => {
    const arr = [2, 5, 4, 3, 2, 1, 7, 8];
    expect(selectSort(arr)).toEqual([1, 2, 2, 3, 4, 5, 7, 8]);
  });
});
