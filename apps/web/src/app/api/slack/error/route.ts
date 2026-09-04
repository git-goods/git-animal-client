const MAX_MESSAGE_LENGTH = 4000;

// 웹훅 URL 이 NEXT_PUBLIC_ 이던 시절엔 번들에 실려 누구나 채널에 쓸 수 있었다
export async function POST(request: Request) {
  const webhook = process.env.SLACK_ERROR_CHANNEL_WEBHOOK_URL;
  const { message } = await request.json().catch(() => ({ message: null }));

  // 브라우저가 보내는 값이라 그대로 흘려보내지 않는다
  const text = typeof message === 'string' ? message.slice(0, MAX_MESSAGE_LENGTH) : '';

  if (webhook && text.trim()) {
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    }).catch(() => undefined);
  }

  return new Response(null, { status: 204 });
}
