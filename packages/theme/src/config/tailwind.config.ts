import type { Config } from 'tailwindcss';

export const tailwindConfig: Config = {
  content: [], // 각 앱/패키지에서 content를 정의
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // CSS 변수를 직접 참조 - 매핑 불필요
        primary: 'var(--base-colors-primary-primary800)',
        'primary-light': 'var(--base-colors-primary-primary100)',
        'primary-deep': 'var(--base-colors-primary-primary-deep)',

        // Text Colors
        'text-primary': 'var(--base-colors-neutral-neutral800)',
        'text-secondary': 'var(--base-colors-neutral-neutral500)',
        'text-disabled': 'var(--base-colors-neutral-neutral400)',
        'text-inverse': 'var(--base-colors-neutral-neutral000)',
        'text-footer': 'var(--base-colors-neutral-neutral600)',

        // Surface Colors
        'surface-default': 'var(--base-colors-common-bg-surface-default)',
        'surface-muted': 'var(--base-colors-common-light-gray-ea)',
        'surface-disabled': 'var(--base-colors-common-light-gray-f5)',
        'surface-inner': 'var(--base-colors-common-light-gray-f5)',

        // Border Colors
        'border-default': 'var(--base-colors-neutral-neutral300)',
        'border-focus': 'var(--button-primary-background)',
        'border-error': 'var(--base-colors-red-red800)',
        'border-disabled': 'var(--base-colors-neutral-neutral250)',
        'border-static': 'var(--base-colors-neutral-neutral400)',

        // Status Colors
        success: 'var(--base-colors-green-green800)',
        error: 'var(--base-colors-red-red800)',
        warning: 'var(--base-colors-primary-primary800)',
        info: 'var(--base-colors-blue-blue800)',
        favorite: 'var(--base-colors-red-red700)',

        // Trade Colors
        'trade-buy': 'var(--base-colors-red-red800)',
        'trade-sell': 'var(--base-colors-blue-blue800)',

        // Button Colors
        'button-primary-bg': 'var(--button-primary-background)',
        'button-primary-text': 'var(--button-primary-text)',
        'button-primary-border': 'var(--button-primary-border)',
        'button-outline-bg': 'var(--button-outline-background)',
        'button-outline-text': 'var(--button-outline-text)',
        'button-outline-border': 'var(--button-outline-border)',
        'button-disabled-bg': 'var(--button-disabled-background)',
        'button-disabled-text': 'var(--button-disabled-text)',
        'button-disabled-border': 'var(--button-disabled-border)',
        'button-red-bg': 'var(--button-red-background)',
        'button-red-text': 'var(--button-red-text)',
        'button-red-border': 'var(--button-red-border)',
        'button-red-solid-bg': 'var(--button-red-solid-background)',
        'button-red-solid-text': 'var(--button-red-solid-text)',
        'button-blue-solid-bg': 'var(--button-blue-solid-background)',
        'button-blue-solid-text': 'var(--button-blue-solid-text)',
        'button-light-solid-bg': 'var(--button-light-solid-background)',
        'button-light-solid-text': 'var(--button-light-solid-text)',

        // Input Colors
        'input-bg': 'var(--base-colors-common-bg-surface-default)',
        'input-border': 'var(--base-colors-neutral-neutral400)',
        'input-border-focus': 'var(--button-primary-background)',
        'input-border-error': 'var(--base-colors-red-red800)',
        'input-border-disabled': 'var(--base-colors-neutral-neutral250)',
        'input-text': 'var(--base-colors-neutral-neutral800)',
        'input-text-placeholder': 'var(--base-colors-neutral-neutral500)',
        'input-text-disabled': 'var(--base-colors-neutral-neutral400)',
        'input-bg-disabled': 'var(--base-colors-common-light-gray-f5)',

        // Checkbox Colors
        'checkbox-disabled-border': 'var(--base-colors-neutral-neutral400)',
        'checkbox-disabled-bg': 'var(--base-colors-neutral-neutral300)',
        'checkbox-active-bg': 'var(--base-colors-common-bg-surface-default)',
        'checkbox-active-border': 'var(--base-colors-neutral-neutral400)',
        'checkbox-selected-bg': 'var(--button-primary-background)',

        // Icon Colors
        'icon-default': 'var(--base-colors-neutral-neutral700)',
        'icon-off': 'var(--base-colors-neutral-neutral400)',
        'icon-on': 'var(--button-primary-background)',
        'icon-off-dark': 'var(--base-colors-neutral-neutral550)',
        'icon-white': 'var(--base-colors-neutral-neutral000)',
        'icon-favorite': 'var(--base-colors-red-red700)',
        'icon-success': 'var(--base-colors-green-green800)',

        // Background Colors
        'bg-default': 'var(--base-colors-common-bg-surface-default)',
        'bg-surface': 'var(--base-colors-common-light-gray-ea)',
        'bg-outline': 'var(--base-colors-neutral-neutral250)',
        'bg-surface-muted': 'var(--base-colors-neutral-neutral250)',
        'bg-innerframe': 'var(--base-colors-common-light-gray-f5)',

        // Divider Colors
        divider: 'var(--base-colors-neutral-neutral250)',
        'divider-muted': 'var(--base-colors-neutral-neutral600)',

        // 추가 색상들
        'bg-red': 'var(--base-colors-red-red050)',
        'bg-blue': 'var(--base-colors-blue-blue050)',
      },
      fontSize: {
        xs: '0.625rem',
        sm: '0.75rem',
        base: '0.812rem',
        md: '0.875rem',
        lg: '1rem',
        xl: '1.125rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      lineHeight: {
        none: '3.5rem',
        tight: '2.5rem',
        snug: '1.875rem',
        normal: '1.5rem',
        relaxed: '1.375rem',
        loose: '1.25rem',
        xl: '1.125rem',
        '2xl': '1rem',
        '3xl': '0.875rem',
      },
      letterSpacing: {
        tighter: '0rem',
        tight: '-0.062rem',
        normal: '-0.039rem',
        wide: '-0.022rem',
        wider: '-0.006rem',
      },
      spacing: {
        0: '0rem',
        1: '0.25rem',
        1.5: '0.375rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        7: '1.875rem',
        8: '2rem',
        9: '2.25rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        25: '6.25rem',
        28: '7rem',
        32: '8rem',
        48: '12rem',
      },
      borderRadius: {
        none: '0rem',
        xs: '0.25rem',
        sm: '0.375rem',
        md: '0.625rem',
        lg: '1.5rem',
        full: '62.438rem',
        default: '0.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        strong: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
};
