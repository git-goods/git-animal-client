/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Box } from '_panda/jsx';
import type { Product } from '@gitanimals/api';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetPersonaTier } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props {
  rightElement: React.ReactNode;
  personaType: Product['persona']['personaType'];
  personaLevel?: Product['persona']['personaLevel'];
  price?: Product['price'];
}

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
});
