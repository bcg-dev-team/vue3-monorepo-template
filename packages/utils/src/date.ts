import type { Locale } from '@template/types';

/**
 * 날짜를 포맷팅
 */
export function formatDate(
  date: Date | string | number,
  format = 'YYYY-MM-DD',
  locale: Locale = 'ko'
): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error('Invalid date');
  }

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  // locale에 따른 날짜 포맷팅 적용
  if (locale === 'ko') {
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  } else {
    // 영어권 날짜 포맷팅 (MM/DD/YYYY)
    return format
      .replace('YYYY', String(year))
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }
}

/**
 * 상대적 시간 표시 (예: "3분 전", "1시간 전")
 */
export function formatRelativeTime(date: Date | string | number, locale: Locale = 'ko'): string {
  const now = new Date();
  const target = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - target.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return locale === 'ko' ? '방금 전' : 'just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return locale === 'ko' ? `${diffInMinutes}분 전` : `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return locale === 'ko' ? `${diffInHours}시간 전` : `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return locale === 'ko' ? `${diffInDays}일 전` : `${diffInDays} days ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return locale === 'ko' ? `${diffInWeeks}주 전` : `${diffInWeeks} weeks ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return locale === 'ko' ? `${diffInMonths}개월 전` : `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return locale === 'ko' ? `${diffInYears}년 전` : `${diffInYears} years ago`;
}

/**
 * 날짜가 오늘인지 확인
 */
export function isToday(date: Date | string | number): boolean {
  const today = new Date();
  const target = new Date(date);

  return today.toDateString() === target.toDateString();
}

/**
 * 날짜가 어제인지 확인
 */
export function isYesterday(date: Date | string | number): boolean {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const target = new Date(date);

  return yesterday.toDateString() === target.toDateString();
}

/**
 * 날짜가 이번 주인지 확인
 */
export function isThisWeek(date: Date | string | number): boolean {
  const now = new Date();
  const target = new Date(date);
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return target >= startOfWeek && target <= endOfWeek;
}

/**
 * 날짜가 이번 달인지 확인
 */
export function isThisMonth(date: Date | string | number): boolean {
  const now = new Date();
  const target = new Date(date);

  return now.getFullYear() === target.getFullYear() && now.getMonth() === target.getMonth();
}

/**
 * 날짜 범위 생성
 */
export function getDateRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);

  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

/**
 * 월의 첫 번째 날과 마지막 날 가져오기
 */
export function getMonthBoundaries(date: Date): { start: Date; end: Date } {
  const year = date.getFullYear();
  const month = date.getMonth();

  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

  return { start, end };
}

/**
 * 나이 계산
 */
export function calculateAge(birthDate: Date | string | number): number {
  const today = new Date();
  const birth = new Date(birthDate);

  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

/**
 * 시간대 변환
 */
export function convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date {
  // 간단한 시간대 변환 구현 (실제로는 더 복잡한 로직이 필요)
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;

  // fromTimezone에서 UTC로 변환
  const fromOffset = getTimezoneOffset(fromTimezone);
  const fromUtc = utc - fromOffset;

  // UTC에서 toTimezone으로 변환
  const toOffset = getTimezoneOffset(toTimezone);
  const targetTimezone = new Date(fromUtc + toOffset);

  return targetTimezone;
}

// 간단한 시간대 오프셋 계산 (실제로는 더 정확한 구현 필요)
function getTimezoneOffset(timezone: string): number {
  const timezoneOffsets: Record<string, number> = {
    UTC: 0,
    GMT: 0,
    EST: -5 * 60 * 60 * 1000,
    PST: -8 * 60 * 60 * 1000,
    JST: 9 * 60 * 60 * 1000,
    KST: 9 * 60 * 60 * 1000,
  };

  return timezoneOffsets[timezone] || 0;
}
