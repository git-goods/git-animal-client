'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { GetAllMyPersonasResponse, MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Button, FullModalBase, LevelBanner } from '@gitanimals/ui-panda';
import { BannerSkeleton } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientSession, useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { MergePreview } from './MergePreview';
import { MergeResultModal } from './MergeResult';

interface MergePersonaProps {
  isOpen: boolean;
  onClose: () => void;
  targetPersona: Persona;
}

export function MergePersona({ isOpen, onClose, targetPersona: initTargetPersona }: MergePersonaProps) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage.Merge');

  const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);

  const [materialPersona, setMaterialPersona] = useState<Persona | null>(null);
  const [targetPersona, setTargetPersona] = useState<Persona>(initTargetPersona);

  const session = useClientSession();
  const token = session.data?.user.accessToken as string;
  const isMergeDisabled = !materialPersona || !targetPersona;
  const selectPersona = [targetPersona.id, materialPersona?.id].filter(Boolean) as string[];

  const { mutate: mergePersonaLevel, isPending: isMerging } = useMergePersonaLevelByToken(token, {
    onMutate: async (variables) => {
      const oldData = queryClient.getQueryData<GetAllMyPersonasResponse>(userQueries.allPersonasKey()); // 현재 캐시된 데이터 가져오기

      if (!oldData) {
        return;
      }
      // 새로운 데이터로 가공
      const newData = { ...oldData }; // 객체 복사

      newData.personas = [...oldData.personas].filter(
        // 내부 데이터 복사
        (item) => item.id !== variables.deletePersonaId,
      );

      queryClient.setQueryData(userQueries.allPersonasKey(), { ...newData });

      return { oldData }; // 다음 context로 넘기기 위해 반환
    },
    onError: (err, newData, context: any) => {
      // 에러 발생시 이전 데이터로 캐시 저장
      if (context?.oldData) {
        queryClient.setQueryData(userQueries.allPersonasKey(), context.oldData);
      }
    },

    onSuccess: (data) => {
      setMaterialPersona(null);
      setResultData(data);
      setTargetPersona(data);
      const prevAllPersonaData = queryClient.getQueryData<GetAllMyPersonasResponse>(userQueries.allPersonasKey()); // 현재 캐시된 데이터 가져오기

      const newPersonas = prevAllPersonaData?.personas.map((item) => {
        if (item.id === data.id) {
          return { ...data };
        }
        return item;
      });

      queryClient.setQueryData(userQueries.allPersonasKey(), { ...prevAllPersonaData, personas: newPersonas });
    },
  });

  const onMergeAction = () => {
    if (!targetPersona?.id || !materialPersona?.id) {
      return;
    }

    mergePersonaLevel({
      increasePersonaId: targetPersona.id,
      deletePersonaId: materialPersona.id,
    });
  };

  const onSelectPersona = (currentSelectPersona: Persona) => {
    if (currentSelectPersona.id === targetPersona.id) {
      setMaterialPersona(null);
    } else {
      setMaterialPersona(currentSelectPersona);
    }
  };

  return (
    <FullModalBase isOpen={isOpen} onClose={onClose}>
      <MergePreview targetPersona={targetPersona} materialPersona={materialPersona} />

      <div className={listStyle}>
        <SelectPersonaList selectPersona={selectPersona} onSelectPersona={onSelectPersona} />
      </div>

      <div className={bottomButtonStyle}>
        <Button variant="secondary" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button disabled={isMergeDisabled} onClick={onMergeAction}>
          {t('merge')}
        </Button>
      </div>
      <MergeResultModal
        key={resultData?.id}
        isOpen={Boolean(resultData)}
        onClose={() => setResultData(null)}
        result={resultData as MergePersonaLevelResponse}
      />
      {isMerging && <SpinningLoader />}
    </FullModalBase>
  );
}

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
            <LevelBanner
              image={getPersonaImage(persona.type)}
              selected={selectPersona.includes(persona.id)}
              level={Number(persona.level)}
              size="small"
            />
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
