import type { InputHTMLAttributes } from 'react';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /**
   * The label text for the input
   */
  label?: string;
  /**
   * Error message to display below the input
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Whether the input is in an error state
   */
  isError?: boolean;
}
