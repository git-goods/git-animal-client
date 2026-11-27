import {
  BlendColor,
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
  tintColor?: string;
  onError?: () => void;
};

export function PixelSprite({ source, maxWidth, maxHeight, tintColor, onError }: Props) {
  const image = useSkiaImage(source, onError);
  if (!image) return null;

  const scale = integerScale(
    { w: image.width(), h: image.height() },
    { w: maxWidth, h: maxHeight },
  );
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
      >
        {tintColor && <BlendColor color={tintColor} mode="srcIn" />}
      </SkiaImage>
    </Canvas>
  );
}
