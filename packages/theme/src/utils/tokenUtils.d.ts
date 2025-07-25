/**
 * CSS 변수에서 디자인 토큰을 동적으로 읽어오는 유틸리티 함수들
 */
/**
 * CSS 변수 값을 가져오는 함수
 * @param variableName - CSS 변수명 (예: --base-colors-primary-primary800)
 * @returns CSS 변수 값
 */
export declare function getCSSVariable(variableName: string): string;
/**
 * 색상 토큰을 그룹별로 가져오는 함수
 * @returns 색상 토큰 객체
 */
export declare function getColorTokens(): Record<string, Record<string, string>>;
/**
 * 타이포그래피 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 타이포그래피 토큰 객체
 */
export declare function getTypographyTokens(): {
    fontSize: {
        'font-10': string;
        'font-12': string;
        'font-13': string;
        'font-14': string;
        'font-16': string;
        'font-18': string;
        'font-20': string;
        'font-24': string;
        'font-36': string;
        'font-48': string;
        'font-64': string;
    };
    lineHeight: {
        'line-height-0': string;
        'line-height-1': string;
        'line-height-2': string;
        'line-height-3': string;
        'line-height-4': string;
        'line-height-5': string;
        'line-height-6': string;
        'line-height-7': string;
        'line-height-8': string;
    };
    letterSpacing: {
        'letter-spacing-0': string;
        'letter-spacing-1': string;
        'letter-spacing-2': string;
        'letter-spacing-3': string;
        'letter-spacing-4': string;
        'letter-spacing-5': string;
    };
};
/**
 * 간격 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 간격 토큰 객체
 */
export declare function getSpacingTokens(): {
    'spacing-4': string;
    'spacing-6': string;
    'spacing-8': string;
    'spacing-10': string;
    'spacing-12': string;
    'spacing-13': string;
    'spacing-14': string;
    'spacing-16': string;
    'spacing-18': string;
    'spacing-20': string;
    'spacing-24': string;
    'spacing-36': string;
    'spacing-40': string;
    'spacing-48': string;
    'spacing-50': string;
    'spacing-64': string;
    'spacing-100': string;
    'spacing-130': string;
    'spacing-140': string;
    'spacing-200': string;
    'spacing-300': string;
};
/**
 * 패딩 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 패딩 토큰 객체
 */
export declare function getPaddingTokens(): {
    'padding-4': string;
    'padding-8': string;
    'padding-12': string;
    'padding-16': string;
    'padding-24': string;
    'padding-36': string;
    'padding-48': string;
    'padding-64': string;
    'padding-130': string;
    'padding-z': string;
};
/**
 * 라운드(Radius) 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 라운드 토큰 객체
 */
export declare function getRadiusTokens(): {
    'radius-xs': string;
    'radius-sm': string;
    'radius-md': string;
    'radius-lg': string;
    'radius-pill': string;
    'radius-default': string;
    'radius-none': string;
};
/**
 * @returns 버튼 관련 디자인 토큰 객체
 */
