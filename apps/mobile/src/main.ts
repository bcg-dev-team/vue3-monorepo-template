import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import { NConfigProvider } from 'naive-ui';
import { useTheme } from '@template/theme';
import App from './App.vue';
import './style.css';

const pinia = createPinia();

const app = createApp({
  setup() {
    const { currentTheme, themeOverrides } = useTheme();
    return () =>
      h(
        NConfigProvider,
        {
          theme: currentTheme.value,
          themeOverrides: themeOverrides.value,
        },
        { default: () => h(App) }
      );
  },
});

app.use(pinia);
app.mount('#app');
