/* eslint-disable @next/next/no-img-element */
'use client';

import { css, cx } from '_panda/css';
import { Box, Flex } from '_panda/jsx';
import { flex } from '_panda/patterns';
import Flicking from '@egjs/react-flicking';
import { guildQueries } from '@gitanimals/react-query';
import { BannerPetSelectMedium, Button, Dialog } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { UsersRoundIcon } from 'lucide-react';

import { customScrollHorizontalStyle } from '@/styles/scrollStyle';
import { getPersonaImage } from '@/utils/image';

export const GuildDetail = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({ fallback: null })
  .on(({ guildId, onClose, onJoin }: { guildId: string; onClose: () => void; onJoin: () => void }) => {
    const { data } = useSuspenseQuery(guildQueries.getGuildByIdOptions(guildId));

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <Dialog.Content size="large" className={dialogContentStyle}>
          <div>
            <div className={titleStyle}>
              <img src={data.guildIcon} width={40} height={40} alt={data.title} />
              <h2>{data.title}</h2>
            </div>
            <div className={bodyStyle}>{data.body}</div>
          </div>
          <div className={listStyle}>
            <div className={leaderStyle}>
              <p> Leader</p>
              <BannerPetSelectMedium
                name={data.leader.name}
                count={data.leader.contributions}
                image={getPersonaImage(data.leader.personaType)}
                status="gradient"
              />
            </div>
            <div className={membersStyle}>
              <Flex mb="1" justifyContent="space-between">
                <p>Members</p>
                <Flex gap="6px" alignItems="center">
                  <UsersRoundIcon size={16} color="#FFFFFF80" />
                  <span>{data.members.length}/ 15</span>
                </Flex>
              </Flex>
              <Flicking moveType="freeScroll" align="prev" bound={true}>
                {data.members.map((member) => (
                  <div
                    className={cx('flicking-panel', css({ height: 'fit-content', _first: { ml: 0 }, marginLeft: 1 }))}
                    key={member.id}
                  >
                    <BannerPetSelectMedium
                      key={member.id}
                      name={member.name}
                      count={member.contributions}
                      image={member.personaId}
                    />
                  </div>
                ))}
              </Flicking>
            </div>
          </div>
          <Box aspectRatio="1/0.5" width="100%" bg="white.white_50">
            farm type
          </Box>
          <Button
            mx="auto"
            w="100px"
            onClick={(e) => {
              e.preventDefault();
              onJoin();
            }}
          >
            Join
          </Button>
        </Dialog.Content>
      </Dialog>
    );
  });

const listStyle = flex({
  gap: 4,
  overflowX: 'hidden',
  minH: '180px',
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

const dialogContentStyle = cx(
  css({
    height: 'fit-content',
    gap: 8,
    overflowY: 'auto',
  }),
  customScrollHorizontalStyle,
);

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
