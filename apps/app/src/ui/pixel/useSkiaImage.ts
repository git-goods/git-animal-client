import { useEffect, useRef, useState } from 'react';
import { loadData, Skia, type SkImage } from '@shopify/react-native-skia';

// useImage 는 네트워크 실패(reject)를 삼키므로 직접 로드해 onError 로 모은다
export function useSkiaImage(source: string | number, onError?: () => void) {
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
