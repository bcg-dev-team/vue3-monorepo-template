import { lightColors } from '../../packages/theme/src/presets/tailwind-preset-light.js';
import { darkColors } from '../../packages/theme/src/presets/tailwind-preset-dark.js';

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
        // === Semantic Color Tokens ===

        // Primary Colors
        primary: '#ffc300',
        'primary-light': '#fff9df',
        'primary-deep': '#ffaa00',

        // Text Colors
        'text-primary': '#333740',
        'text-secondary': '#8f9299',
        'text-disabled': '#b4b6bb',
        'text-inverse': '#ffffff',
        'text-footer': '#5a5c5e',

        // Surface Colors
        'surface-default': '#ffffff',
        'surface-muted': '#eaecee',
        'surface-disabled': '#f5f7f9',
        'surface-inner': '#f5f7f9',

        // Border Colors
        'border-default': '#caccce',
        'border-focus': '#ffc300',
        'border-error': '#f63338',
        'border-disabled': '#dadbdd',
        'border-static': '#b4b6bb',

        // Status Colors
        success: '#00a22f',
        error: '#f63338',
        warning: '#ffc300',
        info: '#1775f0',
        favorite: '#ff595c',

        // Trade Colors
        'trade-buy': '#f63338',
        'trade-sell': '#1775f0',
        'trade-long-bg': '#fff1f2',
        'trade-long-text': '#f63338',
        'trade-long-border': '#f63338',
        'trade-long-text2': '#333740',
        'trade-short-bg': '#e8f0fa',
        'trade-short-text': '#1775f0',
        'trade-short-border': '#1775f0',
        'trade-correct-bg': '#f1f9f3',
        'trade-correct-text': '#00a22f',
        'trade-correct-border': '#00a22f',
        'trade-correct-bg-solid': '#28c053',
        'trade-cancel-bg': '#f9f3ff',
        'trade-cancel-text': '#892fe9',
        'trade-cancel-border': '#892fe9',
        'trade-cancel-bg-solid': '#a765ee',

        // === Component-Specific Semantic Tokens ===

        // Button Tokens
        'button-primary-bg': '#ffc300',
        'button-primary-text': '#333740',
        'button-primary-border': '#ffc300',
        'button-outline-bg': '#ffffff',
        'button-outline-text': '#242424',
        'button-outline-border': '#717375',
        'button-disabled-bg': '#ecedee',
        'button-disabled-text': '#b4b6bb',
        'button-disabled-border': '#caccce',
        'button-red-bg': '#ffffff',
        'button-red-text': '#f63338',
        'button-red-border': '#f63338',
        'button-red-solid-bg': '#f63338',
        'button-red-solid-text': '#ffffff',
        'button-blue-solid-bg': '#1775f0',
        'button-blue-solid-text': '#ffffff',
        'button-light-solid-bg': '#fff9df',
        'button-light-solid-text': '#ffaa00',

        // Input Tokens
        'input-bg': '#ffffff',
        'input-border': '#b4b6bb',
        'input-border-focus': '#ffc300',
        'input-border-error': '#f63338',
        'input-border-disabled': '#dadbdd',
        'input-text': '#333740',
        'input-text-placeholder': '#8f9299',
        'input-text-disabled': '#b4b6bb',
        'input-bg-disabled': '#f5f7f9',

        // Check & Radio Tokens
        'checkbox-disabled-border': '#b4b6bb',
        'checkbox-disabled-bg': '#caccce',
        'checkbox-active-bg': '#ffffff',
        'checkbox-active-border': '#b4b6bb',
        'checkbox-selected-bg': '#ffc300',

        // Icon Tokens
        'icon-default': '#333740',
        'icon-off': '#b4b6bb',
        'icon-on': '#ffc300',
        'icon-off-dark': '#717375',
        'icon-white': '#ffffff',
        'icon-favorite': '#ff595c',
        'icon-success': '#00a22f',

        // Menu Tokens
        'menu-bg': '#ffffff',
        'menu-border': '#dadbdd',
        'menu-off': '#ffffff',
        'menu-on-long': '#fff1f2',
        'menu-on-short': '#e8f0fa',
        'menu-on-correct': '#f1f9f3',
        'menu-text-off': '#8f9299',
        'menu-on-cancel': '#f9f3ff',

        // Background Tokens
        'bg-default': '#ffffff',
        'bg-surface': '#eaecee',
        'bg-outline': '#dadbdd',
        'bg-surface-muted': '#dadbdd',
        'bg-innerframe': '#f5f7f9',
        'bg-sidebar': '#242424',
        'bg-topbar': '#ffffff',
        'bg-header': '#f5f6f6',
        'bg-body': '#ffffff',
        'bg-body-select': '#e8f0fa',
        'bg-body-row': '#f5f7f9',
        'bg-red': '#fff1f2',
        'bg-blue': '#e8f0fa',

        // Divider Tokens
        divider: '#dadbdd',
        'divider-muted': '#5a5c5e',

        // Body Tokens
        'body-border': '#dadbdd',
        'body-border-mid': '#ecedee',
        'header-underline': '#dadbdd',
      },

      fontSize: {
        // === Typography Semantic Tokens ===
        xs: '0.625rem', // font-10
        sm: '0.75rem', // font-12
        base: '0.812rem', // font-13
        md: '0.875rem', // font-14
        lg: '1rem', // font-16
        xl: '1.125rem', // font-18
        '2xl': '1.25rem', // font-20
        '3xl': '1.5rem', // font-24
        '4xl': '2.25rem', // font-36
        '5xl': '3rem', // font-48
        '6xl': '4rem', // font-64
      },

      lineHeight: {
        // === Line Height Semantic Tokens ===
        none: '0.875rem', // 0
        tight: '1rem', // 1
        snug: '1.125rem', // 2
        normal: '1.5rem', // 3
        relaxed: '1.375rem', // 4
        loose: '1.25rem', // 5
        xl: '1.125rem', // 6
        '2xl': '1rem', // 7
        '3xl': '0.875rem', // 8
      },

      letterSpacing: {
        // === Letter Spacing Semantic Tokens ===
        tighter: '-0.062rem', // 0
        tight: '-0.039rem', // 1
        normal: '-0.022rem', // 2
        wide: '-0.006rem', // 3
        wider: '0.006rem', // 4
      },

      spacing: {
        // === Spacing Semantic Tokens ===
        0: '0rem',
        1: '0.25rem', // size-4
        1.5: '0.375rem', // size-6
        2: '0.5rem', // size-8
        3: '0.75rem', // size-12
        4: '1rem', // size-16
        5: '1.25rem', // size-20
        6: '1.5rem', // size-24
        7: '1.875rem', // size-30
        8: '2rem', // size-32
        9: '2.25rem', // size-36
        10: '2.5rem', // size-40
        12: '3rem', // size-48
        16: '4rem', // size-64
        20: '6.25rem', // size-100
        25: '8.125rem', // size-130
        28: '8.75rem', // size-140
        32: '12.5rem', // size-200
        48: '18.75rem', // size-300
      },

      borderRadius: {
        // === Border Radius Semantic Tokens ===
        none: '0rem',
        xs: '0.25rem', // size-4
        sm: '0.375rem', // size-6
        md: '0.625rem', // size-10
        lg: '1.5rem', // size-24
        full: '62.438rem', // size-round
        default: '0.5rem', // size-8
      },
    },
  },
};
