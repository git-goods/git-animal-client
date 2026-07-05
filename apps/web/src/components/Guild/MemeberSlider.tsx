'use client';

import type { GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-tailwind';
import useEmblaCarousel from 'embla-carousel-react';

import { getPersonaImage } from '@/utils/image';

export function GuildMemeberSlider({ members }: { members: GuildMember[] }) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  return (
    <div ref={emblaRef} className={emblaViewportStyle}>
      <div className={emblaContainerStyle}>
        {members.map((member) => (
          <div className={emblaSlideStyle} key={member.id}>
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

const emblaViewportStyle = 'overflow-hidden';

const emblaContainerStyle = 'flex';

const emblaSlideStyle = 'flex-[0_0_auto] h-fit first:ml-0 ml-1';
