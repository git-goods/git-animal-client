import type { Preview } from '@storybook/react';
import './globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#2c2929' },
        { name: 'light', value: '#ffffff' },
        { name: 'gray', value: '#1a1a1a' },
      ],
    },
  },
};

export default preview;
