'use client';

import { cn } from '@gitanimals/ui-tailwind';
import Flicking from '@egjs/react-flicking';
import type { GuildLeader, GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-tailwind';
import { UsersRoundIcon } from 'lucide-react';

import { USER_GITHUB_URL } from '@/constants/route';
import { getPersonaImage } from '@/utils/image';

export function GuildPeopleList({ members, leader }: { members: GuildMember[]; leader: GuildLeader }) {
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
          <Flicking moveType="freeScroll" align="prev" bound={true}>
            {members.map((member) => (
              <div className={cn('flicking-panel h-fit first:ml-0 ml-1')} key={member.id}>
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
          </Flicking>
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

const titleStyle = cn(
  'flex items-center gap-4 font-product text-glyph-36 font-bold text-white',
  '[&_img]:rounded-lg',
);
