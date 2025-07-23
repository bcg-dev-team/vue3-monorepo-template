import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
                "100": "var(--base-colors-primary-primary100)",
                "200": "var(--base-colors-primary-primary200)",
                "300": "var(--base-colors-primary-primary300)",
                "400": "var(--base-colors-primary-primary400)",
                "500": "var(--base-colors-primary-primary500)",
                "600": "var(--base-colors-primary-primary600)",
                "700": "var(--base-colors-primary-primary700)",
                "800": "var(--base-colors-primary-primary800)",
                "050": "var(--base-colors-primary-primary050)",
                "-deep": "var(--base-colors-primary-primary-deep)"
        },
        "neutral": {
                "100": "var(--base-colors-neutral-neutral100)",
                "150": "var(--base-colors-neutral-neutral150)",
                "200": "var(--base-colors-neutral-neutral200)",
                "250": "var(--base-colors-neutral-neutral250)",
                "300": "var(--base-colors-neutral-neutral300)",
                "400": "var(--base-colors-neutral-neutral400)",
                "500": "var(--base-colors-neutral-neutral500)",
                "550": "var(--base-colors-neutral-neutral550)",
                "600": "var(--base-colors-neutral-neutral600)",
                "700": "var(--base-colors-neutral-neutral700)",
                "750": "var(--base-colors-neutral-neutral750)",
                "800": "var(--base-colors-neutral-neutral800)",
                "000": "var(--base-colors-neutral-neutral000)",
                "050": "var(--base-colors-neutral-neutral050)"
        },
        "green": {
                "100": "var(--base-colors-green-green100)",
                "200": "var(--base-colors-green-green200)",
                "300": "var(--base-colors-green-green300)",
                "400": "var(--base-colors-green-green400)",
                "500": "var(--base-colors-green-green500)",
                "600": "var(--base-colors-green-green600)",
                "700": "var(--base-colors-green-green700)",
                "800": "var(--base-colors-green-green800)",
                "050": "var(--base-colors-green-green050)"
        },
        "red": {
                "100": "var(--base-colors-red-red100)",
                "200": "var(--base-colors-red-red200)",
                "300": "var(--base-colors-red-red300)",
                "400": "var(--base-colors-red-red400)",
                "500": "var(--base-colors-red-red500)",
                "600": "var(--base-colors-red-red600)",
                "700": "var(--base-colors-red-red700)",
                "800": "var(--base-colors-red-red800)",
                "050": "var(--base-colors-red-red050)"
        },
        "blue": {
                "100": "var(--base-colors-blue-blue100)",
                "200": "var(--base-colors-blue-blue200)",
                "300": "var(--base-colors-blue-blue300)",
                "400": "var(--base-colors-blue-blue400)",
                "500": "var(--base-colors-blue-blue500)",
                "600": "var(--base-colors-blue-blue600)",
                "700": "var(--base-colors-blue-blue700)",
                "800": "var(--base-colors-blue-blue800)",
                "800-deep": "var(--base-colors-blue-blue800-deep)",
                "050": "var(--base-colors-blue-blue050)"
        },
        "common": {
                "bg-surface-default": "var(--base-colors-common-bg-surface-default)",
                "light-gray-ca": "var(--base-colors-common-light-gray-c-a)",
                "light-gray-f5": "var(--base-colors-common-light-gray-f5)",
                "light-gray-ea": "var(--base-colors-common-light-gray-e-a)"
        },
        "purple": {
                "100": "var(--base-colors-purple-purple100)",
                "200": "var(--base-colors-purple-purple200)",
                "300": "var(--base-colors-purple-purple300)",
                "400": "var(--base-colors-purple-purple400)",
                "500": "var(--base-colors-purple-purple500)",
                "600": "var(--base-colors-purple-purple600)",
                "700": "var(--base-colors-purple-purple700)",
                "800": "var(--base-colors-purple-purple800)",
                "050": "var(--base-colors-purple-purple050)"
        },
        "font": {
                "Primary": "var(--font-color-primary)",
                "Default": "var(--font-color-default)",
                "Default-muted": "var(--font-color-default-muted)",
                "Red": "var(--font-color-red)",
                "Buy": "var(--font-color-buy)",
                "Sell": "var(--font-color-sell)",
                "White": "var(--font-color-white)",
                "Black": "var(--font-color-black)",
                "Blue": "var(--font-color-blue)",
                "footer": "var(--font-color-footer)",
                "Default-muted-dark": "var(--font-color-default-muted-dark)",
                "Green": "var(--font-color-green)",
                "Purple": "var(--font-color-purple)"
        }
},
      spacing: {
        "0": "var(--base-size-size-0)",
        "4": "var(--base-size-size-4)",
        "6": "var(--base-size-size-6)",
        "8": "var(--base-size-size-8)",
        "10": "var(--base-size-size-10)",
        "12": "var(--base-size-size-12)",
        "13": "var(--base-size-size-13)",
        "14": "var(--base-size-size-14)",
        "16": "var(--base-size-size-16)",
        "18": "var(--base-size-size-18)",
        "20": "var(--base-size-size-20)",
        "24": "var(--base-size-size-24)",
        "36": "var(--base-size-size-36)",
        "40": "var(--base-size-size-40)",
        "48": "var(--base-size-size-48)",
        "50": "var(--base-size-size-50)",
        "64": "var(--base-size-size-64)",
        "88": "var(--base-size-size-88)",
        "100": "var(--base-size-size-100)",
        "130": "var(--base-size-size-130)",
        "140": "var(--base-size-size-140)",
        "200": "var(--base-size-size-200)",
        "300": "var(--base-size-size-300)",
        "round": "var(--base-size-size-round)"
},
      fontSize: {},
      borderRadius: {},
    },
  },
  plugins: [],
} satisfies Config;
