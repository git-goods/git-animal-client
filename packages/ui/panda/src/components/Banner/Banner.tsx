import { ReactNode } from 'react';
import { bannerStyle, BannerStyleProps } from './cva';
import { css } from '_panda/css';

type BannerProps = BannerStyleProps & {
  label?: string;
  image: string | ReactNode;
};

export function Banner({ image, label, ...styleProps }: BannerProps) {
  return (
    <div className={bannerStyle(styleProps)}>
      {typeof image === 'string' ? <img src={image} width={160} height={160} alt={image} /> : image}
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
