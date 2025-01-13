'use client';

import { memo, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { Flex } from '_panda/jsx';
import { dropPets } from '@gitanimals/api/src/shop/dropPet';
import { userQueries } from '@gitanimals/react-query/src/user';
import { Button, LevelBanner } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { useDialog } from '@/components/Global/useDialog';
import { trackEvent } from '@/lib/analytics';
import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

export default function PropertyPetSellPage() {
  return (
    <div>
      <PersonaList />
    </div>
  );
}

interface PetItemType {
  ids: string[];
  type: string;
  level: string;
}

const PersonaList = wrap
  .ErrorBoundary({ fallback: <div> </div> })
  .Suspense({ fallback: <></> })
  .on(function PersonaList() {
    const queryClient = useQueryClient();
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const [sort, setSort] = useState<'level-asc' | 'level-desc' | 'count-asc' | 'count-desc'>('level-asc');

    const { showDialog } = useDialog();

    const onPetClick = (ids: string[]) => {
      showDialog({
        title: '펫 판매',
        description: `펫을 판매하시겠습니까? ${ids.length}마리를 판매합니다.`,
        onConfirm: () => onSell(ids),
      });
    };

    const DropPetsResult = ({ success, errors }: { success: { givenPoint: number }[]; errors: unknown[] }) => {
      const t = useTranslations('Laboratory.property-pet-sell');

      if (success.length === 0 && errors.length === 0) {
        return (
          <div>
            <p>
              0{t('count')} {t('saleSuccess')}, 0{t('count')} {t('saleFail')}
            </p>
          </div>
        );
      }

      if (success.length === 0) {
        return (
          <div>
            <p>
              {errors.length}
              {t('count')} {t('saleFail')}
            </p>
          </div>
        );
      }

      const totalPrice = success.reduce((acc, curr) => acc + curr.givenPoint, 0);

      if (errors.length === 0) {
        return (
          <div>
            <p>
              {success.length}
              {t('count')} {t('saleSuccess')}
            </p>
            <p>
              {t('totalAmount')}: {totalPrice}P
            </p>
          </div>
        );
      }

      return (
        <div>
          <p>
            {success.length}
            {t('count')} {t('saleSuccess')}, {errors.length}
            {t('count')} {t('saleFail')}
          </p>
          <p>
            {t('totalAmount')}: {totalPrice}P
          </p>
        </div>
      );
    };

    const onSell = async (ids: string[]) => {
      const res = await dropPets({ personaIds: ids });

      trackEvent('laboratory', {
        type: '레벨, 타입 같은 펫 한번에 팔기',
      });

      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });

      showDialog({
        title: '펫 판매 완료',
        description: <DropPetsResult success={res.success} errors={res.errors} />,
      });
    };

    // 레벨 오름차순 정렬
    const petList = useMemo(() => {
      const petItemMap = new Map<string, PetItemType>();

      data.personas.forEach((persona) => {
        const level = persona.level;
        const type = persona.type;
        const uniqueKey = `${type}-${level}`;
        const petItem = petItemMap.get(uniqueKey);
        if (petItem) {
          petItem.ids.push(persona.id);
        } else {
          petItemMap.set(uniqueKey, { ids: [persona.id], type, level });
        }
      });

      return Array.from(petItemMap.values()).sort((a, b) => {
        switch (sort) {
          case 'level-desc':
            return Number(b.level) - Number(a.level);
          case 'count-asc':
            return a.ids.length - b.ids.length;
          case 'count-desc':
            return b.ids.length - a.ids.length;
          case 'level-asc':
          default:
            // 레벨이 같으면 개수로 내림차순 정렬
            const levelDiff = Number(a.level) - Number(b.level);
            if (levelDiff !== 0) return levelDiff;
            return b.ids.length - a.ids.length;
        }
      });
    }, [data.personas, sort]);

    return (
      <section className={sectionStyle}>
        <Flex gap="8px">
          <Button onClick={() => setSort('level-asc')} variant={sort === 'level-asc' ? 'primary' : 'secondary'}>
            레벨 오름차순
          </Button>
          <Button onClick={() => setSort('level-desc')} variant={sort === 'level-desc' ? 'primary' : 'secondary'}>
            레벨 내림차순
          </Button>
          <Button onClick={() => setSort('count-asc')} variant={sort === 'count-asc' ? 'primary' : 'secondary'}>
            개수 오름차순
          </Button>
          <Button onClick={() => setSort('count-desc')} variant={sort === 'count-desc' ? 'primary' : 'secondary'}>
            개수 내림차순
          </Button>
        </Flex>
        <div className={flexOverflowStyle}>
          {petList.map((petItem) => (
            <div key={petItem.type + petItem.level}>
              <MemoizedPersonaItem
                type={petItem.type}
                level={petItem.level}
                onClick={() => onPetClick(petItem.ids)}
                count={petItem.ids.length}
              />
            </div>
          ))}
        </div>
      </section>
    );
  });

const sectionStyle = css({
  height: '100%',
  maxHeight: '100%',
  minHeight: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const flexOverflowStyle = cx(
  css({
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    gap: '12px 4px',
    height: '100%',
    minHeight: '0',
    flexWrap: 'wrap',
    maxHeight: 'calc(100% - 24px)',
  }),
  customScrollStyle,
);

interface PersonaItemProps {
  type: string;
  level: string;
  onClick: () => void;
  count: number;
}

function PersonaItem({ type, level, onClick, count }: PersonaItemProps) {
  const t = useTranslations('Laboratory.property-pet-sell');
  return (
    <button onClick={onClick} className={css({ outline: 'none', bg: 'transparent' })}>
      <div className={levelTagStyle}>
        {count}
        {t('count')}
      </div>
      <LevelBanner image={getPersonaImage(type)} level={Number(level)} size="small" />
    </button>
  );
}

const MemoizedPersonaItem = memo(PersonaItem, (prev, next) => {
  return prev.type === next.type && prev.level === next.level;
});

const levelTagStyle = css({
  borderRadius: '4px',
  background: 'black.black_25',
  padding: '0 8px',
  color: 'white.white_75',
  textStyle: 'glyph16.bold',
  fontSize: '10px',
  lineHeight: '20px',
  mb: '4px',
});
