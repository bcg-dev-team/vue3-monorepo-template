import { formatDistanceToNow, isToday, isYesterday, isThisWeek, isThisMonth, eachDayOfInterval, startOfMonth, endOfMonth, differenceInYears, addDays, addMonths, addYears, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, } from 'date-fns';
import { formatInTimeZone, utcToZonedTime, zonedTimeToUtc, getTimezoneOffset } from 'date-fns-tz';
import { ko, enUS, ja, zhCN } from 'date-fns/locale';
// 로케일 매핑
const localeMap = {
    ko,
    en: enUS,
    ja,
    zh: zhCN,
};
/**
 * 날짜를 포맷팅
 */
export function formatDate(date, formatStr = 'yyyy-MM-dd', locale = 'ko', timeZone = 'Asia/Seoul') {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
    return formatInTimeZone(d, timeZone, formatStr, {
        locale: localeMap[locale],
    });
}
/**
 * 상대적 시간 표시 (예: "3분 전", "1시간 전")
 */
export function formatRelativeTime(date, locale = 'ko') {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error('Invalid date');
    }
    return formatDistanceToNow(d, {
        addSuffix: true,
        locale: localeMap[locale],
    });
}
/**
 * 날짜가 오늘인지 확인
 */
export function isTodayDate(date) {
    const d = new Date(date);
    return isToday(d);
}
/**
 * 날짜가 어제인지 확인
 */
export function isYesterdayDate(date) {
    const d = new Date(date);
    return isYesterday(d);
}
/**
 * 날짜가 이번 주인지 확인
 */
export function isThisWeekDate(date) {
    const d = new Date(date);
    return isThisWeek(d);
}
/**
 * 날짜가 이번 달인지 확인
 */
export function isThisMonthDate(date) {
    const d = new Date(date);
    return isThisMonth(d);
}
/**
 * 날짜 범위 생성
 */
export function getDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return eachDayOfInterval({ start, end });
}
/**
 * 월의 첫 번째 날과 마지막 날 가져오기
 */
export function getMonthBoundaries(date) {
    const d = new Date(date);
    return {
        start: startOfMonth(d),
        end: endOfMonth(d),
    };
}
/**
 * 나이 계산
 */
export function calculateAge(birthDate) {
    const birth = new Date(birthDate);
    const today = new Date();
    return differenceInYears(today, birth);
}
/**
 * 시간대 변환
 */
export function convertTimezone(date, fromTimezone, toTimezone) {
    const d = new Date(date);
    // fromTimezone에서 UTC로 변환
    const utcDate = zonedTimeToUtc(d, fromTimezone);
    // UTC에서 toTimezone으로 변환
    return utcToZonedTime(utcDate, toTimezone);
}
/**
 * 두 날짜 간의 차이를 계산
 */
export function getDateDiff(date1, date2, unit = 'days') {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    switch (unit) {
        case 'days':
            return differenceInDays(d2, d1);
        case 'hours':
            return differenceInHours(d2, d1);
        case 'minutes':
            return differenceInMinutes(d2, d1);
        case 'seconds':
            return differenceInSeconds(d2, d1);
        default:
            return differenceInDays(d2, d1);
    }
}
/**
 * 날짜에 일정 기간을 추가
 */
export function addDaysToDate(date, days) {
    const d = new Date(date);
    return addDays(d, days);
}
export function addMonthsToDate(date, months) {
    const d = new Date(date);
    return addMonths(d, months);
}
export function addYearsToDate(date, years) {
    const d = new Date(date);
    return addYears(d, years);
}
/**
 * 현재 시간을 특정 시간대에서 가져오기
 */
export function nowInTimezone(timeZone = 'Asia/Seoul') {
    return utcToZonedTime(new Date(), timeZone);
}
/**
 * 시간대 오프셋 가져오기 (분 단위)
 */
export function getTimezoneOffsetInMinutes(timezone) {
    return getTimezoneOffset(timezone);
}
//# sourceMappingURL=date.js.map