/**
 * 숫자를 통화 형식으로 포맷팅
 */
export function formatCurrency(amount, currency = 'KRW', locale = 'ko-KR') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}
/**
 * 숫자를 천 단위 구분자와 함께 포맷팅
 */
export function formatNumber(number, locale = 'ko-KR', options) {
    return new Intl.NumberFormat(locale, options).format(number);
}
/**
 * 파일 크기를 읽기 쉬운 형식으로 포맷팅
 */
export function formatFileSize(bytes) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}
/**
 * 전화번호를 포맷팅
 */
export function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    }
    else if (cleaned.length === 11) {
        return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
}
/**
 * 신용카드 번호를 포맷팅
 */
export function formatCreditCard(cardNumber) {
    const cleaned = cardNumber.replace(/\s/g, '');
    if (cleaned.length === 16) {
        return cleaned.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    }
    return cardNumber;
}
/**
 * 주민등록번호를 포맷팅
 */
export function formatSSN(ssn) {
    const cleaned = ssn.replace(/\D/g, '');
    if (cleaned.length === 13) {
        return cleaned.replace(/(\d{6})(\d{7})/, '$1-$2');
    }
    return ssn;
}
/**
 * 시간을 포맷팅
 */
export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
/**
 * 퍼센트를 포맷팅
 */
export function formatPercent(value, total, decimals = 1) {
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(decimals)}%`;
}
/**
 * 카운트다운 타이머 포맷팅
 */
export function formatCountdown(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (days > 0) {
        return `${days}일 ${hours}시간 ${minutes}분`;
    }
    else if (hours > 0) {
        return `${hours}시간 ${minutes}분`;
    }
    else if (minutes > 0) {
        return `${minutes}분 ${secs}초`;
    }
    return `${secs}초`;
}
/**
 * 텍스트를 마크다운 링크 형식으로 변환
 */
export function formatMarkdownLink(text, url) {
    return `[${text}](${url})`;
}
/**
 * 텍스트를 HTML 링크 형식으로 변환
 */
export function formatHtmlLink(text, url, target = '_blank') {
    return `<a href="${url}" target="${target}" rel="noopener noreferrer">${text}</a>`;
}
/**
 * 텍스트를 해시태그 형식으로 변환
 */
export function formatHashtag(tag) {
    const cleaned = tag.replace(/[^a-zA-Z0-9가-힣]/g, '');
    return `#${cleaned}`;
}
/**
 * 텍스트를 멘션 형식으로 변환
 */
export function formatMention(username) {
    const cleaned = username.replace(/[^a-zA-Z0-9_]/g, '');
    return `@${cleaned}`;
}
//# sourceMappingURL=format.js.map