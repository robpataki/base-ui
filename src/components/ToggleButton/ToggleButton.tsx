import classNames from 'classnames';
import { useState } from 'react';
import VisuallyHidden from '../VisuallyHidden/VisuallyHidden';
import styles from './ToggleButton.module.scss';
import type { ToggleButtonProps } from './ToggleButton.type';

/**
 * Simple toggle button control.
 */
export const ToggleButton = (props: ToggleButtonProps) => {
  const {
    label,
    labelToggled,
    onChange,
    isToggled: _isToggled = false,
    id,
    dataTestId,
    className: _className
  } = props;
  const [isToggled, setIsToggled] = useState(_isToggled);

  const handleClick = () => {
    setIsToggled(!isToggled);
    onChange?.(!isToggled);
  };

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
        <VisuallyHidden>{isToggled ? labelToggled : label}</VisuallyHidden>
        <div className={styles.toggle}></div>
      </button>
    </div>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
