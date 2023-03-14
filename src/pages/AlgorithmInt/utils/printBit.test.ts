import { printBit } from './printBit';

describe('test printBit', () => {
  test('should return 64 bit', () => {
    expect(printBit(0)).toBe('00000000000000000000000000000000');
    expect(printBit(1)).toBe('00000000000000000000000000000001');
    expect(printBit(2)).toBe('00000000000000000000000000000010');
    expect(printBit(3)).toBe('00000000000000000000000000000011');
    expect(printBit(8)).toBe('00000000000000000000000000001000');
  });
});
