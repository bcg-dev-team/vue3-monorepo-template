import { useTheme } from '@template/theme';
import { createPinia } from 'pinia';
import '@template/ui/style.css';
import { createApp } from 'vue';
import App from './App.vue';
import './style.css';

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.mount('#app');
