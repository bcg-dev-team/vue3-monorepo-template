"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = useTheme;
exports.useGlobalTheme = useGlobalTheme;
var vue_1 = require("vue");
var store_1 = require("./store");
/**
 * 전역 테마 관리 컴포저블
 * 모든 앱에서 공유되는 테마 로직을 제공합니다.
 */
function useTheme() {
    var themeStore = (0, store_1.useThemeStore)();
    /**
     * HTML 요소에 data-theme 속성을 설정합니다.
     */
    var updateHtmlClass = function () {
        if (typeof document === 'undefined')
            return;
        document.documentElement.setAttribute('data-theme', themeStore.isDark ? 'dark' : 'light');
    };
    // 테마 변경 시 HTML 클래스 업데이트
    (0, vue_1.watch)(function () { return themeStore.isDark; }, function () {
        updateHtmlClass();
    }, { immediate: true });
    return {
        isDark: (0, vue_1.computed)(function () { return themeStore.isDark; }),
        toggleTheme: themeStore.toggleTheme,
        setTheme: themeStore.setTheme,
        setSystemTheme: themeStore.setSystemTheme,
        updateHtmlClass: updateHtmlClass,
    };
}
/**
 * 전역 테마 인스턴스 (싱글톤)
 */
var globalThemeInstance = null;
/**
 * 전역 테마 컴포저블 (싱글톤 패턴)
 * 앱 전체에서 동일한 테마 인스턴스를 공유합니다.
 */
function useGlobalTheme() {
    if (!globalThemeInstance) {
        globalThemeInstance = useTheme();
    }
    return globalThemeInstance;
}
//# sourceMappingURL=composables.js.map