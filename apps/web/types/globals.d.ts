declare namespace NodeJS {
  interface ProcessEnv {
    // 서버 전용. NEXT_PUBLIC_ 접두사를 붙이면 번들에 실려 누구나 채널에 쓸 수 있다.
    SLACK_ERROR_CHANNEL_WEBHOOK_URL: string;
  }
}
