/**
 * 문자열을 카멜케이스로 변환
 */
export function toCamelCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (_, c) => c.toLowerCase());
}
/**
 * 문자열을 파스칼케이스로 변환
 */
export function toPascalCase(str) {
    return str
        .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
        .replace(/^(.)/, (_, c) => c.toUpperCase());
}
/**
 * 문자열을 케밥케이스로 변환
 */
export function toKebabCase(str) {
    return str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')
        .replace(/[-_\s]+/g, '-');
}
/**
 * 문자열을 스네이크케이스로 변환
 */
export function toSnakeCase(str) {
    return str
        .replace(/([A-Z])/g, '_$1')
        .toLowerCase()
        .replace(/^_/, '')
        .replace(/[-_\s]+/g, '_');
}
/**
 * 문자열을 제목 케이스로 변환
 */
export function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
/**
 * 문자열을 제한된 길이로 자르고 말줄임표 추가
 */
export function truncate(str, length, suffix = '...') {
    if (str.length <= length)
        return str;
    return str.substring(0, length - suffix.length) + suffix;
}
/**
 * 문자열에서 HTML 태그 제거
 */
export function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
}
/**
 * 문자열을 단어 단위로 자르기
 */
export function wordWrap(str, maxLength) {
    const words = str.split(' ');
    const lines = [];
    let currentLine = '';
    for (const word of words) {
        if ((currentLine + word).length <= maxLength) {
            currentLine += (currentLine ? ' ' : '') + word;
        }
        else {
            if (currentLine)
                lines.push(currentLine);
            currentLine = word;
        }
    }
    if (currentLine)
        lines.push(currentLine);
    return lines;
}
/**
 * 문자열이 이메일 형식인지 검증
 */
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
/**
 * 문자열이 URL 형식인지 검증
 */
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * 문자열에서 숫자만 추출
 */
export function extractNumbers(str) {
    return str.replace(/\D/g, '');
}
/**
 * 문자열을 지정된 길이로 패딩
 */
export function padStart(str, length, char = ' ') {
    return str.padStart(length, char);
}
export function padEnd(str, length, char = ' ') {
    return str.padEnd(length, char);
}
//# sourceMappingURL=string.js.map