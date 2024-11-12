'use client';

import React, { useState } from 'react';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Banner, Button, FullModalBase } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientSession, useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { MergeResultModal } from './MergeResult';
import MergeAnimation from './Merging';

function MergePersona() {
  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);
  const [selectPersonaObj, setSelectPersonaObj] = useState<{
    material: Persona | undefined;
    target: Persona | undefined;
  }>({
    material: undefined,
    target: undefined,
  });

  const session = useClientSession();
  const token = session.data?.user.accessToken as string;

  const {
    mutate: mergePersonaLevel,
    isPending: isMerging,
    isSuccess: isMerged,
  } = useMergePersonaLevelByToken(token, {
    onSuccess: (data) => {
      setResultData(data);
    },
  });
  console.log('isMerged: ', isMerged);
  console.log('isMerging: ', isMerging);
  const isMergeDisabled = !selectPersonaObj.material || !selectPersonaObj.target;

  const onMergeAction = () => {
    if (!selectPersonaObj.target?.id || !selectPersonaObj.material?.id) {
      return;
    }

    mergePersonaLevel({
      increasePersonaId: selectPersonaObj.target.id,
      deletePersonaId: selectPersonaObj.material.id,
    });
  };

  const onSelectPersona = (persona: Persona) => {
    if (selectPersonaObj.target?.id === persona.id) {
      setSelectPersonaObj((prev) => ({
        ...prev,
        target: undefined,
      }));
      return;
    }

    if (selectPersonaObj.material?.id === persona.id) {
      setSelectPersonaObj((prev) => ({
        ...prev,
        material: undefined,
      }));
      return;
    }

    if (selectPersonaObj.target) {
      setSelectPersonaObj((prev) => ({
        ...prev,
        material: persona,
      }));
    } else {
      setSelectPersonaObj((prev) => ({
        ...prev,
        target: persona,
      }));
    }
  };

  return (
    <FullModalBase isOpen={true} onClose={() => {}}>
      <div>
        <MergeAnimation targetPersona={selectPersonaObj.target} materialPersona={selectPersonaObj.material} />

        <div
          className={cx(
            css({
              maxHeight: 'calc(100vh - 542px)',
              overflow: 'auto',
            }),
            listStyle,
          )}
        >
          <SelectPersonaList
            selectPersona={Object.values(selectPersonaObj).map((persona) => persona?.id ?? '')}
            onSelectPersona={onSelectPersona}
          />
        </div>

        <div className={css({ display: 'flex', justifyContent: 'center', gap: 12 })}>
          <Button variant="secondary">Cancel</Button>
          <Button disabled={isMergeDisabled} onClick={onMergeAction}>
            Merge
          </Button>
        </div>
        <MergeResultModal
          isOpen={Boolean(resultData)}
          onClose={() => setResultData(null)}
          result={resultData as MergePersonaLevelResponse}
        />
      </div>
    </FullModalBase>
  );
}

export default MergePersona;

const listStyle = cx(
  flex({
    gap: 4,
    w: '100%',
    h: '100%',
    minH: '0',
    overflowY: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  }),
  customScrollStyle,
);

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

const SelectPersonaList = wrap
  .ErrorBoundary({
    // TODO: 공통 에러 컴포넌트로 대체
    fallback: <div>error</div>,
  })
  .Suspense({
    fallback: (
      <>
        {Array.from({ length: 6 }).map((_, index) => (
          <BannerSkeleton key={index} size="small" />
        ))}
      </>
    ),
  })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));

    return (
      <>
        {data.personas.map((persona) => (
          <button
            key={`${persona.id}-${persona.visible}`}
            onClick={() => onSelectPersona(persona)}
            // disabled={loadingPersona?.includes(persona.id)}
            className={css({ outline: 'none' })}
          >
            <Banner
              // loading={loadingPersona?.includes(persona.id)}
              image={getPersonaImage(persona.type)}
              size="small"
              selected={selectPersona.includes(persona.id)}
            />
          </button>
        ))}
      </>
    );
  });
