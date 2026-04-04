import type { BaseComponentProps } from '@/types';

export interface ToggleButtonProps extends BaseComponentProps {
  /**
   * Provides an accessible name
   */
  label: string;
  /**
   * Provides an accessible name when in toggled state
   */
  labelToggled?: string;
  /**
   * Event callback to handle toggle state changes
   */
  onChange?: (isToggled: boolean) => void;
  /**
   * Set toggled state
   * @default false
   */
  isToggled?: boolean;
}
