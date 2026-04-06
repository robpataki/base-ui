import classNames from 'classnames';
import { forwardRef } from 'react';
import { COMPONENT_IDS } from '@/constants';
import { createUniqueId } from '@/helpers/createUniqueId';
import { useControllableState } from '@/hooks';
import styles from './Switch.module.scss';
import type { SwitchProps } from './Switch.type';

/**
 *
 * The following CSS classes can be used to style specific parts of the component:
 *
 * |Class|Type|Value|Element|
 * |:---|:---|:---|:---|
 * |Component name|Component|`a1-switch`|Wrapper (`<label>` element)|
 * |Wrapper|Element|`[class*='wrapper']`|Wrapper (`<label>` element)|
 * |Disabled|State|`[class*='is-disabled']`|Wrapper (`<label>` element)|
 * |Input field|Element|`[class*='input']`|`<input>` element|
 * |Label|Element|`[class*='label']`|`<span>` element|
 * |Toggle|Element|`[class*='toggle']`|`<span>` element|
 * |Toggle inner|Element|`[class*='toggle-inner']`|`<span>` element|
 * |Indicator|Element|`[class*='indicator']`|`<span>` element|
 * |Indicator inner|Element|`[class*='indicator-inner']`|`<span>` element|
 *
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      isSwitched,
      isDefaultSwitched = false,
      onChange,
      isDisabled,
      label,
      statusLabelOn = 'ON',
      statusLabelOff = 'OFF',
      isStatusLabelVisible = true,
      name,
      required,
      id: _id,
      className: _className,
      dataTestId
    },
    ref
  ) => {
    const [isChecked, setChecked] = useControllableState<boolean>({
      value: isSwitched,
      defaultValue: isDefaultSwitched,
      onChange: onChange
    });

    const id = _id || createUniqueId();
    const inputId = `${id}__input`;
    const className = classNames(
      COMPONENT_IDS.Switch,
      styles.wrapper,
      { [styles['is-disabled']]: isDisabled },
      _className
    );

    const statusLabel = isChecked ? statusLabelOn : statusLabelOff;

    return (
      <label htmlFor={inputId} {...{ id, className }} data-testid={dataTestId}>
        <div className={styles.label}>{label}</div>

        <div className={styles.controls}>
          <input
            name={name}
            required={required}
            ref={ref}
            id={inputId}
            type="checkbox"
            checked={isChecked}
            disabled={isDisabled}
            onChange={e => setChecked(e.target.checked)}
            className={styles.input}
          />

          <span className={styles.toggle} aria-hidden="true">
            <span className={styles['toggle-inner']}>
              <span className={styles.indicator}>
                <span className={styles['indicator-inner']}></span>
              </span>
            </span>
          </span>

          {isStatusLabelVisible && (
            <div className={styles['status-label']} aria-hidden="true">
              {statusLabel}
            </div>
          )}
        </div>
      </label>
    );
  }
);

Switch.displayName = 'Switch';
