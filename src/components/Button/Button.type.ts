import type { InputHTMLAttributes, ReactNode } from 'react';
import type { BaseComponentProps } from '@/types';

export type ButtonProps = Omit<
  InputHTMLAttributes<HTMLButtonElement>,
  'type' | 'disabled' | 'data-testid' | 'id' | 'className'
> &
  BaseComponentProps & {
    children?: ReactNode;
    isDisabled?: boolean;
  };
