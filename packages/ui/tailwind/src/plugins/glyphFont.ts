import plugin from 'tailwindcss/plugin';
import { GLYPH } from '@gitanimals/ui-token';

/**
 * GitAnimals glyph 타이포 플러그인 (ADR-004).
 *
 * @gitanimals/ui-token 의 GLYPH(single source)를 직접 소비해 PandaCSS textStyle 과
 * 1:1 인 "완전체" 유틸리티를 생성한다. 각 유틸은 font-family/size/weight/line-height/
 * letter-spacing 을 모두 포함하므로, Tailwind fontSize 토큰처럼 weight 와 line-height 가
 * 어긋나는 문제(dev 변환물의 결함)가 구조적으로 발생하지 않는다.
 *
 * @example
 *   panda    textStyle: 'glyph16.bold'
 *   tailwind className="glyph16-bold"
 */
export const glyphFontPlugin = plugin(({ addUtilities }) => {
  const utilities: Record<string, Record<string, string>> = {};

  for (const [glyphKey, variants] of Object.entries(GLYPH)) {
    const size = glyphKey.replace('glyph', ''); // 'glyph16' → '16'
    for (const [weight, style] of Object.entries(variants as Record<string, Record<string, string | number>>)) {
      const rule: Record<string, string> = {};
      for (const [prop, value] of Object.entries(style)) {
        rule[prop] = String(value);
      }
      utilities[`.glyph${size}-${weight}`] = rule;
    }
  }

  addUtilities(utilities);
});