export declare function getButtonTokens(): {
    'primary-background': string;
    'primary-text': string;
    'primary-border': string;
    'primary-background-deep': string;
    'disabled-background': string;
    'disabled-text': string;
    'disabled-border': string;
    'outline-background': string;
    'outline-text': string;
    'outline-border': string;
    'outline-gray-background': string;
    'outline-gray-text': string;
    'outline-gray-border': string;
    'red-background': string;
    'red-text': string;
    'red-border': string;
    'red-background-none': string;
    'red-background-hover': string;
    'red-background-blank': string;
    'red-solid-background': string;
    'red-solid-text': string;
    'red-solid-border': string;
    'red-solid-hover': string;
    'blue-background': string;
    'blue-text': string;
    'blue-border': string;
    'blue-background-none': string;
    'blue-background-hover': string;
    'blue-background-blank': string;
    'blue-solid-background': string;
    'blue-solid-text': string;
    'blue-solid-border': string;
    'blue-solid-hover': string;
    'light-solid-background': string;
    'light-solid-text': string;
    'light-solid-border': string;
    'tab-background': string;
    'tab-button-on': string;
    'tab-button-off': string;
    'tab-text-on': string;
    'tab-text-off': string;
    'tab-menu-background': string;
    'tab-menu-border': string;
    'tab-menu-off': string;
    'tab-menu-on-long': string;
    'tab-menu-on-short': string;
    'tab-menu-on-correct': string;
    'tab-menu-text-off': string;
    'tab-menu-on-cancel': string;
};
export declare function getInputTokens(): {
    'color-surface': string;
    'color-border-static': string;
    'color-border-focus': string;
    'color-border-error': string;
    'color-border-disabled': string;
    'color-text-placeholder': string;
    'color-text-disable': string;
    'color-text-static': string;
    'color-bg-disabled': string;
    'check-radio-disable-border': string;
    'check-radio-disable-bg': string;
    'check-radio-active-bg': string;
    'check-radio-active-border': string;
    'check-radio-inactive-disable-bg': string;
    'check-radio-selected-bg': string;
    'icon-default': string;
    'icon-off': string;
    'icon-on': string;
    'icon-off-dark': string;
    'icon-white': string;
    'icon-favorite': string;
    'icon-success': string;
    'icon-blue': string;
};
export declare function getBackgroundTokens(): {
    'bg-default': string;
    'bg-surface': string;
    'bg-outline': string;
    'bg-surface-muted': string;
    divider: string;
    'divider-muted': string;
    'bg-innerframe': string;
    primary: string;
    'primary-light': string;
    'bg-surface-dark': string;
};
export declare function getFontTokens(): {
    'color-primary': string;
    'color-default': string;
    'color-default-muted': string;
    'color-red': string;
    'color-buy': string;
    'color-sell': string;
    'color-white': string;
    'color-black': string;
    'color-blue': string;
    'color-footer': string;
    'color-default-muted-dark': string;
    'color-green': string;
    'color-purple': string;
    'size-font-36': string;
    'size-font-24': string;
    'size-font-13': string;
    'size-font-20': string;
    'size-font-14': string;
    'size-font-64': string;
    'size-font-48': string;
    'size-font-12': string;
    'size-font-18': string;
    'size-font-16': string;
    'size-font-10': string;
};
export declare function getTradeTokens(): {
    'long-background': string;
    'long-text': string;
    'long-border': string;
    'short-background': string;
    'short-text': string;
    'short-border': string;
    'correct-background': string;
    'correct-text': string;
    'correct-border': string;
    'correct-background-solid': string;
    'correct-text-solid': string;
    'cancel-background': string;
    'cancel-text': string;
    'cancel-border': string;
    'cancel-background-solid': string;
    'cancel-text-solid': string;
};
export declare function getTableTokens(): {
    'type1-header-bg': string;
    'type1-header-underline': string;
    'type1-body-border': string;
    'type1-body-bg': string;
    'type1-body-bg-select': string;
    'type1-body-bg-row': string;
    'type2-body-border': string;
    'type2-header-underline': string;
    'type2-header-bg': string;
    'type2-body-bg': string;
    'type2-body-border-mid': string;
    'bg-red': string;
    'bg-blue': string;
    'bg-inner': string;
    'chip-background': string;
};
export declare function getPopupTokens(): {
    background: string;
    'inner-background': string;
    border: string;
    text: string;
};
export declare function getNavTokens(): {
    on: string;
    off: string;
};
export declare function getSidebarTokens(): {
    'bg-sidebar': string;
    'bg-topbar': string;
};
/**
 * 모든 디자인 토큰을 가져오는 함수
 * @returns 모든 디자인 토큰 객체
 */
