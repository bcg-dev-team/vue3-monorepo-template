"use strict";
/**
 * CSS 변수에서 디자인 토큰을 동적으로 읽어오는 유틸리티 함수들
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCSSVariable = getCSSVariable;
exports.getColorTokens = getColorTokens;
exports.getTypographyTokens = getTypographyTokens;
exports.getSpacingTokens = getSpacingTokens;
exports.getPaddingTokens = getPaddingTokens;
exports.getRadiusTokens = getRadiusTokens;
exports.getButtonTokens = getButtonTokens;
exports.getInputTokens = getInputTokens;
exports.getBackgroundTokens = getBackgroundTokens;
exports.getFontTokens = getFontTokens;
exports.getTradeTokens = getTradeTokens;
exports.getTableTokens = getTableTokens;
exports.getPopupTokens = getPopupTokens;
exports.getNavTokens = getNavTokens;
exports.getSidebarTokens = getSidebarTokens;
exports.getAllDesignTokens = getAllDesignTokens;
exports.formatTokenName = formatTokenName;
/**
 * CSS 변수 값을 가져오는 함수
 * @param variableName - CSS 변수명 (예: --base-colors-primary-primary800)
 * @returns CSS 변수 값
 */
function getCSSVariable(variableName) {
    if (typeof window === 'undefined')
        return '';
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}
/**
 * 공통 색상(common) 토큰을 가져오는 함수
 * @returns common 색상 토큰 객체
 */
function getCommonColorTokens() {
    var common = {};
    var style = getComputedStyle(typeof window !== 'undefined' ? document.documentElement : {});
    for (var key in style) {
        if (typeof key === 'string' && key.startsWith('--base-colors-common-')) {
            var value = style.getPropertyValue(key).trim();
            if (value) {
                var name_1 = key.replace('--base-colors-common-', '');
                common[name_1] = value;
            }
        }
    }
    return common;
}
/**
 * 색상 토큰을 그룹별로 가져오는 함수
 * @returns 색상 토큰 객체
 */
function getColorTokens() {
    var colors = {
        primary: {},
        neutral: {},
        green: {},
        red: {},
        blue: {},
        purple: {},
        common: getCommonColorTokens(),
    };
    // Primary 색상 (실제 CSS 변수명 확인)
    var primaryTokens = [
        '--base-colors-primary-primary800',
        '--base-colors-primary-primary700',
        '--base-colors-primary-primary600',
        '--base-colors-primary-primary500',
        '--base-colors-primary-primary400',
        '--base-colors-primary-primary300',
        '--base-colors-primary-primary200',
        '--base-colors-primary-primary100',
        '--base-colors-primary-primary050',
        '--base-colors-primary-primary-deep',
    ];
    primaryTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-primary-', '');
            colors.primary[key] = value;
        }
    });
    // Neutral 색상
    var neutralTokens = [
        '--base-colors-neutral-neutral800',
        '--base-colors-neutral-neutral700',
        '--base-colors-neutral-neutral600',
        '--base-colors-neutral-neutral500',
        '--base-colors-neutral-neutral400',
        '--base-colors-neutral-neutral300',
        '--base-colors-neutral-neutral200',
        '--base-colors-neutral-neutral100',
        '--base-colors-neutral-neutral000',
        '--base-colors-neutral-neutral750',
        '--base-colors-neutral-neutral250',
        '--base-colors-neutral-neutral150',
        '--base-colors-neutral-neutral550',
        '--base-colors-neutral-neutral050',
    ];
    neutralTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-neutral-', '');
            colors.neutral[key] = value;
        }
    });
    // Green 색상
    var greenTokens = [
        '--base-colors-green-green100',
        '--base-colors-green-green200',
        '--base-colors-green-green300',
        '--base-colors-green-green400',
        '--base-colors-green-green600',
        '--base-colors-green-green700',
        '--base-colors-green-green500',
        '--base-colors-green-green800',
        '--base-colors-green-green050',
    ];
    greenTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-green-', '');
            colors.green[key] = value;
        }
    });
    // Red 색상
    var redTokens = [
        '--base-colors-red-red800',
        '--base-colors-red-red700',
        '--base-colors-red-red600',
        '--base-colors-red-red500',
        '--base-colors-red-red400',
        '--base-colors-red-red300',
        '--base-colors-red-red200',
        '--base-colors-red-red100',
        '--base-colors-red-red050',
    ];
    redTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-red-', '');
            colors.red[key] = value;
        }
    });
    // Blue 색상
    var blueTokens = [
        '--base-colors-blue-blue800',
        '--base-colors-blue-blue700',
        '--base-colors-blue-blue600',
        '--base-colors-blue-blue500',
        '--base-colors-blue-blue400',
        '--base-colors-blue-blue300',
        '--base-colors-blue-blue200',
        '--base-colors-blue-blue100',
        '--base-colors-blue-blue050',
    ];
    blueTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-blue-', '');
            colors.blue[key] = value;
        }
    });
    // Purple 색상
    var purpleTokens = [
        '--base-colors-purple-purple800',
        '--base-colors-purple-purple700',
        '--base-colors-purple-purple600',
        '--base-colors-purple-purple500',
        '--base-colors-purple-purple400',
        '--base-colors-purple-purple300',
        '--base-colors-purple-purple200',
        '--base-colors-purple-purple100',
        '--base-colors-purple-purple050',
    ];
    purpleTokens.forEach(function (tokenName) {
        var value = getCSSVariable(tokenName);
        if (value) {
            var key = tokenName.replace('--base-colors-purple-', '');
            colors.purple[key] = value;
        }
    });
    return colors;
}
/**
 * 타이포그래피 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 타이포그래피 토큰 객체
 */
