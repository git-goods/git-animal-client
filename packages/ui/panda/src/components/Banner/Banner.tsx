import { cva } from '_panda/css';
import { ReactNode } from 'react';
import { bannerStyle } from './cva';

interface BannerProps {
  selected?: boolean;
  label?: string;
  image: string | ReactNode;
}

export function Banner({ selected, image, label }: BannerProps) {
  return (
    <div className={bannerStyle({ selected })}>
      {typeof image === 'string' ? <img src={image} width={160} height={160} alt={image} /> : image}
      {label && <p>{label}</p>}
    </div>
  );
}
