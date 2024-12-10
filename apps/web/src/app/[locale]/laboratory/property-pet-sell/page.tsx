'use client';

import { memo } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { userQueries } from '@gitanimals/react-query/src/user';
import { LevelBanner } from '@gitanimals/ui-panda';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

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

    console.log('petItemMap: ', petItemMap);

    const onSell = (ids: string[]) => {
      console.log('onSell: ', ids);
    };

    return (
      <section className={sectionStyle}>
        <div className={flexOverflowStyle}>
          {Array.from(petItemMap.values()).map((petItem) => (
            <div key={petItem.type + petItem.level}>
              <MemoizedPersonaItem
                type={petItem.type}
                level={petItem.level}
                onClick={() => onSell(petItem.ids)}
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
