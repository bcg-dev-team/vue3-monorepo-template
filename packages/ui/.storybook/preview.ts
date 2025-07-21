import type { Preview } from '@storybook/vue3';
import { withThemeByDataAttribute } from '@storybook/addon-themes';

// CSS 파일 import
import '../src/style.css';

import { defineComponent } from 'vue';

// 중앙 정렬 데코레이터 (docs에서 제외)
const CenterDecorator = (storyFn: any, context: any) => {
  // docs 페이지인지 확인
  const isDocsPage = context.parameters?.docs?.page || context.viewMode === 'docs';

  if (isDocsPage) {
    // docs 페이지에서는 가로 중앙 정렬만 적용
    return defineComponent({
      name: 'CenterDecorator',
      template: `
        <div style="display: flex; justify-content: center; width: 100%;">
          <component :is="storyComponent" />
        </div>
      `,
      setup() {
        return {
          storyComponent: storyFn(),
        };
      },
    });
  }

  // 일반 스토리에서는 중앙 정렬 적용
  return defineComponent({
    name: 'CenterDecorator',
    template: `
      <div style="display: flex; justify-content: center; align-items: center; min-height: 100vh; width: 100%;">
        <component :is="storyComponent" />
      </div>
    `,
    setup() {
      return {
        storyComponent: storyFn(),
      };
    },
  });
};

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
    withThemeByDataAttribute({
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
