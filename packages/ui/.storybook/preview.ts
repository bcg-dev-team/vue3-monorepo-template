import { Preview, Renderer } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/style.css';
import { h } from 'vue';

// 중앙 정렬 데코레이터
const CenterDecorator = (storyFn: any) =>
  h(
    'div',
    {
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
      },
    },
    [h(storyFn())]
  );

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      autodocs: true,
    },
  },
  decorators: [
    withThemeByDataAttribute<Renderer>({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
    CenterDecorator,
  ],
};

export default preview;
