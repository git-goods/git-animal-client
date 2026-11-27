// 라우트가 4000자에서 자르므로 이미 불안정한 클라이언트에서 그 뒤를 올릴 이유가 없다
const MAX_MESSAGE_LENGTH = 4000;

// 웹훅 URL 은 서버에만 둔다. 리포팅 실패가 호출한 화면을 깨뜨리면 안 된다.
export const sendMessageToErrorChannel = (message: string) => {
  return fetch('/api/slack/error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: message.slice(0, MAX_MESSAGE_LENGTH) }),
  }).catch(() => undefined);
};