function getTypographyTokens() {
    return {
        fontSize: {
            'font-10': getCSSVariable('--font-size-font-10'),
            'font-12': getCSSVariable('--font-size-font-12'),
            'font-13': getCSSVariable('--font-size-font-13'),
            'font-14': getCSSVariable('--font-size-font-14'),
            'font-16': getCSSVariable('--font-size-font-16'),
            'font-18': getCSSVariable('--font-size-font-18'),
            'font-20': getCSSVariable('--font-size-font-20'),
            'font-24': getCSSVariable('--font-size-font-24'),
            'font-36': getCSSVariable('--font-size-font-36'),
            'font-48': getCSSVariable('--font-size-font-48'),
            'font-64': getCSSVariable('--font-size-font-64'),
        },
        lineHeight: {
            'line-height-0': getCSSVariable('--font-line-heights-0'),
            'line-height-1': getCSSVariable('--font-line-heights-1'),
            'line-height-2': getCSSVariable('--font-line-heights-2'),
            'line-height-3': getCSSVariable('--font-line-heights-3'),
            'line-height-4': getCSSVariable('--font-line-heights-4'),
            'line-height-5': getCSSVariable('--font-line-heights-5'),
            'line-height-6': getCSSVariable('--font-line-heights-6'),
            'line-height-7': getCSSVariable('--font-line-heights-7'),
            'line-height-8': getCSSVariable('--font-line-heights-8'),
        },
        letterSpacing: {
            'letter-spacing-0': getCSSVariable('--font-letter-spacing-0'),
            'letter-spacing-1': getCSSVariable('--font-letter-spacing-1'),
            'letter-spacing-2': getCSSVariable('--font-letter-spacing-2'),
            'letter-spacing-3': getCSSVariable('--font-letter-spacing-3'),
            'letter-spacing-4': getCSSVariable('--font-letter-spacing-4'),
            'letter-spacing-5': getCSSVariable('--font-letter-spacing-5'),
        },
    };
}
/**
 * 간격 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 간격 토큰 객체
 */
function getSpacingTokens() {
    return {
        'spacing-4': getCSSVariable('--base-size-size-4'),
        'spacing-6': getCSSVariable('--base-size-size-6'),
        'spacing-8': getCSSVariable('--base-size-size-8'),
        'spacing-10': getCSSVariable('--base-size-size-10'),
        'spacing-12': getCSSVariable('--base-size-size-12'),
        'spacing-13': getCSSVariable('--base-size-size-13'),
        'spacing-14': getCSSVariable('--base-size-size-14'),
        'spacing-16': getCSSVariable('--base-size-size-16'),
        'spacing-18': getCSSVariable('--base-size-size-18'),
        'spacing-20': getCSSVariable('--base-size-size-20'),
        'spacing-24': getCSSVariable('--base-size-size-24'),
        'spacing-36': getCSSVariable('--base-size-size-36'),
        'spacing-40': getCSSVariable('--base-size-size-40'),
        'spacing-48': getCSSVariable('--base-size-size-48'),
        'spacing-50': getCSSVariable('--base-size-size-50'),
        'spacing-64': getCSSVariable('--base-size-size-64'),
        'spacing-100': getCSSVariable('--base-size-size-100'),
        'spacing-130': getCSSVariable('--base-size-size-130'),
        'spacing-140': getCSSVariable('--base-size-size-140'),
        'spacing-200': getCSSVariable('--base-size-size-200'),
        'spacing-300': getCSSVariable('--base-size-size-300'),
    };
}
/**
 * 패딩 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 패딩 토큰 객체
 */
function getPaddingTokens() {
    return {
        'padding-4': getCSSVariable('--padding-padding-4'),
        'padding-8': getCSSVariable('--padding-padding-8'),
        'padding-12': getCSSVariable('--padding-padding-12'),
        'padding-16': getCSSVariable('--padding-padding-16'),
        'padding-24': getCSSVariable('--padding-padding-24'),
        'padding-36': getCSSVariable('--padding-padding-36'),
        'padding-48': getCSSVariable('--padding-padding-48'),
        'padding-64': getCSSVariable('--padding-padding-64'),
        'padding-130': getCSSVariable('--padding-padding-130'),
        'padding-z': getCSSVariable('--padding-padding-z'),
    };
}
/**
 * 라운드(Radius) 토큰을 가져오는 함수 (CSS 변수 기반)
 * @returns 라운드 토큰 객체
 */
