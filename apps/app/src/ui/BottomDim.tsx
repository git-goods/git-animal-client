import { useWindowDimensions } from 'react-native';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { colors } from '@gitanimals/ui-tailwind/theme';

const BG = colors.gray['050'];
const HEIGHT = 160;

// 피그마 bottom/dim: 아래 버튼 뒤 160px, 위 절반은 투명에서 배경색으로, 아래 절반은 배경색
export function BottomDim() {
  const { width } = useWindowDimensions();
  return (
    <Canvas pointerEvents="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: HEIGHT }}>
      <Rect x={0} y={0} width={width} height={HEIGHT}>
        <LinearGradient start={vec(0, 0)} end={vec(0, HEIGHT)} colors={['rgba(24, 26, 29, 0)', BG, BG]} positions={[0, 0.5, 1]} />
      </Rect>
    </Canvas>
  );
}
