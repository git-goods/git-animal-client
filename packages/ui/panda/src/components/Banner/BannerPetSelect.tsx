import { css } from '_panda/css';
import { bannerStyle } from './cva';

interface BannerPetSelectMediumProps {
  name: string;
  count: string;
  image: string;
  status?: 'selected' | 'gradient' | 'default';
}

export function BannerPetSelectMedium({ name, count, image, status = 'default' }: BannerPetSelectMediumProps) {
  return (
    <div className={bannerStyle({ size: 'medium', status })}>
      <img src={image} alt={name} width={80} height={80} draggable={false} />
      <p className={nameStyle}>{name}</p>
      <p className={countStyle}>{count}</p>
    </div>
  );
}

const nameStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white',
});

const countStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
});
