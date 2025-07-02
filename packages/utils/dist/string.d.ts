/**
 * 문자열을 카멜케이스로 변환
 */
export declare function toCamelCase(str: string): string;
/**
 * 문자열을 파스칼케이스로 변환
 */
export declare function toPascalCase(str: string): string;
/**
 * 문자열을 케밥케이스로 변환
 */
export declare function toKebabCase(str: string): string;
/**
 * 문자열을 스네이크케이스로 변환
 */
export declare function toSnakeCase(str: string): string;
/**
 * 문자열을 제목 케이스로 변환
 */
export declare function toTitleCase(str: string): string;
/**
 * 문자열을 제한된 길이로 자르고 말줄임표 추가
 */
export declare function truncate(str: string, length: number, suffix?: string): string;
/**
 * 문자열에서 HTML 태그 제거
 */
export declare function stripHtml(html: string): string;
/**
 * 문자열을 단어 단위로 자르기
 */
export declare function wordWrap(str: string, maxLength: number): string[];
/**
 * 문자열이 이메일 형식인지 검증
 */
export declare function isValidEmail(email: string): boolean;
/**
 * 문자열이 URL 형식인지 검증
 */
export declare function isValidUrl(url: string): boolean;
/**
 * 문자열에서 숫자만 추출
 */
export declare function extractNumbers(str: string): string;
/**
 * 문자열을 지정된 길이로 패딩
 */
export declare function padStart(str: string, length: number, char?: string): string;
export declare function padEnd(str: string, length: number, char?: string): string;
//# sourceMappingURL=string.d.ts.map