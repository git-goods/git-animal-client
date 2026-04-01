import { cn } from '@gitanimals/ui-tailwind/utils';

import { getPersonaImage } from '@/utils/image';

export function PersonaBanner({ level, personaType }: { level: number | string; personaType: string }) {
  return (
    <div className="relative p-2">
      <div className="rounded-2xl border-2 border-white/25 bg-white/25">
        <img src={getPersonaImage(personaType)} alt={personaType} className="object-contain w-[120px] h-[120px]" />
      </div>
      <div className="text-center mt-3 font-product-bold text-glyph-18 text-white">Level {level}</div>
    </div>
  );
}

export function PersonaBannerUnknown() {
  return (
    <div className="relative p-2">
      <img src="/mypage/merge/merge-empty.svg" alt="empty" className="object-contain w-[120px] h-[120px]" />
      <div className="text-center mt-3 font-product-bold text-glyph-18 text-white/75">Level ?</div>
    </div>
  );
}

export function PersonaGradientBanner({ level }: { level: number | string }) {
  return (
    <div className="relative p-2">
      <div className="rounded-2xl border-2 border-white/25 bg-white/25">
        <img
          src="/assets/mypage/evolution/evolution-empty.svg"
          alt="empty"
          className="object-contain w-[120px] h-[120px]"
        />
      </div>
      <div className={cn('text-center mt-3 font-product-bold text-glyph-18', 'evolution-rainbow-gradient-text')}>
        Level {level}
      </div>
    </div>
  );
}
