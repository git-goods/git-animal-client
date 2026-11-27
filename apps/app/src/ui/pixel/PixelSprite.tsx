import { useEffect, useRef, useState } from 'react';
import {
  Canvas,
  FilterMode,
  Image as SkiaImage,
  loadData,
  MipmapMode,
  Skia,
  type SkImage,
} from '@shopify/react-native-skia';
import { integerScale } from './scale';

type Props = {
  source: string | number;
  maxWidth: number;
  maxHeight: number;
  onError?: () => void;
};

// useImage 는 네트워크 실패(reject)를 삼키므로 직접 로드해 onError 로 모은다
function useSkiaImage(source: string | number, onError?: () => void) {
  const [loaded, setLoaded] = useState<{ source: string | number; image: SkImage } | null>(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  });

  useEffect(() => {
    let active = true;
    const fail = () => {
      if (active) onErrorRef.current?.();
    };
    loadData(source, (data) => Skia.Image.MakeImageFromEncoded(data), fail)
      .then((image) => {
        if (active && image) setLoaded({ source, image });
      })
      .catch(fail);
    return () => {
      active = false;
    };
  }, [source]);

  return loaded?.source === source ? loaded.image : null;
}

export function PixelSprite({ source, maxWidth, maxHeight, onError }: Props) {
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
      />
    </Canvas>
  );
}
