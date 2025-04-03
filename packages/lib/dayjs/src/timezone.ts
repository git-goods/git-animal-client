import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * 주어진 날짜를 UTC 시간으로 변환합니다.
 * @param date - 변환할 날짜 객체 또는 문자열
 * @returns UTC 시간으로 변환된 새로운 Date 객체
 * @example
 * ```ts
 * const date = new Date('2024-01-01 12:34:56+09:00');
 * const utcDate = convertToUTC(date);
 * console.log(utcDate); // 2024-01-01T03:34:56.000Z
 * ```
 */
export function convertToUTC(date: Date | string): Date {
  const utcDate = dayjs(date).utc().toDate();
  return utcDate;
}
