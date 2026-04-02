import type { ComponentProps } from 'react';
import { memo } from 'react';
import type { Persona } from '@gitanimals/api';
import { Banner, cn, LevelBanner } from '@gitanimals/ui-tailwind';

import { getPersonaImage } from '@/shared/utils/image';

// --- LevelPersonaItem (LevelBanner — ui-tailwind) ---

interface LevelPersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  size?: ComponentProps<typeof LevelBanner>['size'];
  className?: string;
}

function LevelPersonaItem({ persona, isSelected, onClick, size = 'full', className }: LevelPersonaItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('h-full w-full bg-transparent outline-none')}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
    >
      <LevelBanner
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        level={Number(persona.level)}
        className={cn('h-full w-full', className)}
        size={size}
      />
    </button>
  );
}

export const MemoizedLevelPersonaItem = memo(LevelPersonaItem, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.persona.id === next.persona.id &&
    prev.persona.level === next.persona.level
  );
});

// --- BannerPersonaItem (Banner — ui-tailwind) ---

interface BannerPersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  size?: ComponentProps<typeof Banner>['size'];
  className?: string;
  loading?: boolean;
  /** 진화 가능 펫에 gradient 이펙트 적용 */
  isSpecialEffect?: boolean;
}

function BannerPersonaItem({
  persona,
  isSelected,
  onClick,
  size = 'full',
  className,
  loading,
  isSpecialEffect,
}: BannerPersonaItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={cn(
        'rounded-xl bg-transparent outline-none aspect-square',
        isSpecialEffect && persona.isEvolutionable && 'gradient-move',
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
    >
      <Banner
        loading={loading}
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        className={cn('h-full w-full', className)}
        size={size}
      />
    </button>
  );
}

export const MemoizedBannerPersonaItem = memo(BannerPersonaItem, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.persona.id === next.persona.id &&
    prev.persona.level === next.persona.level &&
    prev.loading === next.loading &&
    prev.isSpecialEffect === next.isSpecialEffect
  );
});

// multi-merge 호환 alias
export { MemoizedLevelPersonaItem as MemoizedPersonaItem };
export { MemoizedBannerPersonaItem as MemoizedPersonaBannerItem };
