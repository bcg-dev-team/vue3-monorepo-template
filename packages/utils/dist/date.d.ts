/**
 * 날짜를 포맷팅
 */
export declare function formatDate(date: Date | string | number, formatStr?: string, locale?: string, timeZone?: string): string;
/**
 * 상대적 시간 표시 (예: "3분 전", "1시간 전")
 */
export declare function formatRelativeTime(date: Date | string | number, locale?: string): string;
/**
 * 날짜가 오늘인지 확인
 */
export declare function isTodayDate(date: Date | string | number): boolean;
/**
 * 날짜가 어제인지 확인
 */
export declare function isYesterdayDate(date: Date | string | number): boolean;
/**
 * 날짜가 이번 주인지 확인
 */
export declare function isThisWeekDate(date: Date | string | number): boolean;
/**
 * 날짜가 이번 달인지 확인
 */
export declare function isThisMonthDate(date: Date | string | number): boolean;
/**
 * 날짜 범위 생성
 */
export declare function getDateRange(startDate: Date | string | number, endDate: Date | string | number): Date[];
/**
 * 월의 첫 번째 날과 마지막 날 가져오기
 */
export declare function getMonthBoundaries(date: Date | string | number): {
    start: Date;
    end: Date;
};
/**
 * 나이 계산
 */
export declare function calculateAge(birthDate: Date | string | number): number;
/**
 * 시간대 변환
 */
export declare function convertTimezone(date: Date | string | number, fromTimezone: string, toTimezone: string): Date;
/**
 * 두 날짜 간의 차이를 계산
 */
export declare function getDateDiff(date1: Date | string | number, date2: Date | string | number, unit?: 'days' | 'hours' | 'minutes' | 'seconds'): number;
/**
 * 날짜에 일정 기간을 추가
 */
export declare function addDaysToDate(date: Date | string | number, days: number): Date;
export declare function addMonthsToDate(date: Date | string | number, months: number): Date;
export declare function addYearsToDate(date: Date | string | number, years: number): Date;
/**
 * 현재 시간을 특정 시간대에서 가져오기
 */
export declare function nowInTimezone(timeZone?: string): Date;
/**
 * 시간대 오프셋 가져오기 (분 단위)
 */
export declare function getTimezoneOffsetInMinutes(timezone: string): number;
//# sourceMappingURL=date.d.ts.map