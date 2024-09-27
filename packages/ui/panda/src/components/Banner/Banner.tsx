import { ReactNode } from 'react';
import { bannerStyle, BannerStyleProps } from './cva';
import { css, cx } from '_panda/css';
import { skeletonStyle } from '../Skeleton';

type BannerProps = BannerStyleProps & {
  label?: string;
  image: string | ReactNode;
};

export function Banner({ image, label, ...styleProps }: BannerProps) {
  return (
    <div className={bannerStyle(styleProps)}>
      {typeof image === 'string' ? <img draggable="false" src={image} width={160} height={160} alt={image} /> : image}
      {label && <p className={labelStyle}>{label}</p>}
    </div>
  );
}

const labelStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white',
  maxWidth: '80px',
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export function BannerSkeleton(props: BannerStyleProps) {
  return <div className={cx(bannerStyle(props), skeletonStyle({ color: 'white' }))} />;
}
