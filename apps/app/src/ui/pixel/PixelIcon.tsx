import { View } from 'react-native';

type Props = {
  // 한 글자가 한 칸. '.' 은 빈칸, 나머지 글자는 palette 의 색으로 칠한다
  rows: readonly string[];
  palette: Record<string, string>;
  unit?: number;
};

export function PixelIcon({ rows, palette, unit = 3 }: Props) {
  const width = Math.max(...rows.map((r) => r.length)) * unit;
  return (
    <View style={{ width, height: rows.length * unit }}>
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === '.' ? null : (
            <View
              key={`${x}-${y}`}
              style={{ position: 'absolute', left: x * unit, top: y * unit, width: unit, height: unit, backgroundColor: palette[ch] }}
            />
          ),
        ),
      )}
    </View>
  );
}

// O 테두리, G 금색, H 반짝임, D 그늘 (Sprout Lands 의 금 상자 색)
export const COIN_ROWS = [
  '..OOOO..',
  '.OGGGGO.',
  'OGHGGGDO',
  'OGHGGGDO',
  'OGGGGGDO',
  'OGGGGDDO',
  '.ODDDDO.',
  '..OOOO..',
] as const;

// O 테두리, C 크림
export const PAW_ROWS = [
  '...OO..OO...',
  '..OCCOOCCO..',
  '..OCCOOCCO..',
  '.OOOO..OOOO.',
  'OCCO....OCCO',
  'OCCO....OCCO',
  '.OO......OO.',
  '....OOOO....',
  '...OCCCCO...',
  '..OCCCCCCO..',
  '..OCCCCCCO..',
  '...OOOOOO...',
] as const;
