'use client';

import React, { memo, useMemo } from 'react';
import { css } from '_panda/css';
import { flex } from '_panda/patterns';
import Flicking from '@egjs/react-flicking';
import type { PersonasResponse } from '@gitanimals/api';
import { Banner } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { getAllPetsQueryOptions } from '@/apis/user/useGetAllPets';
import { getPersonaImage } from '@/utils/image';

interface Props {
  name: string;
  selectPersona: string[];
  onSelectPersona: (persona: PersonasResponse) => void;
}

export const SelectPersonaList = memo(
  wrap
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
    .on(function SelectPersonaList({ name, selectPersona, onSelectPersona }: Props) {
      const { data } = useSuspenseQuery(getAllPetsQueryOptions(name));

      const viewList = useMemo(() => {
        const highestLevelPersonas = data.personas.reduce(
          (acc, persona) => {
            if (!acc[persona.type] || acc[persona.type].level < persona.level) {
              acc[persona.type] = persona;
            }
            return acc;
          },
          {} as Record<string, (typeof data.personas)[number]>,
        );

        return Object.values(highestLevelPersonas);
      }, [data]);

      return (
        <div>
          <Flicking align="prev" firstPanelSize="80px" gap={10}>
            {viewList.map((persona) => (
              <button key={persona.id} onClick={() => onSelectPersona(persona)} className={css({ pl: 4 })}>
                <Banner
                  image={getPersonaImage(persona.type)}
                  size="small"
                  selected={selectPersona.includes(persona.id)}
                />
              </button>
            ))}
          </Flicking>
        </div>
      );
    }),
);
