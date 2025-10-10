import { ReactNode } from 'react';
import { bannerStyle, BannerStyleProps } from './cva';
import { css, cx } from '_panda/css';

type Props = BannerStyleProps & {
  image: string | ReactNode;
  level: number;
  className?: string;
};

export function LevelBanner({ image, level, className, ...styleProps }: Props) {
  return (
    <div className={cx(bannerStyle(styleProps), className)}>
      {typeof image === 'string' ? <img src={image} width={160} height={160} alt={image} draggable={false} /> : image}
      <p className={levelTagStyle}>Lv.{level}</p>
    </div>
  );
}

const levelTagStyle = css({
  borderRadius: '12px',
  background: 'black.black_25',
  padding: '0 8px',
  color: 'white.white_75',
  textStyle: 'glyph12.regular',
  fontSize: '10px',
  lineHeight: '20px',
  position: 'absolute',
  bottom: '3px',
  right: '3px',
});
