'use client';

import type { GuildLeader, GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-tailwind';
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
            <div className="flex gap-[6px] items-center">
              <UsersRoundIcon size={16} color="#FFFFFF80" />
              <span>{members.length + 1}/ 15</span>
            </div>
          </div>
          <div ref={emblaRef} className={emblaViewportStyle}>
            <div className={emblaContainerStyle}>
              {members.map((member) => (
                <div className={emblaSlideStyle} key={member.id}>
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

const listStyle =
  'grid grid-cols-[120px_1fr] gap-4 overflow-x-hidden min-h-[180px] text-white-100 mobile:max-w-[calc(100vw_-_40px)]';

const leaderStyle = '[&>p]:mb-1';

const membersStyle = 'overflow-hidden flex-1';

const emblaViewportStyle = 'overflow-hidden';

const emblaContainerStyle = 'flex';

const emblaSlideStyle = 'flex-[0_0_auto] h-fit first:ml-0 ml-1';
