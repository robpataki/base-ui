import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { TextInput } from './TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible text input component with support for labels, error states, helper text, and accessibility features.'
      }
    }
  },
  args: {
    label: 'Username',
    onChange: action('onChange')
  }
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default TextInput with no additional configuration.
 */
export const Default: Story = {};

/**
 * TextInput with helper text to provide additional context.
 */
export const WithHint: Story = {
  args: {
    label: 'Email',
    hint: "We'll never share your email"
  }
};

/**
 * TextInput in an error state with error message.
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    hint: 'For example, you@example.com',
    error: "We'll never share your email"
  }
};

/**
 * Disabled TextInput that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    label: 'Username',
    isDisabled: true,
    value: 'JohnDoe123'
  }
};

/**
 * TextInput with a pre-filled value. component is controlled and requires an onChange handler to update the value.
 */
export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe'
  }
};

/**
 * TextInput with a default value. Component is uncontrolled and manages its own state.
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Username',
    defaultValue: 'john_doe'
  }
};

/**
 * TextInput with maxLength constraint.
 */
export const WithMaxLength: Story = {
  args: {
    label: 'Phone number',
    maxLength: 10,
    hint: 'Maximum 10 characters'
  }
};

/**
 * TextInput with required attribute.
 */
export const Required: Story = {
  args: {
    label: 'Password',
    required: true
  }
};

/**
 * Custom styles
 */
export const CustomStyles: Story = {
  args: {
    label: 'First name',
    hint: 'What shall we call you?',
    error: 'First name cannot be empty',
    className: 'my-custom-text-input'
  }
};

/**
 * Multiple TextInput fields in a form layout.
 */
export const FormExample: Story = {
  render: () => (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '420px' }}
    >
      <TextInput label='First name' hint='Your legal first name' defaultValue='John' />
      <TextInput label='Last name' hint='Your legal last name' defaultValue='Doe' />
      <TextInput
        label='Email'
        hint="We'll use this to contact you"
        defaultValue='john@doe.com'
      />
      <TextInput
        label='Confirm email'
        error='Email addresses do not match'
        defaultValue='jon@doe.com'
      />
    </div>
  )
};
