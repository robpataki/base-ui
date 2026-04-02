import classNames from 'classnames';
import { forwardRef } from 'react';
import { COMPONENT_IDS } from '@/constants';
import { createUniqueId } from '@/helpers/createUniqueId';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import styles from './TextInput.module.scss';
import type { TextInputProps } from './TextInput.type';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    label,
    error,
    errorPrefix = 'Error',
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
    COMPONENT_IDS.TextInput,
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
          {errorPrefix && <VisuallyHidden>{errorPrefix}: </VisuallyHidden>}
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
