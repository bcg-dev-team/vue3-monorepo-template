/**
 * 전역 테마 상태 관리 스토어
 * 모든 앱에서 공유되는 테마 설정을 관리합니다.
 */
export declare const useThemeStore: import("pinia").StoreDefinition<"theme", Pick<{
    isDark: import("vue").Ref<boolean, boolean>;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;
    setSystemTheme: () => void;
}, "isDark">, Pick<{
    isDark: import("vue").Ref<boolean, boolean>;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;
    setSystemTheme: () => void;
}, never>, Pick<{
    isDark: import("vue").Ref<boolean, boolean>;
    toggleTheme: () => void;
    setTheme: (dark: boolean) => void;
    setSystemTheme: () => void;
}, "toggleTheme" | "setTheme" | "setSystemTheme">>;
//# sourceMappingURL=store.d.ts.map