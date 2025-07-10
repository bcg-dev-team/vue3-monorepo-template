import type { Preview } from '@storybook/vue3';
import '@template/theme/styles/_tokens-light.css';
import '@template/theme/styles/_tokens-dark.css';
import '../src/style.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
