/* eslint-disable @next/next/no-img-element */
'use client';

import { css, cx } from '_panda/css';
import { Box, Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import Flicking from '@egjs/react-flicking';
import type { Guild } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';
import { UsersRoundIcon } from 'lucide-react';

import { GitanimalsGuild } from '@/components/Gitanimals';
import { getPersonaImage } from '@/utils/image';

export const GuildDetail = ({ details }: { guildId: string; details: Guild }) => {
  return (
    <>
      <div>
        <div className={titleStyle}>
          <img src={details.guildIcon} width={40} height={40} alt={details.title} />
          <h2>{details.title}</h2>
        </div>
        <div className={bodyStyle}>{details.body}</div>
      </div>
      <div className={listStyle}>
        <div className={leaderStyle}>
          <p> Leader</p>
          <BannerPetSelectMedium
            name={details.leader.name}
            count={details.leader.contributions}
            image={getPersonaImage(details.leader.personaType)}
            status="gradient"
          />
        </div>
        <div className={membersStyle}>
          <Flex mb="1" justifyContent="space-between">
            <p>Members</p>
            <Flex gap="6px" alignItems="center">
              <UsersRoundIcon size={16} color="#FFFFFF80" />
              <span>{details.members.length}/ 15</span>
            </Flex>
          </Flex>
          <Flicking moveType="freeScroll" align="prev" bound={true}>
            {details.members.map((member) => (
              <div
                className={cx('flicking-panel', css({ height: 'fit-content', _first: { ml: 0 }, marginLeft: 1 }))}
                key={member.id}
              >
                <BannerPetSelectMedium
                  key={member.id}
                  name={member.name}
                  count={member.contributions}
                  image={getPersonaImage(member.personaType)}
                />
              </div>
            ))}
          </Flicking>
        </div>
      </div>
      <Box aspectRatio="1/0.5" width="100%" bg="white.white_50">
        <GitanimalsGuild guildId={details.id} />
      </Box>
    </>
  );
};

const listStyle = flex({
  gap: 4,
  overflowX: 'hidden',
  minH: '180px',
  color: 'white.white_100',
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

const bodyStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
  mt: 3,
});
