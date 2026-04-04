import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import styles from './ToggleButton.module.scss';
import type { ToggleButtonProps } from './ToggleButton.type';

/**
 * Simple toggle button control.
 */
export const ToggleButton = (props: ToggleButtonProps) => {
  const {
    label,
    onChange,
    isToggled: _isToggled = false,
    id,
    dataTestId,
    className: _className
  } = props;
  const isFirstToggle = useRef<boolean>(true);

  const [isToggled, setIsToggled] = useState(false);
  const handleClick = () => {
    setIsToggled(!isToggled);
  };

  useEffect(() => {
    if (!isFirstToggle.current) {
      if (onChange) {
        onChange(isToggled);
      }
    } else {
      isFirstToggle.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isToggled]);

  useEffect(() => {
    if (_isToggled) {
      setIsToggled(_isToggled);
    }
  }, [_isToggled]);

  const className = classNames(
    styles.wrapper,
    {
      [styles['is-toggled']]: isToggled
    },
    _className
  );

  return (
    <div
      {...{ id, className }}
      data-testid={dataTestId}
      aria-live='polite'
      aria-atomic='true'
    >
      <button
        type='button'
        onClick={handleClick}
        className={styles.button}
        aria-pressed={isToggled}
      >
        <VisuallyHidden>
          {label} {isToggled ? 'ON' : 'OFF'}
        </VisuallyHidden>
        <div className={styles.toggle}></div>
      </button>
    </div>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
