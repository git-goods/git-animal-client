'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { PersonasResponse } from '@gitanimals/api';
import { Banner, Button } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllPetsQueryOptions } from '@/apis/user/useGetAllPets';
import { getPersonaImage } from '@/utils/image';

interface Props {
  name: string;
  selectPersona: string[];
  onSelectPersona: (persona: PersonasResponse) => void;
  initSelectPersona?: (list: string[]) => void;
  loadingPersona?: string[];
}

export const SelectPersonaList = wrap
  .Suspense({
    fallback: (
      <div className={flex({ gap: 4, h: 80 })}>
        {Array.from({ length: 4 }).map((_, index) => (
          <BannerSkeleton key={index} size="small" />
        ))}
      </div>
    ),
  })
  .ErrorBoundary({
    fallback: <div>error</div>,
  })
  .on(function SelectPersonaList({ name, selectPersona, onSelectPersona, initSelectPersona, loadingPersona }: Props) {
    const { data } = useSuspenseQuery(getAllPetsQueryOptions(name));

    const [isExtend, setIsExtend] = useState(false);

    useEffect(() => {
      if (initSelectPersona) {
        const visiblePersonas = data.personas.filter((persona) => persona.visible);
        const visiblePersonaIds = visiblePersonas.map((persona) => persona.id);
        initSelectPersona(visiblePersonaIds);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const viewList = useMemo(() => {
      const viewListSorted = data.personas.sort((a, b) => {
        if (a.visible && !b.visible) return -1;
        if (!a.visible && b.visible) return 1;
        return parseInt(a.level) - parseInt(b.level);
      });

      return viewListSorted;
    }, [data]);

    return (
      <section className={containerStyle}>
        <h2 className="heading">Change pet</h2>
        <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
          {isExtend ? '축소' : '확장'}
        </Button>
        <div className={cx(listStyle, css({ flexWrap: isExtend ? 'wrap' : 'nowrap' }))}>
          {viewList.map((persona) => (
            <button
              key={`${persona.id}-${persona.visible}`}
              onClick={() => onSelectPersona(persona)}
              disabled={loadingPersona?.includes(persona.id)}
            >
              {/* {loadingPersona?.includes(persona.id) ? (
                <Skeleton w={80} h={80} color="black" />
              ) : ( */}
              <Banner
                loading={loadingPersona?.includes(persona.id)}
                image={getPersonaImage(persona.type)}
                size="small"
                selected={selectPersona.includes(persona.id)}
              />
              {/* )} */}
            </button>
          ))}
        </div>
      </section>
    );
  });

const containerStyle = css({
  position: 'relative',
  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
    marginBottom: '16px',
  },
  '& .extend-button': {
    position: 'absolute',
    top: '-16px',
    right: 0,
  },
});

const listStyle = flex({ gap: 4, w: '100%', overflowX: 'auto' });
