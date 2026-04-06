import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { TextInput } from './TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text',
      description:
        'The visible label for the input field. Either this or aria-label must be provided.'
    },
    'aria-label': {
      control: 'text',
      description:
        'The aria-label for the input field. Either this or label must be provided.'
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
        defaultValue: { summary: 'Error' }
      }
    },
    onChange: {
      description:
        'Callback function that is called when the input value changes. Receives the change event as an argument.'
    }
  },
  args: {
    label: 'Username',
    isDisabled: false,
    onChange: action('onChange')
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: {
    label: 'Username',
    maxLength: 10,
    hint: 'Maximum 10 characters or less'
  }
};

export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'john@',
    hint: "We'll use this to contact you",
    error: 'Must be a valid email address'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    isDisabled: true,
    value: 'JohnDoe123',
    hint: 'You cannot change your username'
  }
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe'
  }
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Username',
    defaultValue: 'john_doe'
  }
};

export const CustomStyles: Story = {
  args: {
    label: 'First name',
    hint: 'What shall we call you?',
    error: 'First name cannot be empty',
    className: 'my-custom-text-input'
  }
};

/**
 * Custom form example showing multiple TextInput components with custom styles applied to the form and inputs from the `TextInput.customStyles.scss` file.
 */
export const FormWithCustomStylesExample: Story = {
  render: () => (
    <div className="my-custom-form">
      <TextInput
        label="First name"
        hint="Your legal first name"
        defaultValue="John"
        className="my-custom-text-input"
      />
      <TextInput
        label="Last name"
        hint="Your legal last name"
        defaultValue="Doe"
        className="my-custom-text-input"
      />
      <TextInput
        label="Email"
        hint="We'll use this to contact you"
        defaultValue="john@doe.com"
        className="my-custom-text-input"
      />
      <TextInput
        label="Confirm email"
        error="Email addresses do not match"
        defaultValue="jon@doe.com"
        className="my-custom-text-input"
      />
    </div>
  )
};
