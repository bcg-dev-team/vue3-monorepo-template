import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { configure } from 'vee-validate';
import App from './App.vue';
import router from './router';

// 스타일
import './style.css';

// Vee-Validate 설정
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});

const app = createApp(App);

// 플러그인 등록
app.use(createPinia());
app.use(router);

app.mount('#app');
