'use client';

import { css } from '_panda/css';
import type { GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';
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

const emblaViewportStyle = css({
  overflow: 'hidden',
});

const emblaContainerStyle = css({
  display: 'flex',
});

const emblaSlideStyle = css({
  flex: '0 0 auto',
  height: 'fit-content',
  _first: { ml: 0 },
  marginLeft: 1,
});
