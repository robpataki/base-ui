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
    label: 'Lights off',
    labelToggled: 'Lights on',
    isToggled: true,
    onChange: action('onChange')
  }
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
