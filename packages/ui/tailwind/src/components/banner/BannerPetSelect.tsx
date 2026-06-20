import { bannerVariants } from './cva';

interface BannerPetSelectMediumProps {
  name: string;
  count: string;
  image: string;
  status?: 'selected' | 'gradient' | 'default';
}

export function BannerPetSelectMedium({ name, count, image, status = 'default' }: BannerPetSelectMediumProps) {
  return (
    <div className={bannerVariants({ size: 'medium', status })}>
      <img src={image} alt={name} width={80} height={80} draggable={false} />
      <p className="glyph16-regular text-white">{name}</p>
      <p className="glyph14-regular text-white-50">{count}</p>
    </div>
  );
}
