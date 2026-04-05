import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { Switch } from './Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  args: {
    label: 'Reduce motion',
    statusLabelOn: 'Enabled',
    statusLabelOff: 'Disabled',
    isStatusLabelVisible: true,
    isDisabled: false,
    onChange: action('onChange')
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
