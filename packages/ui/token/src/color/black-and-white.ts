export const BLACK_ALPHA = {
  black_alpha_5: 'rgba(0, 0, 0, 0.05)',
  black_alpha_10: 'rgba(0, 0, 0, 0.1)',
  black_alpha_25: 'rgba(0, 0, 0, 0.25)',
  black_alpha_50: 'rgba(0, 0, 0, 0.5)',
  black_alpha_75: 'rgba(0, 0, 0, 0.75)',
  black_alpha_90: 'rgba(0, 0, 0, 0.9)',
} as const;

export const WHITE_ALPHA = {
  white_alpha_5: 'rgba(255, 255, 255, 0.05)',
  white_alpha_10: 'rgba(255, 255, 255, 0.1)',
  white_alpha_25: 'rgba(255, 255, 255, 0.25)',
  white_alpha_50: 'rgba(255, 255, 255, 0.5)',
  white_alpha_75: 'rgba(255, 255, 255, 0.75)',
  white_alpha_90: 'rgba(255, 255, 255, 0.9)',
} as const;

// Panda(webview) 가 이 키 이름으로 토큰을 만든다. webview 이관 후 삭제.
export const BLACK = {
  black: '#000000',
  black_100: 'rgba(0, 0, 0, 1)',
  black_90: 'rgba(0, 0, 0, 0.9)',
  black_75: 'rgba(0, 0, 0, 0.75)',
  black_50: 'rgba(0, 0, 0, 0.5)',
  black_25: 'rgba(0, 0, 0, 0.25)',
  black_10: 'rgba(0, 0, 0, 0.1)',
  black_5: 'rgba(0, 0, 0, 0.05)',
} as const;

export const WHITE = {
  white: '#FFFFFF',
  white_100: 'rgba(255, 255, 255, 1)',
  white_90: 'rgba(255, 255, 255, 0.9)',
  white_75: 'rgba(255, 255, 255, 0.75)',
  white_50: 'rgba(255, 255, 255, 0.5)',
  white_25: 'rgba(255, 255, 255, 0.25)',
  white_10: 'rgba(255, 255, 255, 0.1)',
  white_5: 'rgba(255, 255, 255, 0.05)',
} as const;