export declare function getAllDesignTokens(): {
    colors: Record<string, Record<string, string>>;
    button: {
        'primary-background': string;
        'primary-text': string;
        'primary-border': string;
        'primary-background-deep': string;
        'disabled-background': string;
        'disabled-text': string;
        'disabled-border': string;
        'outline-background': string;
        'outline-text': string;
        'outline-border': string;
        'outline-gray-background': string;
        'outline-gray-text': string;
        'outline-gray-border': string;
        'red-background': string;
        'red-text': string;
        'red-border': string;
        'red-background-none': string;
        'red-background-hover': string;
        'red-background-blank': string;
        'red-solid-background': string;
        'red-solid-text': string;
        'red-solid-border': string;
        'red-solid-hover': string;
        'blue-background': string;
        'blue-text': string;
        'blue-border': string;
        'blue-background-none': string;
        'blue-background-hover': string;
        'blue-background-blank': string;
        'blue-solid-background': string;
        'blue-solid-text': string;
        'blue-solid-border': string;
        'blue-solid-hover': string;
        'light-solid-background': string;
        'light-solid-text': string;
        'light-solid-border': string;
        'tab-background': string;
        'tab-button-on': string;
        'tab-button-off': string;
        'tab-text-on': string;
        'tab-text-off': string;
        'tab-menu-background': string;
        'tab-menu-border': string;
        'tab-menu-off': string;
        'tab-menu-on-long': string;
        'tab-menu-on-short': string;
        'tab-menu-on-correct': string;
        'tab-menu-text-off': string;
        'tab-menu-on-cancel': string;
    };
    input: {
        'color-surface': string;
        'color-border-static': string;
        'color-border-focus': string;
        'color-border-error': string;
        'color-border-disabled': string;
        'color-text-placeholder': string;
        'color-text-disable': string;
        'color-text-static': string;
        'color-bg-disabled': string;
        'check-radio-disable-border': string;
        'check-radio-disable-bg': string;
        'check-radio-active-bg': string;
        'check-radio-active-border': string;
        'check-radio-inactive-disable-bg': string;
        'check-radio-selected-bg': string;
        'icon-default': string;
        'icon-off': string;
        'icon-on': string;
        'icon-off-dark': string;
        'icon-white': string;
        'icon-favorite': string;
        'icon-success': string;
        'icon-blue': string;
    };
    background: {
        'bg-default': string;
        'bg-surface': string;
        'bg-outline': string;
        'bg-surface-muted': string;
        divider: string;
        'divider-muted': string;
        'bg-innerframe': string;
        primary: string;
        'primary-light': string;
        'bg-surface-dark': string;
    };
    font: {
        'color-primary': string;
        'color-default': string;
        'color-default-muted': string;
        'color-red': string;
        'color-buy': string;
        'color-sell': string;
        'color-white': string;
        'color-black': string;
        'color-blue': string;
        'color-footer': string;
        'color-default-muted-dark': string;
        'color-green': string;
        'color-purple': string;
        'size-font-36': string;
        'size-font-24': string;
        'size-font-13': string;
        'size-font-20': string;
        'size-font-14': string;
        'size-font-64': string;
        'size-font-48': string;
        'size-font-12': string;
        'size-font-18': string;
        'size-font-16': string;
        'size-font-10': string;
    };
    trade: {
        'long-background': string;
        'long-text': string;
        'long-border': string;
        'short-background': string;
        'short-text': string;
        'short-border': string;
        'correct-background': string;
        'correct-text': string;
        'correct-border': string;
        'correct-background-solid': string;
        'correct-text-solid': string;
        'cancel-background': string;
        'cancel-text': string;
        'cancel-border': string;
        'cancel-background-solid': string;
        'cancel-text-solid': string;
    };
    table: {
        'type1-header-bg': string;
        'type1-header-underline': string;
        'type1-body-border': string;
        'type1-body-bg': string;
        'type1-body-bg-select': string;
        'type1-body-bg-row': string;
        'type2-body-border': string;
        'type2-header-underline': string;
        'type2-header-bg': string;
        'type2-body-bg': string;
        'type2-body-border-mid': string;
        'bg-red': string;
        'bg-blue': string;
        'bg-inner': string;
        'chip-background': string;
    };
    popup: {
        background: string;
        'inner-background': string;
        border: string;
        text: string;
    };
    nav: {
        on: string;
        off: string;
    };
    sidebar: {
        'bg-sidebar': string;
        'bg-topbar': string;
    };
    radius: {
        'radius-xs': string;
        'radius-sm': string;
        'radius-md': string;
        'radius-lg': string;
        'radius-pill': string;
        'radius-default': string;
        'radius-none': string;
    };
    padding: {
        'padding-4': string;
        'padding-8': string;
        'padding-12': string;
        'padding-16': string;
        'padding-24': string;
        'padding-36': string;
        'padding-48': string;
        'padding-64': string;
        'padding-130': string;
        'padding-z': string;
    };
    typography: {
        fontSize: {
            'font-10': string;
            'font-12': string;
            'font-13': string;
            'font-14': string;
            'font-16': string;
            'font-18': string;
            'font-20': string;
            'font-24': string;
            'font-36': string;
            'font-48': string;
            'font-64': string;
        };
        lineHeight: {
            'line-height-0': string;
            'line-height-1': string;
            'line-height-2': string;
            'line-height-3': string;
            'line-height-4': string;
            'line-height-5': string;
            'line-height-6': string;
            'line-height-7': string;
            'line-height-8': string;
        };
        letterSpacing: {
            'letter-spacing-0': string;
            'letter-spacing-1': string;
            'letter-spacing-2': string;
            'letter-spacing-3': string;
            'letter-spacing-4': string;
            'letter-spacing-5': string;
        };
    };
    spacing: {
        'spacing-4': string;
        'spacing-6': string;
        'spacing-8': string;
        'spacing-10': string;
        'spacing-12': string;
        'spacing-13': string;
        'spacing-14': string;
        'spacing-16': string;
        'spacing-18': string;
        'spacing-20': string;
        'spacing-24': string;
        'spacing-36': string;
        'spacing-40': string;
        'spacing-48': string;
        'spacing-50': string;
        'spacing-64': string;
        'spacing-100': string;
        'spacing-130': string;
        'spacing-140': string;
        'spacing-200': string;
        'spacing-300': string;
    };
};
/**
 * 토큰 이름을 사용자 친화적으로 변환하는 함수
 * @param tokenName - 토큰 이름
 * @returns 사용자 친화적인 이름
 */
export declare function formatTokenName(tokenName: string): string;
//# sourceMappingURL=tokenUtils.d.ts.map