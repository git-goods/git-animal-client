import type { Persona } from '@gitanimals/api';
import { personaImageUrl, pickHomePets } from '../pickHomePets';

const persona = (id: string, level: string, visible = true): Persona => ({
  id,
  type: `T${id}`,
  level,
  visible,
  dropRate: '1',
  grade: 'DEFAULT',
});

describe('pickHomePets', () => {
  it('visible 이 아닌 펫은 제외한다', () => {
    const result = pickHomePets([persona('1', '5'), persona('2', '9', false)]);
    expect(result.map((p) => p.id)).toEqual(['1']);
  });

  it('레벨(문자열 숫자)이 큰 순으로 정렬한다', () => {
    const result = pickHomePets([persona('1', '9'), persona('2', '10'), persona('3', '100')]);
    expect(result.map((p) => p.id)).toEqual(['3', '2', '1']);
  });

  it('12마리면 10마리만 남긴다', () => {
    const many = Array.from({ length: 12 }, (_, i) => persona(String(i), String(i)));
    expect(pickHomePets(many)).toHaveLength(10);
  });

  it('앱에서 고른 펫이 있으면 visible 과 상관없이 그것만 쓴다', () => {
    const result = pickHomePets([persona('1', '5'), persona('2', '9', false), persona('3', '1')], ['2', '3']);
    expect(result.map((p) => p.id)).toEqual(['2', '3']);
  });

  it('고른 목록이 비어 있으면 아무 펫도 없다', () => {
    expect(pickHomePets([persona('1', '5')], [])).toEqual([]);
  });

  it('빈 배열이면 빈 배열', () => {
    expect(pickHomePets([])).toEqual([]);
  });

  it('원본 배열을 바꾸지 않는다', () => {
    const input = [persona('1', '1'), persona('2', '2')];
    pickHomePets(input);
    expect(input.map((p) => p.id)).toEqual(['1', '2']);
  });
});

describe('personaImageUrl', () => {
  it('static 서버의 펫 PNG 주소를 만든다', () => {
    expect(personaImageUrl('CAT')).toBe('https://static.gitanimals.org/personas/CAT');
  });
});
