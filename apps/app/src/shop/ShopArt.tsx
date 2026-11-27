import { memo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Path, Rect, Skia, vec } from '@shopify/react-native-skia';
import { CAT_RECTS, CITY_PATH } from './art';

// 피그마 943:38402 screen 의 배경 그라데이션
const SKY = {
  colors: ['#000000', '#005488', '#005e98', '#006fb3', '#0184d6', '#0187db'],
  positions: [0, 0.33128, 0.48768, 0.67734, 0.84483, 1],
};
const CITY_COLOR = '#0065ad';
const CITY_HEIGHT = 190;
const city = Skia.Path.MakeFromSVGString(CITY_PATH)!;

// 하늘 그라데이션 + 화면 맨 아래 190px 도시. 탭 바가 위에 떠서 아래쪽을 덮는다
export const ShopBackground = memo(function ShopBackground() {
  const { width: w, height: h } = useWindowDimensions();
  return (
    <Canvas style={StyleSheet.absoluteFill} pointerEvents="none">
      <Rect x={0} y={0} width={w} height={h}>
        <LinearGradient start={vec(0, 0)} end={vec(0, h)} colors={SKY.colors} positions={SKY.positions} />
      </Rect>
      <Path path={city} color={CITY_COLOR} transform={[{ translateY: h - CITY_HEIGHT }]} />
      <Rect x={0} y={h - 102} width={w} height={102} color={CITY_COLOR} />
    </Canvas>
  );
});

export const AuctionCat = memo(function AuctionCat() {
  return (
    <Canvas style={{ width: 80, height: 80 }}>
      {CAT_RECTS.map(([color, x, y, width, height], i) => (
        <Rect key={i} x={x} y={y} width={width} height={height} color={color} />
      ))}
    </Canvas>
  );
});
