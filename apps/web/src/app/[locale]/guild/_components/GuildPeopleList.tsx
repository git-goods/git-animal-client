'use client';

import { cn, BannerPetSelectMedium } from '@gitanimals/ui-tailwind';
import type { GuildLeader, GuildMember } from '@gitanimals/api';
import useEmblaCarousel from 'embla-carousel-react';
import { UsersRoundIcon } from 'lucide-react';

import { USER_GITHUB_URL } from '@/constants/route';
import { getPersonaImage } from '@/utils/image';

export function GuildPeopleList({ members, leader }: { members: GuildMember[]; leader: GuildLeader }) {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    align: 'start',
    containScroll: 'trimSnaps',
  });

  return (
    <div className={listStyle}>
      <div className={leaderStyle}>
        <p> Leader</p>
        <a href={USER_GITHUB_URL(leader.name)} target="_blank" draggable={false}>
          <BannerPetSelectMedium
            name={leader.name}
            count={leader.contributions}
            image={getPersonaImage(leader.personaType)}
            status="gradient"
          />
        </a>
      </div>
      {members.length > 0 && (
        <div className={membersStyle}>
          <div className="flex mb-1 justify-between">
            <p>Members</p>
            <div className="flex gap-1.5 items-center">
              <UsersRoundIcon size={16} color="#FFFFFF80" />
              <span>{members.length + 1}/ 15</span>
            </div>
          </div>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {members.map((member) => (
                <div className="flex-[0_0_auto] h-fit first:ml-0 ml-1" key={member.id}>
                  <a href={USER_GITHUB_URL(member.name)} target="_blank" draggable={false}>
                    <BannerPetSelectMedium
                      key={member.id}
                      name={member.name}
                      count={member.contributions}
                      image={getPersonaImage(member.personaType)}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const listStyle = cn(
  'grid grid-cols-[120px_1fr] gap-4 overflow-x-hidden min-h-[180px] text-white',
  'max-mobile:max-w-[calc(100vw-40px)]',
);

const leaderStyle = cn('[&>p]:mb-1');

const membersStyle = cn('overflow-hidden flex-1');
