'use client';

import { memo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import type { MergePersonaLevelResponse, Persona } from '@gitanimals/api';
import { useMergePersonaLevelByToken, userQueries } from '@gitanimals/react-query';
import { Button, LevelBanner } from '@gitanimals/ui-panda';
import { BannerSkeletonList } from '@gitanimals/ui-panda/src/components/Banner/Banner';
import { wrap } from '@suspensive/react';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';

import { customScrollStyle } from '@/styles/scrollStyle';
import { useClientSession, useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { MergePreview } from './MergePreview';
import { MergeResultModal } from './MergeResult';

interface MergePersonaProps {
  targetPersonaId: string;
}

export const MergePersona = wrap
  .ErrorBoundary({ fallback: <></> })
  .Suspense({ fallback: <></> })
  .on(function MergePersona({ targetPersonaId }: MergePersonaProps) {
    const queryClient = useQueryClient();

    const session = useClientSession();
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const t = useTranslations('Mypage.Merge');

    const [resultData, setResultData] = useState<MergePersonaLevelResponse | null>(null);
    const [materialPersona, setMaterialPersona] = useState<Persona | null>(null);

    const targetPersona = data.personas.find((persona) => persona.id === targetPersonaId) as Persona;
    const token = session.data?.user.accessToken as string;
    const isMergeDisabled = !materialPersona || !targetPersona;
    const selectPersona = [targetPersona.id, materialPersona?.id].filter(Boolean) as string[];

    const { mutate: mergePersonaLevel, isPending: isMerging } = useMergePersonaLevelByToken(token, {
      onSuccess: (data) => {
        setMaterialPersona(null);
        setResultData(data);
        // setTargetPersona(data);
        queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
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
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', pb: '60px' })}>
        {/* <Dialog.Title className={headingStyle}>Merge to Level Up</Dialog.Title> */}
        <MergePreview targetPersona={targetPersona} materialPersona={materialPersona} />

        <section className={sectionStyle}>
          <div className={listSectionTitleStyle}>
            <p>{t('please-choose-pet')}</p>
          </div>
          <div className={flexOverflowStyle}>
            {data.personas.map((persona) => (
              <MemoizedPersonaItem
                key={persona.id}
                persona={persona}
                isSelected={selectPersona.includes(persona.id)}
                onClick={() => onSelectPersona(persona)}
              />
            ))}
          </div>
        </section>
        <div className={footerStyle}>
          {/* <Button variant="secondary" onClick={onClose}>
              {t('cancel')}
            </Button> */}
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
      </div>
    );
  });

const headingStyle = css({ marginTop: '40px' });
const footerStyle = css({ display: 'flex', justifyContent: 'center', gap: '12px' });

interface SelectPersonaListProps {
  selectPersona: string[];
  onSelectPersona: (persona: Persona) => void;
  initSelectPersonas?: (list: Persona[]) => void;
  loadingPersona?: string[];
}

const SelectPersonaList = wrap
  .ErrorBoundary({ fallback: <div>error</div> })
  .Suspense({ fallback: <BannerSkeletonList length={6} size="small" /> })
  .on(function SelectPersonaList({ selectPersona, onSelectPersona }: SelectPersonaListProps) {
    const { name } = useClientUser();
    const { data } = useSuspenseQuery(userQueries.allPersonasOptions(name));
    const t = useTranslations('Mypage.Merge');

    // TODO: 정렬
    return (
      <section className={sectionStyle}>
        <div className={listSectionTitleStyle}>
          <p>{t('please-choose-pet')}</p>
        </div>
        <div className={flexOverflowStyle}>
          {data.personas.map((persona) => (
            <MemoizedPersonaItem
              key={persona.id}
              persona={persona}
              isSelected={selectPersona.includes(persona.id)}
              onClick={() => onSelectPersona(persona)}
            />
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

const listSectionTitleStyle = css({
  textStyle: 'glyph16.regular',
  color: 'white.white_50',
  display: 'flex',
  justifyContent: 'space-between',
});

const flexOverflowStyle = cx(
  css({
    display: 'flex',
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    gap: '4px',
    height: '100%',
    minHeight: '0',
    flexWrap: 'wrap',
    flex: 1,
    // maxHeight: 'calc(100% - 24px)',
  }),
  customScrollStyle,
);

interface PersonaItemProps {
  persona: Persona;
  isSelected: boolean;
  onClick: () => void;
}

function PersonaItem({ persona, isSelected, onClick }: PersonaItemProps) {
  return (
    <button onClick={onClick} className={css({ outline: 'none', bg: 'transparent' })}>
      <LevelBanner
        image={getPersonaImage(persona.type)}
        status={isSelected ? 'selected' : 'default'}
        level={Number(persona.level)}
        size="small"
      />
    </button>
  );
}

const MemoizedPersonaItem = memo(PersonaItem, (prev, next) => {
  return prev.isSelected === next.isSelected && prev.persona.level === next.persona.level;
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
  zIndex: 'floating',
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
