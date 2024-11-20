import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Dialog, dialogContentCva } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon } from 'lucide-react';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { customScrollStyle } from '@/styles/scrollStyle';

import { SelectPersonaList } from '../PersonaList';

import { useFarmTutorial } from './FarmTutorial';

export function FarmPersonaSelect({
  onChangeStatus,
}: {
  onChangeStatus: (status: 'loading' | 'success' | 'error') => void;
}) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');
  const { classes: farmTutorialClasses } = useFarmTutorial();

  const [selectPersona, setSelectPersona] = useState<string[]>([]);
  const [loadingPersona, setLoadingPersona] = useState<string[]>([]);
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
    <div className={farmTutorialClasses.personaSelect}>
      <section className={selectPetContainerStyle}>
        <h2 className="heading">{t('change-pet')}</h2>
        <button onClick={() => setIsOpen(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <section className={listStyle}>
        <SelectPersonaList
          loadingPersona={loadingPersona}
          selectPersona={selectPersona}
          onSelectPersona={onSelectPersona}
          initSelectPersonas={initSelectPersonas}
        />
      </section>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content className={dialogContentCva({ size: 'large' })}>
          <Dialog.Title>{t('farm-type-select-pet')}</Dialog.Title>
          <div className={flexOverflowStyle}>
            <SelectPersonaList
              loadingPersona={loadingPersona}
              selectPersona={selectPersona}
              onSelectPersona={onSelectPersona}
              initSelectPersonas={initSelectPersonas}
            />
          </div>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}
const listStyle = cx(
  flex({
    gap: '4px',
    w: '100%',
    h: '100%',
    minH: '0',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
    gridAutoColumns: 'max-content',
    gridAutoFlow: 'column',
  }),
  customScrollStyle,
);

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
    justifyContent: 'center',
    maxHeight: 'calc(100%)',
    marginTop: '24px',
  }),
  customScrollStyle,
);

const selectPetContainerStyle = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '16px',

  '& .heading': {
    textStyle: 'glyph18.bold',
    color: 'white',
  },
});
