import { useCallback, useState } from 'react';

/**
 * Parameters for a controllable state hook.
 *
 * @template T - The type of the state value
 * @property {T} [value] - The controlled value. When provided, the state becomes controlled.
 * @property {T} defaultValue - The initial/default value when the component is uncontrolled.
 * @property {(value: T) => void} [onChange] - Callback function invoked when the state value changes.
 */
type Params<T> = {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
};

export function useControllableState<T>({ value, defaultValue, onChange }: Params<T>) {
  const [internal, setInternal] = useState(defaultValue);

  const isControlled = value !== undefined;
  const state = isControlled ? value : internal;

  const setState = useCallback(
    (nextValue: T) => {
      if (!isControlled) {
        setInternal(nextValue);
      }
      onChange?.(nextValue);
    },
    [isControlled, onChange]
  );

  return [state, setState] as const;
}
