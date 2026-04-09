import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {},
  args: {
    sections: [
      {
        title: 'Section A',
        children: 'Content A'
      },
      {
        title: 'Section B',
        children: 'Content B'
      },
      {
        title: 'Section C',
        children: 'Content C'
      }
    ]
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
