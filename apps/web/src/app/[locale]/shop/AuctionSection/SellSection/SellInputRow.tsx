/* eslint-disable @next/next/no-img-element */
import type { ChangeEventHandler } from 'react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import { Flex } from '_panda/jsx';
import type { Persona } from '@gitanimals/api';
import { auctionQueries, userQueries } from '@gitanimals/react-query';
import { Button, Table } from '@gitanimals/ui-panda';
import { snakeToTitleCase } from '@gitanimals/util-common';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useRegisterProduct } from '@/apis/auctions/useRegisterProduct';
import { useGetAllPersona } from '@/hooks/query/render/useGetAllPersona';
import { ANIMAL_TIER_TEXT_MAP, getAnimalTierInfo } from '@/utils/animals';
import { getPersonaImage } from '@/utils/image';

import { tableCss } from '../table.styles';

const MAX_PRICE = 100_000_000;

interface Props {
  item: Persona | null;
  initPersona: () => void;
}

function SellInputRow({ item, initPersona }: Props) {
  const t = useTranslations('Shop');
  const { price, resetPrice, onChangePriceInput } = usePrice();

  const queryClient = useQueryClient();

  const {
    data: { personas },
  } = useGetAllPersona();
  const currentPersona = personas.find((persona) => persona.type === item?.type);

  const { mutate } = useRegisterProduct({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      queryClient.invalidateQueries({ queryKey: auctionQueries.myProductsKey() });

      initPersona();
      resetPrice();

      toast.success('판매 등록이 완료되었습니다.');
    },
  });

  const onSellClick = async () => {
    try {
      if (!item) throw new Error('Item is not found');
      if (!price) throw new Error('가격을 입력해주세요. ');

      mutate({ personaId: item.id, price });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Table className={tableCss}>
      <Table.Header>
        <Table.Row>
          <Table.Head width="132px" textAlign="center">
            {t('pet')}
          </Table.Head>
          <Table.Head>{t('name')}</Table.Head>
          <Table.Head>{t('grade')}</Table.Head>
          <Table.Head>{t('level')}</Table.Head>
          <Table.Head>{t('price')}</Table.Head>
          <Table.Head width="0"></Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {item && currentPersona ? (
          <Table.Row>
            <Table.Cell p="0">
              <img src={getPersonaImage(item.type)} alt={item.type} width={80} height={80} />
            </Table.Cell>
            <Table.Cell>{snakeToTitleCase(item.type)}</Table.Cell>
            <Table.Cell>
              {ANIMAL_TIER_TEXT_MAP[getAnimalTierInfo(Number(currentPersona.dropRate.replace('%', '')))]}
            </Table.Cell>
            <Table.Cell>{item.level}</Table.Cell>
            <Table.Cell>
              <input
                className={inputStyle}
                inputMode="numeric"
                placeholder={t('price-you-want')}
                value={price}
                onChange={onChangePriceInput}
              />
            </Table.Cell>
            <Table.Cell>
              <Button variant="secondary" onClick={onSellClick}>
                {t('sell')}
              </Button>
            </Table.Cell>
          </Table.Row>
        ) : (
          <Table.Row className="empty">
            <Table.Cell colSpan={6} style={{ borderRadius: '8px' }}>
              <Flex alignItems="center" justifyContent="center" w="full" h="full">
                Please select a pet.
              </Flex>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
}

export default SellInputRow;

const inputStyle = css({
  textStyle: 'glyph20.regular',

  width: '100%',
  height: '100%',
  minHeight: '64px',
  fontSize: '20px',
  fontWeight: 700,
  border: 'none',
  outline: 'none',

  '&::placeholder': {
    textStyle: 'glyph20.regular',
    color: 'white.white_25',
  },

  '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
    WebkitAppearance: 'none',
    margin: 0,
  },
});

function usePrice() {
  const [price, setPrice] = useState<number | undefined>();

  const resetPrice = () => setPrice(undefined);

  const onChangePriceInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const parsedValue = Number(value);

    if (Number.isNaN(parsedValue)) {
      return;
    }

    if (MAX_PRICE < parsedValue) {
      setPrice(MAX_PRICE);
      return;
    }

    setPrice(parsedValue);
  };

  return { price, onChangePriceInput, resetPrice };
}
