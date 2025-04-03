import { describe, it, expect } from 'vitest';
import { convertToUTC } from './timezone';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

describe('Timezone Utilities', () => {
  describe('convertToUTC', () => {
    it('KST에서 UTC로 변환하면 +9시간 차이가 나야 한다.', () => {
      const date = dayjs.tz('2024-01-01 12:00:00', 'Asia/Seoul').toDate();
      const utcDate = convertToUTC(date);
      expect(utcDate.toISOString()).toBe('2024-01-01T03:00:00.000Z');
    });

    it('EST에서 UTC로 변환하면 -5시간 차이가 나야 한다.', () => {
      const date = dayjs.tz('2024-01-01 12:00:00', 'America/New_York').toDate();
      const utcDate = convertToUTC(date);
      expect(utcDate.toISOString()).toBe('2024-01-01T17:00:00.000Z');
    });

    it('UTC로 변환하면 시간대 오프셋이 0이어야 한다.', () => {
      const date = new Date('2024-01-01T12:00:00');
      const utcDate = convertToUTC(date);
      expect(utcDate).toEqual(new Date('2024-01-01T03:00:00.000Z'));
    });
  });
});
