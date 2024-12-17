'use client';

import { memo, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { dropPets } from '@gitanimals/api/src/shop/dropPet';
import { userQueries } from '@gitanimals/react-query/src/user';
import { LevelBanner } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

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
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));

    const { showDialog } = useDialog();

    const onPetClick = (ids: string[]) => {
      showDialog({
        title: '펫 판매',
        description: `펫을 판매하시겠습니까? ${ids.length}마리를 판매합니다.`,
        onConfirm: () => onSell(ids),
      });
    };

    const onSell = async (ids: string[]) => {
      const res = await dropPets({ personaIds: ids });

      const totalPrice = res.success.reduce((acc, curr) => acc + curr.givenPoint, 0);

      trackEvent('laboratory', {
        type: '레벨, 타입 같은 펫 한번에 팔기',
      });

      showDialog({
        title: '펫 판매 완료',
        description: (
          <div>
            <p>
              {res.success.length}마리 판매 완료, {res.errors.length}마리 판매 실패
            </p>
            <p>총 판매 금액: {totalPrice}P</p>
          </div>
        ),
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

      return Array.from(petItemMap.values()).sort((a, b) => Number(a.level) - Number(b.level));
    }, [data.personas]);

    return (
      <section className={sectionStyle}>
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
