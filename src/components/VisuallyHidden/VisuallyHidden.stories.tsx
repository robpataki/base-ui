import type { Meta, StoryObj } from '@storybook/react';
import VisuallyHidden from './VisuallyHidden';

const meta = {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Render text content for screen reader users while visually hiding it from sighted users. This is useful for providing additional context to assistive technologies without cluttering the visual interface.'
      }
    }
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'],
      description: 'The HTML element to render',
      table: {
        defaultValue: { summary: 'span' }
      }
    }
  },
  args: {
    children: 'Content you cannot see but screen readers can read',
    as: 'span'
  }
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The default VisuallyHidden with no additional configuration.
 */
export const Default: Story = {};

/**
 * Blocks focus on focusable elements inside
 */
export const BlockingFocus: Story = {
  args: {
    children: <button type='button'>Focusable content that cannot be focused</button>
  }
};
