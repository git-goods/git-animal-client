import {
  Canvas,
  FilterMode,
  Image as SkiaImage,
  MipmapMode,
} from '@shopify/react-native-skia';
import { integerScale } from './scale';
import { useSkiaImage } from './useSkiaImage';

type Props = {
  source: string | number;
  maxWidth: number;
  maxHeight: number;
  onError?: () => void;
  // 피그마처럼 상자에 딱 맞춘다. 정수배가 아니라 픽셀 크기가 조금 고르지 않을 수 있다
  fit?: boolean;
};

export function PixelSprite({ source, maxWidth, maxHeight, onError, fit = false }: Props) {
  const image = useSkiaImage(source, onError);
  if (!image) return null;

  const src = { w: image.width(), h: image.height() };
  const box = { w: maxWidth, h: maxHeight };
  const scale = fit ? Math.min(box.w / src.w, box.h / src.h) : integerScale(src, box);
  const width = image.width() * scale;
  const height = image.height() * scale;

  return (
    <Canvas style={{ width, height }}>
      <SkiaImage
        image={image}
        x={0}
        y={0}
        width={width}
        height={height}
        sampling={{ filter: FilterMode.Nearest, mipmap: MipmapMode.None }}
      />
    </Canvas>
  );
}
