import { describe, it, expect } from 'vitest';
import dayjs from './timezone';

describe('dayjs timezone', () => {
  // 한국 시간
  it('KST(UTC+9, Asia/Seoul) 21:00은 UTC 12:00과 같다', () => {
    const utcTime = dayjs.tz('2025-03-09 12:00:00', 'UTC');
    const kstTime = dayjs.tz('2025-03-09 21:00:00', 'Asia/Seoul');
    expect(kstTime.isSame(utcTime)).toBe(true);
  });

  // 서머타임 미적용
  it('EST(UTC-5, America/New_York) 07:00은 UTC 12:00과 같다', () => {
    const utcTime = dayjs.tz('2025-03-09 12:00:00', 'UTC');
    const estTime = dayjs.tz('2025-03-09 07:00:00', 'America/New_York');
    expect(estTime.isSame(utcTime)).toBe(true);
  });

  // 서머타임 적용
  it('EDT(UTC-4, America/New_York) 08:00은 UTC 12:00과 같다', () => {
    const utcTime = dayjs.tz('2025-11-02 12:00:00', 'UTC');
    const edtTime = dayjs.tz('2025-11-02 08:00:00', 'America/New_York');
    expect(edtTime.isSame(utcTime)).toBe(true);
  });
});
