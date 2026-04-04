import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { ToggleButton } from './ToggleButton';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  args: {
    label: 'Username',
    onChange: action('onChange')
  }
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
