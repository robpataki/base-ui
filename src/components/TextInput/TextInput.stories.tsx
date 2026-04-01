import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from './TextInput';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text input component with support for labels, error states, helper text, and accessibility features.'
      }
    }
  },
  tags: ['autodocs']
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default TextInput with no additional configuration.
 */
export const Default: Story = {};

/**
 * TextInput with a label.
 */
export const WithLabel: Story = {
  args: {
    label: 'Full Name'
  }
};

/**
 * TextInput with helper text to provide additional context.
 */
export const WithHint: Story = {
  args: {
    label: 'Email',
    hint: "We'll never share your email."
  }
};

/**
 * TextInput in an error state with error message.
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    hint: 'For example you@example.com',
    error: 'Please enter a valid email address',
    isError: true
  }
};

/**
 * Disabled TextInput that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    label: 'Username',
    disabled: true,
    value: 'john_doe'
  }
};

/**
 * TextInput with a pre-filled value.
 */
export const WithValue: Story = {
  args: {
    label: 'Username',
    value: 'john_doe'
  }
};

/**
 * TextInput with maxLength constraint.
 */
export const WithMaxLength: Story = {
  args: {
    label: 'Phone Number',
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
 * TextInput with longer hint text.
 */
export const Complex: Story = {
  args: {
    label: 'Website URL',
    hint: 'Include the protocol (http:// or https://)'
  }
};

/**
 * Multiple TextInput fields in a form layout.
 */
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '420px' }}>
      <TextInput label='First Name' hint='Your legal first name' />
      <TextInput label='Last Name' hint='Your legal last name' />
      <TextInput label='Email' hint="We'll use this to contact you" />
      <TextInput label='Confirm Email' error='Email addresses do not match' isError={true} />
    </div>
  )
};
