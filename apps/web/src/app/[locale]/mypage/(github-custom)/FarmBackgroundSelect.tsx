/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { css, cx } from '_panda/css';
import type { Background } from '@gitanimals/api';
import { renderUserQueries } from '@gitanimals/react-query';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getBackgroundImage } from '@/utils/image';

export const FarmBackgroundSelect = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({
    fallback: <></>,
  })
  .on(function FarmBackgroundSelect() {
    const { name } = useClientUser();
    const {
      data: { backgrounds },
    } = useSuspenseQuery(renderUserQueries.getMyBackground(name));

    const [selectedBackground, setSelectedBackground] = useState<Background | null>(null);

    // TODO: 마우스로도 스크롤 움직일 수 있도록 개선 필요
    return (
      <div className={backgroundContainerStyle}>
        <div className={backgroundListStyle}>
          {backgrounds.map((background) => (
            <BackgroundItem
              key={background.type}
              {...background}
              isSelected={selectedBackground?.type === background.type}
              onClick={() => setSelectedBackground(background)}
            />
          ))}
        </div>
      </div>
    );
  });

interface BackgroundItemProps extends Background {
  isSelected: boolean;
  onClick: () => void;
}

function BackgroundItem({ type, isSelected, onClick }: BackgroundItemProps) {
  return (
    <button className={cx(backgroundItemStyle, isSelected && backgroundItemSelectedStyle)} onClick={onClick}>
      <img src={getBackgroundImage(type)} alt={type} width={248} height={124} draggable={false} />
    </button>
  );
}

const backgroundListStyle = cx(
  css({
    width: 'fit-content',
    display: 'flex',
    flexWrap: 'nowrap',
    gap: 4,
  }),
);

const backgroundContainerStyle = cx(
  css({
    overflowX: 'auto',
  }),
  customScrollStyle,
);

const backgroundItemStyle = css({
  border: '1px solid transparent',
  width: 248,
  borderRadius: 8,
  overflow: 'hidden',
});

const backgroundItemSelectedStyle = css({
  borderColor: 'white.white_90',
});