function getRadiusTokens() {
    return {
        'radius-xs': getCSSVariable('--radius-xs'),
        'radius-sm': getCSSVariable('--radius-sm'),
        'radius-md': getCSSVariable('--radius-md'),
        'radius-lg': getCSSVariable('--radius-lg'),
        'radius-pill': getCSSVariable('--radius-pill'),
        'radius-default': getCSSVariable('--radius-default'),
        'radius-none': getCSSVariable('--radius-none'),
    };
}
/**
 * 카테고리별 토큰 getter 생성기
 * @param {string} prefix - CSS 변수 prefix (예: '--button-')
 * @param {string} groupName - 반환 객체의 그룹명
 */
function getCategoryTokens(prefix, groupName) {
    var group = {};
    var style = getComputedStyle(typeof window !== 'undefined' ? document.documentElement : {});
    for (var key in style) {
        if (typeof key === 'string' && key.startsWith(prefix)) {
            var value = style.getPropertyValue(key).trim();
            if (value) {
                var name_2 = key.replace(prefix, '');
                group[name_2] = value;
            }
        }
    }
    return group;
}
/**
 * Button 디자인 토큰 반환 (Figma 1:1 매핑)
 * @returns 버튼 관련 디자인 토큰 객체
 */
function getButtonTokens() {
    return {
        'primary-background': getCSSVariable('--button-primary-background'),
        'primary-text': getCSSVariable('--button-primary-text'),
        'primary-border': getCSSVariable('--button-primary-border'),
        'disabled-background': getCSSVariable('--button-disabled-background'),
        'disabled-text': getCSSVariable('--button-disabled-text'),
        'disabled-border': getCSSVariable('--button-disabled-border'),
        'outline-background': getCSSVariable('--button-outline-background'),
        'outline-text': getCSSVariable('--button-outline-text'),
        'outline-border': getCSSVariable('--button-outline-border'),
        'red-background': getCSSVariable('--button-red-background'),
        'red-text': getCSSVariable('--button-red-text'),
        'red-border': getCSSVariable('--button-red-border'),
        'blue-background': getCSSVariable('--button-blue-solid-background'),
        'blue-text': getCSSVariable('--button-blue-solid-text'),
        'blue-border': getCSSVariable('--button-blue-solid-border'),
        'blue-solid-hover': getCSSVariable('--button-blue-solid-hover'),
        'light-solid-background': getCSSVariable('--button-light-solid-background'),
        'light-solid-text': getCSSVariable('--button-light-solid-text'),
        'light-solid-border': getCSSVariable('--button-light-solid-border'),
        'red-solid-background': getCSSVariable('--button-red-solid-background'),
        'red-solid-text': getCSSVariable('--button-red-solid-text'),
        'red-solid-border': getCSSVariable('--button-red-solid-border'),
        'red-solid-hover': getCSSVariable('--button-red-solid-hover'),
        // TODO: pill 관련 토큰이 Figma에 정의되면 교체 필요
        'pill-background': getCSSVariable('--button-primary-background'), // 임시
        'pill-text': getCSSVariable('--button-primary-text'), // 임시
        'pill-border': getCSSVariable('--button-primary-border'), // 임시
        'pill-hover-background': getCSSVariable('--button-primary-background'), // 임시
    };
}
function getInputTokens() {
    return getCategoryTokens('--input-', 'input');
}
function getBackgroundTokens() {
    return getCategoryTokens('--background-', 'background');
}
function getFontTokens() {
    return getCategoryTokens('--font-', 'font');
}
function getTradeTokens() {
    return getCategoryTokens('--trade-', 'trade');
}
function getTableTokens() {
    return getCategoryTokens('--table-', 'table');
}
function getPopupTokens() {
    return getCategoryTokens('--popup-', 'popup');
}
function getNavTokens() {
    return getCategoryTokens('--nav-', 'nav');
}
function getSidebarTokens() {
    return getCategoryTokens('--sidebar-', 'sidebar');
}
/**
 * 모든 디자인 토큰을 가져오는 함수
 * @returns 모든 디자인 토큰 객체
 */
function getAllDesignTokens() {
    return {
        colors: getColorTokens(),
        button: getButtonTokens(),
        input: getInputTokens(),
        background: getBackgroundTokens(),
        font: getFontTokens(),
        trade: getTradeTokens(),
        table: getTableTokens(),
        popup: getPopupTokens(),
        nav: getNavTokens(),
        sidebar: getSidebarTokens(),
        radius: getRadiusTokens(),
        padding: getPaddingTokens(),
        typography: getTypographyTokens(),
        spacing: getSpacingTokens(),
    };
}
/**
 * 토큰 이름을 사용자 친화적으로 변환하는 함수
 * @param tokenName - 토큰 이름
 * @returns 사용자 친화적인 이름
 */
function formatTokenName(tokenName) {
    return tokenName
        .replace(/^--/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, function (l) { return l.toUpperCase(); });
}
//# sourceMappingURL=tokenUtils.js.map