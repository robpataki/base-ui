import type { Preview } from '@storybook/react';
import '../src/components/TextInput/TextInput.custom.style.module.scss';

const preview: Preview = {
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default preview;
