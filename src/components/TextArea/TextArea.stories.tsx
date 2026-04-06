import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { DEFAULT_ERROR_PREFIX } from '@/constants';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'The visible label for the textarea field. Either this or aria-label must be provided.'
    },
    'aria-label': {
      control: 'text',
      description:
        'The aria-label for the textarea field. Either this or label must be provided.'
    },
    isDisabled: {
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    errorPrefix: {
      control: 'text',
      table: {
        defaultValue: { summary: DEFAULT_ERROR_PREFIX }
      }
    },
    onChange: {
      description:
        'Callback function that is called when the textarea value changes. Receives the change event as an argument.'
    }
  },
  args: {
    label: 'Message',
    rows: 4,
    isDisabled: false,
    onChange: action('onChange')
  }
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    maxLength: 100,
    hint: 'Maximum 100 characters or less'
  }
};

export const WithError: Story = {
  args: {
    hint: "Tell us what's going on",
    error: 'Message cannot be empty'
  }
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
    value: 'The sky above the port was the color of television, tuned to a dead channel.',
    hint: 'Message cannot be changed at this time'
  }
};

export const WithValue: Story = {
  args: {
    value: 'A year here and he still dreamed of cyberspace, hope fading nightly.'
  }
};

export const WithDefaultValue: Story = {
  args: {
    defaultValue:
      'The sky above the port was the color of television, tuned to a dead channel.'
  }
};
