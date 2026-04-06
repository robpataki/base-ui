import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  args: {
    children: 'Click me',
    isDisabled: false,
    onChange: action('onChange')
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    isDisabled: true
  }
};
