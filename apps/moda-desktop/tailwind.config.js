import { tailwindConfig } from '../../packages/theme/src/config/tailwind.config';

export default {
  ...tailwindConfig,
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
};
