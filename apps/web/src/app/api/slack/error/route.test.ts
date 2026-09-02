import { beforeEach, describe, expect, it, vi } from 'vitest';

import { POST } from './route';

const WEBHOOK = 'https://hooks.slack.test/webhook';

const jsonRequest = (body: unknown) =>
  new Request('http://localhost/api/slack/error', {
    method: 'POST',
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/slack/error', () => {
  let fetchSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.stubEnv('SLACK_ERROR_CHANNEL_WEBHOOK_URL', WEBHOOK);
    fetchSpy = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal('fetch', fetchSpy);
  });

  it('메시지를 웹훅으로 전달한다', async () => {
    const res = await POST(jsonRequest({ message: '펫 뽑기 실패' }));

    expect(res.status).toBe(204);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe(WEBHOOK);
    expect(JSON.parse(init.body)).toEqual({ text: '펫 뽑기 실패' });
  });

  it('브라우저가 보낸 값이라 4000자에서 자른다', async () => {
    await POST(jsonRequest({ message: 'a'.repeat(5000) }));

    expect(JSON.parse(fetchSpy.mock.calls[0][1].body).text).toHaveLength(4000);
  });

  it('빈 메시지·깨진 JSON·웹훅 미설정이면 호출하지 않는다', async () => {
    expect((await POST(jsonRequest({}))).status).toBe(204);
    expect((await POST(jsonRequest({ message: '   ' }))).status).toBe(204);
    expect((await POST(jsonRequest('not json'))).status).toBe(204);

    vi.stubEnv('SLACK_ERROR_CHANNEL_WEBHOOK_URL', '');
    expect((await POST(jsonRequest({ message: 'hi' }))).status).toBe(204);

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('웹훅이 실패해도 호출한 화면을 깨뜨리지 않는다', async () => {
    fetchSpy.mockRejectedValue(new Error('slack down'));

    expect((await POST(jsonRequest({ message: 'boom' }))).status).toBe(204);
  });
});
