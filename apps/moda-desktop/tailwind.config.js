// ../../packages/theme/tailwind.config.js의 설정을 불러와 확장
const themeConfig = require('../../packages/theme/tailwind.config.js');

module.exports = {
  ...themeConfig,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
};
