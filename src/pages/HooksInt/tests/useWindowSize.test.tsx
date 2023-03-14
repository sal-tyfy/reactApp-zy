import { renderHook } from '@testing-library/react-hooks';
import { useWindowSize } from '../hooks/useWindowSize';
import { fireEvent } from '@testing-library/react';

describe('useWindowSize', () => {
  it('should return current window dimensions', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(typeof result.current).toBe('object');
    expect(typeof result.current.height).toBe('number');
    expect(typeof result.current.width).toBe('number');
    expect(result.current.width).toBe(window.innerWidth);
    expect(result.current.height).toBe(window.innerHeight);
  });

  it('should re-render after height change', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.height).toBe(window.innerHeight);
    window.innerHeight = 360;
    fireEvent.resize(window);
    expect(result.current.height).toBe(360);
    window.innerHeight = 2048;
    fireEvent.resize(window);
    expect(result.current.height).toBe(2048);
  });

  it('should re-render after width change', () => {
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(window.innerWidth);
    window.innerWidth = 360;
    fireEvent.resize(window);
    expect(result.current.width).toBe(360);
    window.innerWidth = 2048;
    fireEvent.resize(window);
    expect(result.current.width).toBe(2048);
  });
});
