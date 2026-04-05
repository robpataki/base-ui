import type { ReactNode } from 'react';

export type ConditionalWrapperProps = {
  /**
   * If true, the wrapper will be applied to the children. If false, the children will be returned without being wrapped.
   */
  condition: boolean;
  /**
   * A function that takes the children as an argument and returns the wrapped children. This will only be called if the condition is true.
   * @param children
   * @returns
   */
  wrap: (children: ReactNode) => ReactNode;
  /**
   * The children to be conditionally wrapped.
   */
  children: ReactNode;
};
