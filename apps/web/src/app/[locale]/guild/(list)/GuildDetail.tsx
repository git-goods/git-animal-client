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

export const GuildDetail = wrap
  .Suspense({ fallback: null })
  .ErrorBoundary({ fallback: null })
  .on(({ guildId, onClose }: { guildId: string; onClose: () => void }) => {
    const { data } = useSuspenseQuery({
      ...guildQueries.getGuildByIdOptions(guildId),
      initialData: {
        id: '123456',
        title: '제목',
        body: '설명',
        guildIcon: '길드의 아이콘',
        leader: {
          userId: '1', // 리더의 아이디
          name: '리더의 이름',
          contributions: '12345', // 리더의 컨트리뷰션
          personaId: '12345',
          personaType: 'GOOSE',
        },
        farmType: '길드 팜의 종류',
        totalContributions: '99999999', // 길드 모든 멤버와 리더의 contributions 총합
        members: [
          {
            id: '2', // 멤버의 고유 아이디
            userId: '3', // 유저의 아이디
            name: '유저의 이름',
            contributions: '12345', // 각 멤버의 contributions
            personaId: '4', // 길드에 보여질 대표펫의 아이디
            personaType: 'GOOSE',
          },
          {
            id: '5',
            userId: '6',
            name: '대기 유저 2',
            contributions: '23456',
            personaId: '7',
            personaType: 'GOOSE',
          },
          {
            id: '8',
            userId: '9',
            name: '대기 유저 3',
            contributions: '34567',
            personaId: '10',
            personaType: 'GOOSE',
          },
          {
            id: '11',
            userId: '12',
            name: '대기 유저 4',
            contributions: '45678',
            personaId: '13',
            personaType: 'GOOSE',
          },
          {
            id: '14',
            userId: '15',
            name: '대기 유저 5',
            contributions: '56789',
            personaId: '16',
            personaType: 'GOOSE',
          },
          {
            id: '17',
            userId: '18',
            name: '대기 유저 6',
            contributions: '67890',
            personaId: '19',
            personaType: 'GOOSE',
          },
        ],
        waitMembers: [
          // 길드 가입을 대기하는 유저들
          {
            id: '2', // 멤버의 고유 아이디
            userId: '3', // 유저의 아이디
            name: '유저의 이름',
            contributions: '12345', // 각 멤버의 contributions
            personaId: '4', // 길드에 보여질 대표펫의 아이디
            personaType: 'GOOSE',
          },
        ],
        createdAt: '2022-04-29 10:15:30',
      },
    });

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
                image={data.leader.personaId}
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
          <Button mx="auto" w="100px">
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
});

const bodyStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_75',
});
