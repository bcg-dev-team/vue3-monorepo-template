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
 * Button 디자인 토큰 반환 (Figma 1:1 매핑)
 * @returns 버튼 관련 디자인 토큰 객체
 */
export declare function getButtonTokens(): {
    'primary-background': string;
    'primary-text': string;
    'primary-border': string;
    'disabled-background': string;
    'disabled-text': string;
    'disabled-border': string;
    'outline-background': string;
    'outline-text': string;
    'outline-border': string;
    'red-background': string;
    'red-text': string;
    'red-border': string;
    'blue-background': string;
    'blue-text': string;
    'blue-border': string;
    'blue-solid-hover': string;
    'light-solid-background': string;
    'light-solid-text': string;
    'light-solid-border': string;
    'red-solid-background': string;
    'red-solid-text': string;
    'red-solid-border': string;
    'red-solid-hover': string;
    'pill-background': string;
    'pill-text': string;
    'pill-border': string;
    'pill-hover-background': string;
};
export declare function getInputTokens(): Record<string, string>;
export declare function getBackgroundTokens(): Record<string, string>;
export declare function getFontTokens(): Record<string, string>;
export declare function getTradeTokens(): Record<string, string>;
export declare function getTableTokens(): Record<string, string>;
export declare function getPopupTokens(): Record<string, string>;
export declare function getNavTokens(): Record<string, string>;
export declare function getSidebarTokens(): Record<string, string>;
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
        'disabled-background': string;
        'disabled-text': string;
        'disabled-border': string;
        'outline-background': string;
        'outline-text': string;
        'outline-border': string;
        'red-background': string;
        'red-text': string;
        'red-border': string;
        'blue-background': string;
        'blue-text': string;
        'blue-border': string;
        'blue-solid-hover': string;
        'light-solid-background': string;
        'light-solid-text': string;
        'light-solid-border': string;
        'red-solid-background': string;
        'red-solid-text': string;
        'red-solid-border': string;
        'red-solid-hover': string;
        'pill-background': string;
        'pill-text': string;
        'pill-border': string;
        'pill-hover-background': string;
    };
    input: Record<string, string>;
    background: Record<string, string>;
    font: Record<string, string>;
    trade: Record<string, string>;
    table: Record<string, string>;
    popup: Record<string, string>;
    nav: Record<string, string>;
    sidebar: Record<string, string>;
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