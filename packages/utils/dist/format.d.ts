/**
 * 숫자를 통화 형식으로 포맷팅
 */
export declare function formatCurrency(amount: number, currency?: string, locale?: string): string;
/**
 * 숫자를 천 단위 구분자와 함께 포맷팅
 */
export declare function formatNumber(number: number, locale?: string, options?: Intl.NumberFormatOptions): string;
/**
 * 파일 크기를 읽기 쉬운 형식으로 포맷팅
 */
export declare function formatFileSize(bytes: number): string;
/**
 * 전화번호를 포맷팅
 */
export declare function formatPhoneNumber(phone: string): string;
/**
 * 신용카드 번호를 포맷팅
 */
export declare function formatCreditCard(cardNumber: string): string;
/**
 * 주민등록번호를 포맷팅
 */
export declare function formatSSN(ssn: string): string;
/**
 * 시간을 포맷팅
 */
export declare function formatTime(seconds: number): string;
/**
 * 퍼센트를 포맷팅
 */
export declare function formatPercent(value: number, total: number, decimals?: number): string;
/**
 * 카운트다운 타이머 포맷팅
 */
export declare function formatCountdown(seconds: number): string;
/**
 * 텍스트를 마크다운 링크 형식으로 변환
 */
export declare function formatMarkdownLink(text: string, url: string): string;
/**
 * 텍스트를 HTML 링크 형식으로 변환
 */
export declare function formatHtmlLink(text: string, url: string, target?: string): string;
/**
 * 텍스트를 해시태그 형식으로 변환
 */
export declare function formatHashtag(tag: string): string;
/**
 * 텍스트를 멘션 형식으로 변환
 */
export declare function formatMention(username: string): string;
//# sourceMappingURL=format.d.ts.map