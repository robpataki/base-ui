import type { BaseComponentProps } from '@/types';

export interface ToggleButtonProps extends BaseComponentProps {
  /**
   * Provides an accessible name
   */
  label: string;
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
