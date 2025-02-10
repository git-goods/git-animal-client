'use client';

import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import Flicking from '@egjs/react-flicking';
import type { GuildLeader, GuildMember } from '@gitanimals/api';
import useIsMobile from '@gitanimals/react/src/hooks/useIsMobile/useIsMobile';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';
import { UsersRoundIcon } from 'lucide-react';

import { USER_GITHUB_URL } from '@/constants/route';
import { getPersonaImage } from '@/utils/image';

export function GuildPeopleList({ members, leader }: { members: GuildMember[]; leader: GuildLeader }) {
  const isMobile = useIsMobile();

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
          <Flicking moveType="freeScroll" align="prev" bound={true}>
            {members.map((member) => (
              <div
                className={cx('flicking-panel', css({ height: 'fit-content', _first: { ml: 0 }, marginLeft: 1 }))}
                key={member.id}
              >
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

const listStyle = flex({
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

const titleStyle = flex({
  alignItems: 'center',
  gap: 4,
  textStyle: 'glyph36.bold',
  color: 'white.white_100',
  '& img': {
    borderRadius: '8px',
  },
});
