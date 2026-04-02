import type { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types';

export type VisuallyHiddenElementTagName =
  | 'span'
  | 'div'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';

export interface VisuallyHiddenProps extends BaseComponentProps {
  /**
   * The content to be visually hidden but still accessible to screen readers.
   */
  children: ReactNode;
  /**
   * The HTML element to render the content in.
   * @default span
   */
  as?: VisuallyHiddenElementTagName;
}
