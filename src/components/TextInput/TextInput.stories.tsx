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
export const Default: Story = {
  args: {
    placeholder: 'Enter text...'
  }
};

/**
 * TextInput with a label.
 */
export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe'
  }
};

/**
 * TextInput with helper text to provide additional context.
 */
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    helperText: "We'll never share your email."
  }
};

/**
 * TextInput in an error state with error message.
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
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
    placeholder: 'john_doe',
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
    placeholder: 'Enter your phone number',
    maxLength: 10,
    helperText: 'Maximum 10 characters'
  }
};

/**
 * TextInput with required attribute.
 */
export const Required: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    required: true
  }
};

/**
 * TextInput with longer placeholder and helper text.
 */
export const Complex: Story = {
  args: {
    label: 'Website URL',
    placeholder: 'https://example.com',
    helperText: 'Include the protocol (http:// or https://)',
    value: ''
  }
};

/**
 * Multiple TextInput fields in a form layout.
 */
export const FormExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '300px' }}>
      <TextInput label='First Name' placeholder='John' helperText='Your legal first name' />
      <TextInput label='Last Name' placeholder='Doe' helperText='Your legal last name' />
      <TextInput label='Email' placeholder='john@example.com' helperText="We'll use this to contact you" />
      <TextInput label='Confirm Email' placeholder='john@example.com' error='Email addresses do not match' isError={true} />
    </div>
  )
};
