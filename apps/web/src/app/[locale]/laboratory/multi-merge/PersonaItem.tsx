import type { ComponentProps } from 'react';
import { memo } from 'react';
import type { Persona } from '@gitanimals/api';
import { cn, Banner, LevelBanner } from '@gitanimals/ui-tailwind';

import { getPersonaImage } from '@/utils/image';

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
  size?: ComponentProps<typeof LevelBanner>['size'];
  className?: string;
}

function PersonaItem({ persona, isSelected, onClick, size = 'full', className }: PersonaItemProps) {
  return (
    <button
      onClick={onClick}
      className="outline-none bg-transparent w-full h-full"
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
        className={cn('w-full h-full', className)}
        size={size}
      />
    </button>
  );
}

function PersonaBannerItem({ persona, isSelected, onClick, size = 'full', className }: PersonaItemProps) {
  return (
    <button
      onClick={onClick}
      className="outline-none bg-transparent w-full h-full"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
    >
      <Banner
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        className={cn('w-full h-full', className)}
        size={size}
      />
    </button>
  );
}

export const MemoizedPersonaItem = memo(PersonaItem, (prev, next) => {
  return (
    prev.isSelected === next.isSelected &&
    prev.persona.id === next.persona.id &&
    prev.persona.level === next.persona.level &&
    prev.onClick === next.onClick
  );
});

export const MemoizedPersonaBannerItem = memo(PersonaBannerItem, (prev, next) => {
  return prev.isSelected === next.isSelected && prev.persona.level === next.persona.level;
});
