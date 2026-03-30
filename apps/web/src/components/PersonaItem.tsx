import type { ComponentProps } from 'react';
import { memo } from 'react';
import { css, cx } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { Banner, LevelBanner } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

// --- LevelPersonaItem (LevelBanner 기반) ---

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
      onClick={onClick}
      className={css({ outline: 'none', bg: 'transparent', width: '100%', height: '100%' })}
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
        className={cx(css({ width: '100%', height: '100%' }), className)}
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

// --- BannerPersonaItem (Banner 기반) ---

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
      onClick={onClick}
      disabled={loading}
      className={cx(
        css({ outline: 'none', bg: 'transparent', borderRadius: '12px' }),
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
        className={cx(css({ width: '100%', height: '100%' }), className)}
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
