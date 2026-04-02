'use client';

import type { GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';

import { getPersonaImage } from '@/shared/utils/image';

export function GuildMemeberSlider({ members }: { members: GuildMember[] }) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  return (
    <div ref={emblaRef} className="overflow-hidden">
      <div className="flex">
        {members.map((member) => (
          <div className="flex-[0_0_auto] h-fit first:ml-0 ml-1" key={member.id}>
            <BannerPetSelectMedium
              key={member.id}
              name={member.name}
              count={member.contributions}
              image={getPersonaImage(member.personaType)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
