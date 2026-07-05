/**
 * 폰트 패밀리 토큰. PandaCSS(`packages/ui/panda/src/theme/tokens.ts`)의 `fonts`와 1:1.
 *
 * glyph 타이포는 fontSize 토큰이 아니라 glyphFontPlugin 이 생성하는 완전체 유틸
 * (`.glyph16-bold` 등)을 사용한다 — 이유는 ADR-004 참고.
 */
export const fontFamily: Record<string, string[]> = {
  body: ['system-ui', 'sans-serif'],
  mono: ['Menlo', 'monospace'],
  dnf: ['DNFBitBitv2', 'monospace'],
  product: ['Product Sans', 'system-ui', 'sans-serif'],
  dosgothic: ['DOSGothic', 'system-ui', 'sans-serif'],
};
