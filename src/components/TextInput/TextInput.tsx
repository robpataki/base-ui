import { forwardRef } from 'react';
import styles from './TextInput.module.scss';
import type { TextInputProps } from './TextInput.type';

/**
 * TextInput component for user text input with optional label, error, and helper text.
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   error={emailError}
 *   isError={!!emailError}
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, helperText, isError = false, disabled = false, id, className, ...rest }, ref) => {
    const inputId = id || `text-input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={styles['form-control']}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          {...rest}
          ref={ref}
          id={inputId}
          type='text'
          disabled={disabled}
          className={`${styles.input} ${isError ? styles.error : ''} ${disabled ? styles.disabled : ''} ${className || ''}`}
          aria-invalid={isError}
          aria-describedby={error || helperText ? `${inputId}-message` : undefined}
        />
        {(error || helperText) && (
          <span
            id={`${inputId}-message`}
            className={`${styles.message} ${error ? styles.errorMessage : styles.helperText}`}
            role={error ? 'alert' : undefined}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
