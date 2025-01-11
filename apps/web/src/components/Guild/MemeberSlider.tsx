'use client';

import { css, cx } from '_panda/css';
import Flicking from '@egjs/react-flicking';
import type { GuildMember } from '@gitanimals/api';
import { BannerPetSelectMedium } from '@gitanimals/ui-panda';

export function GuildMemeberSlider({ members }: { members: GuildMember[] }) {
  return (
    <Flicking moveType="freeScroll" align="prev" bound={true}>
      {members.map((member) => (
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
  );
}
