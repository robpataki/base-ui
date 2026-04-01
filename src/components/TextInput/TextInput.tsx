import classNames from 'classnames';
import { forwardRef } from 'react';
import { createUniqueId } from '@/helpers/createUniqueId';
import styles from './TextInput.module.scss';
import type { TextInputProps } from './TextInput.type';

/**
 * TextInput component for user text input with optional label, error, and helper text.
 *
 * @example
 * ```tsx
 * <TextInput
 *   label="Email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 * />
 * ```
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    label,
    error,
    hint,
    isDisabled,
    id: _id,
    className: _className,
    ...rest
  } = props;

  const id = _id || createUniqueId();
  const inputId = `${id}__input`;
  const errorId = `${id}__error`;
  const hintId = `${id}__hint`;

  const className = classNames(
    styles.wrapper,
    {
      [styles['is-error']]: error,
      [styles['is-disabled']]: isDisabled
    },
    _className
  );

  const ariaDescribedBy =
    [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div {...{ className, id }}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      {error && (
        <div id={errorId} className={styles.error}>
          {error}
        </div>
      )}
      <input
        {...rest}
        ref={ref}
        id={inputId}
        type='text'
        disabled={isDisabled}
        className={styles.input}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy || undefined}
      />
      {hint && (
        <div id={hintId} className={styles.hint}>
          {hint}
        </div>
      )}
    </div>
  );
});

TextInput.displayName = 'TextInput';
