import { useEffect, useRef, useState } from 'react';
import { loadData, Skia, type SkImage } from '@shopify/react-native-skia';

// 같은 이미지(펫 종류별 PNG)는 한 번만 받아 디코드한다. 실패한 건 지워서 다음에 다시 시도한다
// ponytail: 비우지 않는 캐시. 펫 종류 수만큼만 쌓인다
const cache = new Map<string | number, Promise<SkImage | null>>();

function load(source: string | number) {
  let p = cache.get(source);
  if (!p) {
    // useImage 는 네트워크 실패(reject)를 삼키므로 직접 로드해 실패를 알린다
    p = loadData(source, (data) => Skia.Image.MakeImageFromEncoded(data)).then((image) => {
      if (!image) cache.delete(source);
      return image;
    });
    p.catch(() => cache.delete(source));
    cache.set(source, p);
  }
  return p;
}

export function useSkiaImage(source: string | number, onError?: () => void) {
  const [loaded, setLoaded] = useState<{ source: string | number; image: SkImage } | null>(null);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onErrorRef.current = onError;
  });

  useEffect(() => {
    let active = true;
    load(source)
      .then((image) => {
        if (!active) return;
        if (image) setLoaded({ source, image });
        else onErrorRef.current?.();
      })
      .catch(() => {
        if (active) onErrorRef.current?.();
      });
    return () => {
      active = false;
    };
  }, [source]);

  return loaded?.source === source ? loaded.image : null;
}
