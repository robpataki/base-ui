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
    label: 'Personalised experience',
    statusLabelOn: 'Yes, please',
    statusLabelOff: 'No, thank you',
    isStatusLabelVisible: true,
    isDisabled: false,
    onChange: action('onChange')
  }
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ControlledState: Story = {
  args: {
    isSwitched: true
  }
};

export const UncontrolledState: Story = {
  args: {
    isDefaultSwitched: true
  }
};

export const HideStatusLabel: Story = {
  args: {
    isStatusLabelVisible: false
  }
};

export const Disabled: Story = {
  args: {
    isDisabled: true
  }
};
