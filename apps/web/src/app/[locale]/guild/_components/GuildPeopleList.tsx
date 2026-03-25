'use client';

import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import { grid } from '_panda/patterns';
import useEmblaCarousel from 'embla-carousel-react';
import type { GuildLeader, GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';
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
          <Flex mb="1" justifyContent="space-between">
            <p>Members</p>
            <Flex gap="6px" alignItems="center">
              <UsersRoundIcon size={16} color="#FFFFFF80" />
              <span>{members.length + 1}/ 15</span>
            </Flex>
          </Flex>
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

const listStyle = grid({
  gridTemplateColumns: '120px 1fr',
  gap: 4,
  overflowX: 'hidden',
  minH: '180px',
  color: 'white.white_100',
  _mobile: {
    maxW: 'calc(100vw - 40px)',
  },
});

const leaderStyle = css({
  '& > p': {
    mb: 1,
  },
});

const membersStyle = css({
  overflow: 'hidden',
  flex: 1,
});

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
