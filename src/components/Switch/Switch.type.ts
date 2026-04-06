import type { BaseComponentProps } from '@/types';

export interface SwitchProps extends BaseComponentProps {
  name?: string;
  required?: boolean;
  /**
   * Provides a visible label
   */
  label: string;
  /**
   * Provides a visible status label when switch is ON
   * @default ON
   */
  statusLabelOn?: string;
  /**
   * Provides a visible status label when switch is OFF
   * @default OFF
   */
  statusLabelOff?: string;
  /**
   * Makes the status labels visible when true
   * @default true
   */
  isStatusLabelVisible?: boolean;
  /**
   * Set switched state for a controlled input.
   * @default false
   */
  isSwitched?: boolean;
  /**
   * Set default switched state for an uncontrolled input.
   * @default false
   */
  isDefaultSwitched?: boolean;
  /**
   * Toggles disabled state
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Event callback to handle switch state changes
   */
  onChange?: (isSwitched: boolean) => void;
}
