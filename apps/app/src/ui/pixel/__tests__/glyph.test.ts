import { GLYPH } from '@gitanimals/ui-token';
import { glyphStyle } from '../glyph';

describe('glyphStyle', () => {
  it('GLYPH 토큰을 숫자 값과 Galmuri 패밀리로 변환한다', () => {
    const style = glyphStyle('glyph16', 'bold');
    const token = GLYPH.glyph16.bold;

    expect(style.fontSize).toBe(parseFloat(token.fontSize));
    expect(style.lineHeight).toBe(parseFloat(token.fontSize) * 1.2);
    expect(style.letterSpacing).toBe(-0.3);
    expect(style.fontFamily).toBe('Galmuri11-Bold');
    expect('fontStyle' in style).toBe(false);
  });

  it('regular 는 Galmuri11 을 쓰고 없는 weight 는 있는 쪽으로 대체한다', () => {
    expect(glyphStyle('glyph16', 'regular').fontFamily).toBe('Galmuri11');
    expect(glyphStyle('glyph82', 'regular').fontSize).toBe(82);
  });
});
