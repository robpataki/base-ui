import classNames from 'classnames';
import { forwardRef } from 'react';
import { COMPONENT_IDS, DEFAULT_ERROR_PREFIX } from '@/constants';
import { createUniqueId } from '@/helpers/createUniqueId';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './TextArea.module.scss';
import type { TextAreaProps } from './TextArea.type';

/**
 *
 * The following CSS classes can be used to style specific parts of the component:
 *
 * |Class|Type|Value|Element|
 * |:---|:---|:---|:---|
 * |Component name|Component|`a1-text-area`|Wrapper|
 * |Wrapper|Element|`[class*='wrapper']`|Wrapper|
 * |Error|State|`[class*='is-error']`|Wrapper|
 * |Disabled|State|`[class*='is-disabled']`|Wrapper|
 * |Textarea field|Element|`[class*='textarea']`|`<textarea>` element|
 * |Label|Element|`[class*='label']`|`<label>` element|
 * |Hint text|Element|`[class*='hint']`|Hint text element|
 * |Error text|Element|`[class*='error']`|Error text element|
 *
 */
export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    label,
    error,
    errorPrefix = DEFAULT_ERROR_PREFIX,
    hint,
    isDisabled,
    id: _id,
    className: _className,
    ...rest
  } = props;

  const id = _id || createUniqueId();
  const textareaId = `${id}__textarea`;
  const errorId = `${id}__error`;
  const hintId = `${id}__hint`;

  const className = classNames(
    COMPONENT_IDS.TextArea,
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
        <label htmlFor={textareaId} className={styles.label}>
          {label}
        </label>
      )}
      {error && (
        <div id={errorId} className={styles.error}>
          {errorPrefix && <VisuallyHidden>{errorPrefix}: </VisuallyHidden>}
          {error}
        </div>
      )}
      <textarea
        {...rest}
        ref={ref}
        id={textareaId}
        disabled={isDisabled}
        className={styles.textarea}
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

TextArea.displayName = 'TextArea';
