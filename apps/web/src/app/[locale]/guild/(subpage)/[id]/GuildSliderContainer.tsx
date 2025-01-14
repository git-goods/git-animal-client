'use client';

import { type PropsWithChildren } from 'react';
import Image from 'next/image';
import { css, cx } from '_panda/css';
import { guildQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useQuery } from '@tanstack/react-query';

import { Link } from '@/i18n/routing';

export const GuildSliderContainer = wrap.ErrorBoundary({ fallback: <>{}</> }).on(
  ({
    children,
    guildId,
  }: PropsWithChildren<{
    guildId: string;
  }>) => {
    const { data } = useQuery(guildQueries.getAllJoinGuildsOptions());

    if (!data) return children;
    if (data.guilds.length <= 1) return children;

    const currentIndex = data.guilds.findIndex((guild) => guild.id === guildId);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === data.guilds.length - 1;

    const prevGuildId = data.guilds[currentIndex - 1]?.id;
    const nextGuildId = data.guilds[currentIndex + 1]?.id;

    return (
      <div className={containerStyle}>
        {children}
        <Link href={prevGuildId ? `/guild/${prevGuildId}` : '#'}>
          <CarouselButton direction="left" disabled={isFirst} />
        </Link>
        <Link href={nextGuildId ? `/guild/${nextGuildId}` : '#'}>
          <CarouselButton direction="right" disabled={isLast} />
        </Link>
      </div>
    );
  },
);

const containerStyle = css({
  width: '100%',
  height: 'fit-content',
  position: 'relative',
});

function CarouselButton({ direction, disabled }: { direction: 'left' | 'right'; disabled?: boolean }) {
  const imgSrc = disabled ? '/common/carousel-inner-right-disabled.png' : '/common/carousel-inner-right.png';
  return (
    <button
      disabled={disabled}
      className={cx(buttonStyle, direction === 'left' && leftButtonStyle, direction === 'right' && rightButtonStyle)}
    >
      <Image width={40} height={40} src={imgSrc} alt={direction} />
    </button>
  );
}

const buttonStyle = css({
  position: 'absolute',
  top: 0,
  bottom: 0,
  margin: 'auto',
  _disabled: {
    cursor: 'not-allowed',
  },
});

const leftButtonStyle = css({
  left: '-66px',
  rotate: '180deg',
});

const rightButtonStyle = css({
  right: '-66px',
});
