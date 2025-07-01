/**
 * 문자열을 카멜케이스로 변환
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toLowerCase());
}

/**
 * 문자열을 파스칼케이스로 변환
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

/**
 * 문자열을 케밥케이스로 변환
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * 문자열을 스네이크케이스로 변환
 */
export function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/**
 * 문자열을 제한된 길이로 자르고 말줄임표 추가
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (str.length <= length) return str;
  return str.substring(0, length - suffix.length) + suffix;
}

/**
 * 문자열에서 HTML 태그 제거
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 문자열을 단어 단위로 자르기
 */
export function wordWrap(str: string, maxLength: number): string[] {
  const words = str.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine ? ' ' : '') + word;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * 문자열이 이메일 형식인지 검증
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 문자열이 URL 형식인지 검증
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * 문자열에서 숫자만 추출
 */
export function extractNumbers(str: string): string {
  return str.replace(/\D/g, '');
}

/**
 * 문자열을 지정된 길이로 패딩
 */
export function padString(
  str: string,
  length: number,
  char = ' ',
  side: 'left' | 'right' | 'both' = 'left'
): string {
  const padLength = length - str.length;
  if (padLength <= 0) return str;

  const pad = char.repeat(padLength);

  switch (side) {
    case 'left':
      return pad + str;
    case 'right':
      return str + pad;
    case 'both': {
      const leftPad = char.repeat(Math.floor(padLength / 2));
      const rightPad = char.repeat(Math.ceil(padLength / 2));
      return leftPad + str + rightPad;
    }
    default:
      return str;
  }
}
