export const sendMessageToErrorChannel = (message: string) => {
  return fetch('https://hooks.slack.com/services/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', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: JSON.stringify({ text: message }),
  });
};
