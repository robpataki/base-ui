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

/**
 * The default TextInput with no additional configuration.
 */
export const Default: Story = {};

/**
 * TextInput with helper text to provide additional context.
 */
export const WithHint: Story = {
  args: {
    label: 'Username',
    maxLength: 10,
    hint: 'Maximum 10 characters or less.'
  }
};

/**
 * TextInput in an error state with error message.
 */
export const WithError: Story = {
  args: {
    label: 'Email',
    defaultValue: 'john@',
    hint: "We'll use this to contact you",
    error: 'Must be a valid email address'
  }
};

/**
 * Disabled TextInput that cannot be interacted with.
 */
export const Disabled: Story = {
  args: {
    label: 'Username',
    isDisabled: true,
    value: 'JohnDoe123',
    hint: 'You cannot change your username.'
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
 *
 * The following selectors can be used to target specific parts of the TextInput component:
 *
 * - **Global component class:** `a1-text-input`
 * - **Wrapper element:** `[class*='wrapper']`
 * - **State classes (on the wrapper):** `[class*='is-error']`, `[class*='is-disabled']`
 * - **Input field:** `[class*='input']`
 * - **Label:** `[class*='label']`
 * - **Hint text:** `[class*='hint']`
 * - **Error message:** `[class*='error']`
 *
 * This story uses styles directly from the `TextInput.customStyles.scss` file, which is imported in `preview.tsx`. You can modify the styles there to see the changes reflected in this story.
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
 * Multiple TextInput fields in a form layout using custom styles.
 */
export const FormWithCustomStylesExample: Story = {
  render: () => (
    <div className='my-custom-form'>
      <TextInput
        label='First name'
        hint='Your legal first name'
        defaultValue='John'
        className='my-custom-text-input'
      />
      <TextInput
        label='Last name'
        hint='Your legal last name'
        defaultValue='Doe'
        className='my-custom-text-input'
      />
      <TextInput
        label='Email'
        hint="We'll use this to contact you"
        defaultValue='john@doe.com'
        className='my-custom-text-input'
      />
      <TextInput
        label='Confirm email'
        error='Email addresses do not match'
        defaultValue='jon@doe.com'
        className='my-custom-text-input'
      />
    </div>
  )
};
