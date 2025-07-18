import { lightColors, lightTypography, lightSpacing, lightBorderRadius } from '../theme/src/presets/tailwind-preset-light.js';
import { darkColors, darkTypography, darkSpacing, darkBorderRadius } from '../theme/src/presets/tailwind-preset-dark.js';

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './src/components/**/*.{vue,js,ts,jsx,tsx}',
    './src/stories/**/*.{vue,js,ts,jsx,tsx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...lightColors,
        ...darkColors,
      },
      fontSize: lightTypography.fontSize,
      lineHeight: lightTypography.lineHeight,
      letterSpacing: lightTypography.letterSpacing,
      spacing: lightSpacing,
      borderRadius: lightBorderRadius,
    },
  },
};
