/* eslint-disable @next/next/no-img-element */
import { css } from '_panda/css';
import { Box, Flex } from '_panda/jsx';
import type { Product } from '@gitanimals/api';
import { snakeToTitleCase } from '@gitanimals/util-common';

import { useGetPersonaDropRate } from '@/hooks/persona/useGetPersonaDropRate';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';
import { addNumberComma } from '@/utils/number';

interface Props {
  rightElement: React.ReactNode;
  product: Product;
}

export function ShopTableMobileRow({ product, rightElement }: Props) {
  const dropRate = useGetPersonaDropRate(product.persona.personaType);

  return (
    <Flex
      gap="8px"
      className={css({
        bg: 'white.white_10',
        borderRadius: '6px',
        padding: '4px 16px 4px 8px',
        alignItems: 'center',
      })}
    >
      <div>
        <img src={getPersonaImage(product.persona.personaType)} width={60} height={67} alt="animal1" />
      </div>
      <Box flex="1">
        <span className={css({ textStyle: 'glyph15.regular', color: 'white.white' })}>
          {snakeToTitleCase(product.persona.personaType)}
        </span>
        <div
          className={css({
            display: 'flex',
            gap: '4px',
            alignItems: 'center',
            color: 'white.white_50',
            textStyle: 'glyph14regular',
          })}
        >
          <span>{ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(dropRate.replace('%', '')))]}</span>
          <span>/</span>
          <span>Lv.{product.persona.personaLevel}</span>
          <span>/</span>
          <span>{addNumberComma(product.price)}P</span>
        </div>
      </Box>
      <div>{rightElement}</div>
    </Flex>
  );
}
