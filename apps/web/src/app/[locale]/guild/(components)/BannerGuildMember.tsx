/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';

export function BannerGuildMember({
  image,
  name,
  count,
  bottomElement,
}: {
  image: string;
  name: string;
  count: string;
  bottomElement: ReactNode;
}) {
  return (
    <div className={bannerStyle}>
      <img src={image} alt={name} width={80} height={80} />
      <p className={nameStyle}>{name}</p>
      <p className={countStyle}>{count}</p>
      <Flex gap="2">{bottomElement}</Flex>
    </div>
  );
}

const bannerStyle = css({
  display: 'inline-flex',
  padding: '8px 16px 16px 16px',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
});

const nameStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white',
});

const countStyle = css({
  textStyle: 'glyph14.regular',
  color: 'white.white_50',
});
