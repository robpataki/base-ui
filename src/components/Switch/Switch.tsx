import classNames from 'classnames';
import { forwardRef, useState } from 'react';
import { createUniqueId } from '@/helpers/createUniqueId';
import { ConditionalWrapper } from '../ConditionalWrapper';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Switch.module.scss';
import type { SwitchProps } from './Switch.type';

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      isSwitched,
      isDefaultSwitched,
      onChange,
      isDisabled,
      label,
      statusLabelOn = 'ON',
      statusLabelOff = 'OFF',
      isStatusLabelVisible,
      name,
      required,
      id: _id,
      className: _className,
      dataTestId
    },
    ref
  ) => {
    const [isToggled, setIsToggled] = useState(isSwitched || isDefaultSwitched);
    const id = _id || createUniqueId();
    const inputId = `${id}__input`;
    const className = classNames(
      styles.wrapper,
      { [styles['is-disabled']]: isDisabled },
      _className
    );

    const handleOnChange = e => {
      onChange?.(e.target.checked);
      setIsToggled(e.target.checked);
    };

    const statusLabel = isToggled ? statusLabelOn : statusLabelOff;

    return (
      <label htmlFor={inputId} {...{ id, className }} data-testid={dataTestId}>
        <div className={styles.label}>{label}</div>

        <div className={styles.box}>
          <input
            name={name}
            required={required}
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={isSwitched}
            defaultChecked={isDefaultSwitched}
            disabled={isDisabled}
            onChange={handleOnChange}
            className={styles.input}
          />

          <span className={styles.track} aria-hidden="true">
            <span className={styles['track-inner']}>
              <span className={styles['thumb-wrapper']}>
                <span className={styles.thumb}></span>
              </span>
            </span>
          </span>

          <ConditionalWrapper
            condition={!isStatusLabelVisible}
            wrap={children => <VisuallyHidden>{children}</VisuallyHidden>}
          >
            <div className={styles.statusLabel} aria-hidden="true">
              {statusLabel}
            </div>
          </ConditionalWrapper>
        </div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';
