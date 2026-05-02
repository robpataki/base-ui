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
        children: (
          <>
            <h3>Content A</h3>
            <a href="/hello">Hello</a>
          </>
        )
      },
      {
        title: 'Section B',
        children: (
          <>
            <h3>Content B</h3>
            <button type="button">Hello</button>
          </>
        )
      },
      {
        title: 'Section C',
        children: 'Content C'
      },
      {
        title: 'Section D',
        children: <button type="button">Hello</button>
      }
    ]
  }
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * When any of the tab panels does not have a focusable element as its first (visible and operable) child, the component makes every tab panel focusable to aid keyboard and screen reader users as per the [WAI-ARIA APG for Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic#accessibilityfeatures).
 */
export const Default: Story = {};

/**
 * When every tab panel's first child is a focusable element, the component does not make the tab panels focusable to avoid unnecessary tab stops for keyboard and screen reader users as per the [WAI-ARIA APG for Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic#accessibilityfeatures).
 */
export const TabPanelNotFocusable: Story = {
  args: {
    sections: [
      {
        title: 'Section A',
        children: (
          <>
            <a href="/hello">Hello A</a>
          </>
        )
      },
      {
        title: 'Section B',
        children: (
          <>
            <button type="button">Hello B</button>
          </>
        )
      },
      {
        title: 'Section C',
        children: <a href="/hello">Hello C</a>
      },
      {
        title: 'Section D',
        children: <button type="button">Hello D</button>
      }
    ]
  }
};
