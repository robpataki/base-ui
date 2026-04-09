import type { ReactNode } from 'react';
import type { BaseComponentProps } from '@/types';

export type TabSection = {
  /**
   * The title of the section. This value is used for the tab's label within the tablist and this also provides the the tab panel's accessible name.
   */
  title: string;
  /**
   * The contents of the tab panel
   */
  children: ReactNode;
};

export type TabsProps = BaseComponentProps & {
  /**
   * A list of tab sections
   */
  sections: TabSection[];
  /**
   * The 0 based index of the selected tab section
   */
  selectedIndex?: number;
};
