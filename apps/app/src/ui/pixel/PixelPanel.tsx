import { useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View, type LayoutChangeEvent, type ViewStyle } from 'react-native';
import { Canvas, createPicture, FilterMode, MipmapMode, Picture, Skia } from '@shopify/react-native-skia';
import { nineSlice } from './nineSlice';
import { useSkiaImage } from './useSkiaImage';

type Props = {
  source: number;
  slice?: number;
  scale?: number;
  style?: ViewStyle;
  className?: string;
  children?: ReactNode;
};

export function PixelPanel({ source, slice = 8, scale = 3, style, className, children }: Props) {
  const image = useSkiaImage(source);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  const picture = useMemo(() => {
    if (!image || !size) return null;
    const pieces = nineSlice(size, slice, scale, { w: image.width(), h: image.height() });
    return createPicture((canvas) => {
      pieces.forEach(({ src, dst }) => {
        canvas.drawImageRectOptions(
          image,
          Skia.XYWHRect(src.x, src.y, src.w, src.h),
          Skia.XYWHRect(dst.x, dst.y, dst.w, dst.h),
          FilterMode.Nearest,
          MipmapMode.None,
        );
      });
    });
  }, [image, size, slice, scale]);

  const onLayout = ({ nativeEvent: { layout } }: LayoutChangeEvent) => {
    const next = { w: Math.floor(layout.width), h: Math.floor(layout.height) };
    setSize((prev) => (prev?.w === next.w && prev.h === next.h ? prev : next));
  };

  return (
    <View onLayout={onLayout} style={style} className={className}>
      {picture && size && (
        <Canvas style={[StyleSheet.absoluteFill, { width: size.w, height: size.h }]} pointerEvents="none">
          <Picture picture={picture} />
        </Canvas>
      )}
      {children}
    </View>
  );
}
