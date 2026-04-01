import type { InputHTMLAttributes } from 'react';

type TextInputBase = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'placeholder' | 'aria-label' | 'disabled'> & {
  /**
   * Error message to display below the input
   */
  error?: string;
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
export type TextInputProps = ({ label: string; 'aria-label'?: string } | { label?: string; 'aria-label': string }) & TextInputBase;
