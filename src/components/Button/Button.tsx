import classNames from 'classnames';
import { forwardRef } from 'react';
import { COMPONENT_IDS } from '@/constants';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.type';

/**
 *
 * The following CSS classes can be used to style specific parts of the component:
 *
 * |Class|Type|Value|Element|
 * |:---|:---|:---|:---|
 * |Component name|Component|`a1-button`|Wrapper (`<button>` element)|
 * |Wrapper|Element|`[class*='wrapper']`|Wrapper (`<button>` element)|
 * |Disabled|State|`[class*='is-disabled']`|Wrapper (`<button>` element)|
 *
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { id, className: _className, dataTestId, children, isDisabled, ...rest } = props;
  const className = classNames(
    COMPONENT_IDS.Button,
    styles.wrapper,
    { [styles['is-disabled']]: isDisabled },
    _className
  );

  return (
    <button
      {...{ id, className, ref }}
      data-testid={dataTestId}
      disabled={isDisabled}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
