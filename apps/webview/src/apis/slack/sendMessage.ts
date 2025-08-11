export const sendMessageToErrorChannel = (message: string) => {
  return fetch(process.env.NEXT_PUBLIC_SLACK_ERROR_CHANNEL_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({ text: message }),
  });
};
