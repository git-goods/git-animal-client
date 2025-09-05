/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react';
import { css, cx } from '_panda/css';
import { Box } from '_panda/jsx';
import type { Product } from '@gitanimals/api';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props {
  rightElement: ReactNode;
  personaType: Product['persona']['personaType'];
  personaLevel?: Product['persona']['personaLevel'];
  price?: Product['price'];
}

export function ShopTableDesktopRow({ rightElement, ...item }: Props) {
  const tier = useGetPersonaTier(item.personaType);

  return (
    <div className={rowStyle}>
      <div>
        <img src={getPersonaImage(item.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <span>{snakeToTitleCase(item.personaType)}</span>
      <span>{ANIMAL_TIER_TEXT_MAP[tier]}</span>
      <span>{item.personaLevel}</span>
      <span>{item.price && addNumberComma(item.price)}</span>
      <div>{rightElement}</div>
    </div>
  );
}

export function ShopTableRowViewSkeleton() {
  return <div className={cx(rowStyle, skeletonStyle)} />;
}

const skeletonStyle = css({
  background:
    'linear-gradient(90deg, token(colors.gray.800) 25%, token(colors.gray.600) 50%, token(colors.gray.200) 75%, token(colors.gray.800) 100%)',
  backgroundSize: '200% 100%',
  animation: `skeletonLoading 1.5s infinite linear`,
});

export const rowStyle = css({
  width: '100%',
  height: '80px',
  backgroundColor: 'white_10',
  borderRadius: '12px',

  display: 'grid',
  gridTemplateColumns: '1fr 2.5fr 1fr 1fr 4.2fr 1.5fr',
  alignItems: 'center',
  padding: '0 32px',
  gap: '16px',

  textStyle: 'glyph20.regular',
  color: 'white.white_100',

  '& button': {
    color: 'black.black',
    width: '100%',
    paddingX: '6px',
  },

  '& *': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

export function ShopTableMobileRow({ personaType, personaLevel, price, rightElement }: Props) {
  const tier = useGetPersonaTier(personaType);

  return (
    <div className={contentStyle}>
      <div>
        <img src={getPersonaImage(personaType)} width={60} height={67} alt="animal1" />
      </div>
      <Box flex="1">
        <span className={personaTypeStyle}>{snakeToTitleCase(personaType)}</span>
        <div className={personaContentStyle}>
          <span>{ANIMAL_TIER_TEXT_MAP[tier]}</span>
          {personaLevel && (
            <>
              <span>/</span>
              <span>Lv.{personaLevel}</span>
            </>
          )}
          {price && (
            <>
              <span>/</span>
              <span>{addNumberComma(price)}P</span>
            </>
          )}
        </div>
      </Box>
      <div>{rightElement}</div>
    </div>
  );
}

const personaTypeStyle = css({
  textStyle: 'glyph15.regular',
  color: 'white.white',
});

const personaContentStyle = css({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  color: 'white.white_50',
  textStyle: 'glyph14regular',
});

const contentStyle = css({
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  color: 'white.white_50',
  textStyle: 'glyph14regular',
  bg: 'white.white_10',
  borderRadius: '6px',
  padding: '4px 16px 4px 8px',
});
