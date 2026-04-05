import type { InputHTMLAttributes } from 'react';

type TextInputBase = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'placeholder' | 'aria-label' | 'disabled'
> & {
  /**
   * Error message to display below the input. When provided, the error state is triggered internally and the `.is-error` class is applied to the component.
   */
  error?: string;
  /**
   * Prefix to display before the error message. Only shown when `error` is provided.
   */
  errorPrefix?: string;
  /**
   * Helper text to display below the input
   */
  hint?: string;
  /**
   * Whether the input is disabled
   * @default false
   */
  isDisabled?: boolean;
};

/**
 * Either `label` or `aria-label` must be provided for accessibility
 */
export type TextInputProps =
  /* Either label or aria-label must be provided */
  ({ label: string; 'aria-label'?: string } | { label?: string; 'aria-label': string }) &
    TextInputBase;
