import { ReactNode } from 'react';
import { bannerStyle, BannerStyleProps } from './cva';
import { css, cx } from '_panda/css';
import { skeletonStyle } from '../Skeleton';
import { Loader } from 'lucide-react';

type BannerProps = BannerStyleProps & {
  label?: string;
  image: string | ReactNode;
  loading?: boolean;
};

export function Banner({ image, label, loading, ...styleProps }: BannerProps) {
  return (
    <div className={bannerStyle(styleProps)}>
      {typeof image === 'string' ? <img draggable="false" src={image} width={160} height={160} alt={image} /> : image}
      {label && <p className={labelStyle}>{label}</p>}
      {loading && (
        <div className={loadingStyle}>
          <Loader width={32} height={32} color="white" />
        </div>
      )}
    </div>
  );
}

const loadingStyle = css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white.white_25',
  borderColor: 'white.white_50',
});

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
