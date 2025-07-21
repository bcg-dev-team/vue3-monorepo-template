"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useThemeStore = void 0;
var pinia_1 = require("pinia");
var vue_1 = require("vue");
/**
 * 전역 테마 상태 관리 스토어
 * 모든 앱에서 공유되는 테마 설정을 관리합니다.
 */
exports.useThemeStore = (0, pinia_1.defineStore)('theme', function () {
    var isDark = (0, vue_1.ref)(false);
    // localStorage에서 테마 설정 복원 (안전한 접근)
    var savedTheme = null;
    try {
        if (typeof localStorage !== 'undefined') {
            savedTheme = localStorage.getItem('theme-mode');
        }
    }
    catch (_a) {
        // localStorage 접근 실패 시 기본값 사용
    }
    if (savedTheme === 'dark') {
        isDark.value = true;
    }
    /**
     * 테마를 토글합니다.
     */
    var toggleTheme = function () {
        isDark.value = !isDark.value;
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light');
            }
        }
        catch (_a) {
            // localStorage 접근 실패 시 무시
        }
    };
    /**
     * 특정 테마로 설정합니다.
     * @param dark - 다크 테마 여부
     */
    var setTheme = function (dark) {
        isDark.value = dark;
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('theme-mode', dark ? 'dark' : 'light');
            }
        }
        catch (_a) {
            // localStorage 접근 실패 시 무시
        }
    };
    /**
     * 시스템 테마를 감지하여 설정합니다.
     */
    var setSystemTheme = function () {
        if (typeof window !== 'undefined') {
            var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            isDark.value = mediaQuery.matches;
            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem('theme-mode', isDark.value ? 'dark' : 'light');
                }
            }
            catch (_a) {
                // localStorage 접근 실패 시 무시
            }
        }
    };
    return {
        isDark: isDark,
        toggleTheme: toggleTheme,
        setTheme: setTheme,
        setSystemTheme: setSystemTheme,
    };
});
//# sourceMappingURL=store.js.map