import { tailwindConfig } from '../../packages/theme/dist/config/tailwind.config';

export default {
  ...tailwindConfig,
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './src/components/**/*.{vue,js,ts,jsx,tsx}'],
};
