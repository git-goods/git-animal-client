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
  scale?: (src: { w: number; h: number }, box: { w: number; h: number }) => number;
};

export function PixelSprite({ source, maxWidth, maxHeight, onError, scale: toScale = integerScale }: Props) {
  const image = useSkiaImage(source, onError);
  if (!image) return null;

  const src = { w: image.width(), h: image.height() };
  const scale = toScale(src, { w: maxWidth, h: maxHeight });
  const width = src.w * scale;
  const height = src.h * scale;

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
