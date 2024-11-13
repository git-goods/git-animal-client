'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Banner, Button, FullModalBase } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientSession, useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { MergeResultModal } from './MergeResult';
import { MergeAnimation } from './Merging';

const INITIAL_SELECT_PERSONA_OBJ = { material: undefined, target: undefined } as const;

interface MergePersonaProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MergePersona({ isOpen, onClose }: MergePersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage.Merge');
  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);
  const [selectPersonaObj, setSelectPersonaObj] = useState<{ material?: Persona; target?: Persona }>(
    INITIAL_SELECT_PERSONA_OBJ,
  );

  const session = useClientSession();
  const token = session.data?.user.accessToken as string;
  const isMergeDisabled = !selectPersonaObj.material || !selectPersonaObj.target;

  const { mutate: mergePersonaLevel, isPending: isMerging } = useMergePersonaLevelByToken(token, {
    onSuccess: (data) => {
      setSelectPersonaObj((prev) => ({ ...prev, material: undefined, target: data }));
      setResultData(data);
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    },
  });

  const onMergeAction = () => {
    if (!selectPersonaObj.target?.id || !selectPersonaObj.material?.id) {
      return;
    }

    mergePersonaLevel({
      increasePersonaId: selectPersonaObj.target.id,
      deletePersonaId: selectPersonaObj.material.id,
    });
  };

  const onSelectPersona = (currentSelectPersona: Persona) => {
    setSelectPersonaObj(getMergePersona({ ...selectPersonaObj, currentSelectPersona }));
  };

  return (
    <FullModalBase isOpen={isOpen} onClose={onClose}>
      <MergeAnimation targetPersona={selectPersonaObj.target} materialPersona={selectPersonaObj.material} />

      <div className={listStyle}>
        <SelectPersonaList
          selectPersona={Object.values(selectPersonaObj).map((persona) => persona?.id ?? '')}
          onSelectPersona={onSelectPersona}
        />
      </div>

      <div className={bottomButtonStyle}>
        <Button variant="secondary">{t('cancel')}</Button>
        <Button disabled={isMergeDisabled} onClick={onMergeAction}>
          {t('merge')}
        </Button>
      </div>
      <MergeResultModal
        isOpen={Boolean(resultData)}
        onClose={() => setResultData(null)}
        result={resultData as MergePersonaLevelResponse}
      />
      {isMerging && <SpinningLoader />}
    </FullModalBase>
  );
}

const getMergePersona = ({
  target,
  material,
  currentSelectPersona,
}: {
  target?: Persona;
  material?: Persona;
  currentSelectPersona: Persona;
}) => {
  if (currentSelectPersona.id === target?.id) {
    return { target: undefined, material };
  }

  if (currentSelectPersona.id === material?.id) {
    return { target, material: undefined };
  }

  if (target) {
    return { target, material: currentSelectPersona };
  }

  return { target: currentSelectPersona, material };
};

const bottomButtonStyle = css({ display: 'flex', justifyContent: 'center', gap: 12 });

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
    maxHeight: 'calc(100vh - 542px)',
    overflow: 'auto',
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
            className={css({ outline: 'none' })}
          >
            <Banner image={getPersonaImage(persona.type)} size="small" selected={selectPersona.includes(persona.id)} />
          </button>
        ))}
      </>
    );
  });

const SpinningLoader = () => {
  return (
    <div className={spinningLoaderContainerStyle}>
      <div className={spinningLoaderStyle} />
    </div>
  );
};

const spinningLoaderContainerStyle = css({
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  bottom: '0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  zIndex: 100,
  height: '100%',
  background: 'rgba(0, 0, 0, 0.5)',
});

const spinningLoaderStyle = css({
  width: '64px',
  height: '64px',
  border: '4px solid transparent',
  borderTop: '4px solid #fff',
  borderRadius: '50%',
  animation: 'animateSpin 1s linear infinite',
});
