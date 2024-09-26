import { ReactNode } from 'react';
import { bannerStyle, BannerStyleProps } from './cva';
import { css } from '_panda/css';

type Props = BannerStyleProps & {
  image: string | ReactNode;
  level: number;
};

export function LevelBanner({ image, level, ...styleProps }: Props) {
  return (
    <div className={bannerStyle(styleProps)}>
      {typeof image === 'string' ? <img src={image} width={160} height={160} alt={image} /> : image}
      <p className={levelTagStyle}>{level}</p>
    </div>
  );
}

const levelTagStyle = css({
  borderRadius: 12,
  background: 'black.black_25',
  padding: '0 8px',
  color: 'white.white_75',
  textStyle: 'glyph12.regular',
  fontSize: 10,
  lineHeight: '20px',
});
