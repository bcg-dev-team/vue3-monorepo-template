"use strict";
/**
 * @template/theme - 공유 테마 관리 패키지
 *
 * 이 패키지는 모노레포의 모든 앱에서 공유되는 테마 관리 기능을 제공합니다.
 *
 * @example
 * ```typescript
 * import { useTheme, useThemeStore } from '@template/theme';
 *
 * // 컴포저블 사용
 * const { isDark, toggleTheme } = useTheme();
 *
 * // 스토어 직접 사용
 * const themeStore = useThemeStore();
 * themeStore.toggleTheme();
 * ```
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
// 기본 내보내기
var composables_1 = require("./composables");
Object.defineProperty(exports, "default", { enumerable: true, get: function () { return composables_1.useTheme; } });
// 테마 관련 export
__exportStar(require("./composables"), exports);
__exportStar(require("./store"), exports);
__exportStar(require("./utils"), exports);
//# sourceMappingURL=index.js.map