import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css } from '_panda/css';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, FullModal } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';

import { SelectPersonaList } from '../PersonaList';

export function FarmPersonaSelect({
  onChangeStatus,
}: {
  onChangeStatus: (status: 'loading' | 'success' | 'error') => void;
}) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');

  const [selectPersona, setSelectPersona] = useState<string[]>([]);
  const [loadingPersona, setLoadingPersona] = useState<string[]>([]);
  const [isExtend, setIsExtend] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useChangePersonaVisible({
    onMutate: () => {
      onChangeStatus('loading');
    },
    onSuccess: (res) => {
      if (res.visible) {
        setSelectPersona((prev) => Array.from(new Set([...prev, res.id])));
      } else {
        setSelectPersona((prev) => prev.filter((id) => id !== res.id));
      }
    },
    onError: () => {
      onChangeStatus('error');
    },
    onSettled: async (res) => {
      await queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      onChangeStatus('success');
      setLoadingPersona((prev) => prev.filter((id) => id !== res?.id));
    },
  });

  const onSelectPersona = (persona: Persona) => {
    setLoadingPersona((prev) => [...prev, persona.id]);

    const isVisible = selectPersona.includes(persona.id);

    if (isVisible) {
      mutate({ personaId: persona.id, visible: false });
    } else {
      mutate({ personaId: persona.id, visible: true });
    }
  };

  const initSelectPersonas = (list: Persona[]) => {
    const visiblePersonaIds = list.filter((persona) => persona.visible).map((persona) => persona.id);
    setSelectPersona(visiblePersonaIds);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>open</button>
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('change-pet')}</h2>
        <Button className="extend-button" onClick={() => setIsExtend((prev) => !prev)}>
          {isExtend ? t('shrink-button') : t('extend-button')}
        </Button>
      </section>
      <section className={isExtend ? flexGrowSectionStyle : ''}>
        <SelectPersonaList
          loadingPersona={loadingPersona}
          selectPersona={selectPersona}
          onSelectPersona={onSelectPersona}
          initSelectPersonas={initSelectPersonas}
          isExtend={isExtend}
        />
      </section>
      <FullModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FullModal.CloseButton onClose={() => setIsOpen(false)} />
        <FullModal.Heading>페르소나 선택</FullModal.Heading>
      </FullModal>
    </>
  );
}

const flexGrowSectionStyle = css({
  flex: '1',
  minHeight: '0',
  overflow: 'auto',
  display: 'flex',
  flexWrap: 'wrap',
});

const selectPetContainerStyle = css({
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
