import type { ReactNode } from 'react';

export type BannerStatus = 'selected' | 'gradient' | 'default';
export type BannerSize = 'small' | 'medium' | 'full';

export interface BannerProps {
  image: string | ReactNode;
  label?: string;
  loading?: boolean;
  className?: string;
  status?: BannerStatus;
  size?: BannerSize;
}

export interface LevelBannerProps {
  image: string | ReactNode;
  level: number;
  className?: string;
  status?: BannerStatus;
  size?: BannerSize;
}

export interface BannerPetSelectMediumProps {
  name: string;
  count: string | number;
  image: string;
  status?: BannerStatus;
}

