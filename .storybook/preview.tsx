import type { Preview } from '@storybook/react';
import './reset.scss';
import '../src/components/TextInput/TextInput.customStyles.scss';

const preview: Preview = {
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default preview;
