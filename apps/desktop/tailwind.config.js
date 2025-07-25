// ../../packages/theme/tailwind.config.js의 설정을 불러와 확장
const themeConfig = require('../../packages/theme/tailwind.config.js');

module.exports = {
  ...themeConfig,
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './src/components/**/*.{vue,js,ts,jsx,tsx}'],
};
