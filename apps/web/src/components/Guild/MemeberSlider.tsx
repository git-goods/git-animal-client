'use client';

import { cn } from '@gitanimals/ui-tailwind';
import Flicking from '@egjs/react-flicking';
import type { GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';

import { getPersonaImage } from '@/utils/image';

export function GuildMemeberSlider({ members }: { members: GuildMember[] }) {
  return (
    <Flicking moveType="freeScroll" align="prev" bound={true}>
      {members.map((member) => (
        <div className={cn('flicking-panel', 'h-fit first:ml-0 ml-1')} key={member.id}>
          <BannerPetSelectMedium
            key={member.id}
            name={member.name}
            count={member.contributions}
            image={getPersonaImage(member.personaType)}
          />
        </div>
      ))}
    </Flicking>
  );
}
