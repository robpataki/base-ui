import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  describe('Uncontrolled mode', () => {
    it('should use defaultValue as the initial state', () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 'initial' })
      );

      expect(result.current[0]).toBe('initial');
    });

    it('should update the state when setState is called', () => {
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 'initial' })
      );

      act(() => {
        result.current[1]('new-value');
      });

      expect(result.current[0]).toBe('new-value');
    });

    it('should call onChange when the state changes', () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState({ defaultValue: 'initial', onChange: mockOnChange })
      );

      act(() => {
        result.current[1]('changed');
      });

      expect(mockOnChange).toHaveBeenCalledWith('changed');
    });
  });

  describe('Controlled mode', () => {
    it('should prefer the provided value over defaultValue', () => {
      const { result } = renderHook(() =>
        useControllableState({ value: 'controlled', defaultValue: 'initial' })
      );

      expect(result.current[0]).toBe('controlled');
    });

    it('should NOT update internal state when setState is called', () => {
      const { result } = renderHook(() =>
        useControllableState({ value: 'controlled', defaultValue: 'initial' })
      );

      act(() => {
        result.current[1]('attempted-change');
      });

      expect(result.current[0]).toBe('controlled');
    });

    it('should still call onChange when setState is called', () => {
      const mockOnChange = vi.fn();
      const { result } = renderHook(() =>
        useControllableState({
          value: 'controlled',
          defaultValue: 'initial',
          onChange: mockOnChange
        })
      );

      act(() => {
        result.current[1]('new-value');
      });

      expect(mockOnChange).toHaveBeenCalledWith('new-value');
    });

    it('should reflect changes to the value prop', () => {
      const { result, rerender } = renderHook(
        ({ val }) => useControllableState({ value: val, defaultValue: 'initial' }),
        { initialProps: { val: 'first' } }
      );

      expect(result.current[0]).toBe('first');

      rerender({ val: 'second' });

      expect(result.current[0]).toBe('second');
    });
  });
});
