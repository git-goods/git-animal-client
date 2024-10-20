'use client';

import React, { useEffect, useMemo } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { Banner } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { userAllPersonasQueryOptions } from '@/lib/react-query/user';
import { getPersonaImage } from '@/utils/image';

interface Props {
  name: string;
  isExtend: boolean;
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;

  initSelectPersona?: (list: string[]) => void;
  loadingPersona?: string[];
}

const listStyle = flex({ gap: 4, w: '100%', overflowX: 'auto' });

export const SelectPersonaList = wrap
  .ErrorBoundary({
    // TODO: 공통 에러 컴포넌트로 대체
    fallback: <div>error</div>,
  })
  .Suspense({
    fallback: (
      <div className={listStyle}>
        {Array.from({ length: 6 }).map((_, index) => (
          <BannerSkeleton key={index} size="small" />
        ))}
      </div>
    ),
  })

  .on(function SelectPersonaList({
    name,
    isExtend,
    selectPersona,
    onSelectPersona,
    initSelectPersona,
    loadingPersona,
  }: Props) {
    const { data } = useSuspenseQuery(userAllPersonasQueryOptions(name));

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
      <div className={cx(listStyle, css({ flexWrap: isExtend ? 'wrap' : 'nowrap' }))}>
        {viewList.map((persona) => (
          <button
            key={`${persona.id}-${persona.visible}`}
            onClick={() => onSelectPersona(persona)}
            disabled={loadingPersona?.includes(persona.id)}
            className={css({ outline: 'none' })}
          >
            <Banner
              loading={loadingPersona?.includes(persona.id)}
              image={getPersonaImage(persona.type)}
              size="small"
              selected={selectPersona.includes(persona.id)}
            />
          </button>
        ))}
      </div>
    );
  });
