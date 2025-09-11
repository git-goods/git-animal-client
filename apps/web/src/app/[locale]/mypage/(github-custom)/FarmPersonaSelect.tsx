import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { css, cx } from '_panda/css';
import { flex } from '_panda/patterns';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-panda';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { customScrollHorizontalStyle, customScrollStyle } from '@/styles/scrollStyle';

import { SelectPersonaList } from '../PersonaList';

export function FarmPersonaSelect({
  onChangeStatus,
}: {
  onChangeStatus: (status: 'loading' | 'success' | 'error') => void;
}) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');
  const tError = useTranslations('Error');

  const [selectPersona, setSelectPersona] = useState<string[]>([]);
  const [loadingPersona, setLoadingPersona] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useChangePersonaVisible({
    throwOnError: false,
    onMutate: () => {
      onChangeStatus('loading');
    },
    onSuccess: (res) => {
      if (res.visible) {
        setSelectPersona((prev) => Array.from(new Set([...prev, res.id])));
      } else {
        setSelectPersona((prev) => prev.filter((id) => id !== res.id));
      }
      onChangeStatus('success');
    },
    onError: (error) => {
      const isMaximumPetCountError = error.response?.status === 400;

      // onSettled에서 res는 undefined이므로
      // onError에서 personaId 추출 후 setState 실행
      const { personaId } = JSON.parse(error.config?.data);
      setLoadingPersona((prev) => prev.filter((id) => id !== personaId));
      onChangeStatus('error');

      if (isMaximumPetCountError) {
        // 최대 펫 개수 초과 에러
        toast.error(t('maximum-pet-count-error'));
      } else {
        // 기타 에러
        toast.error(tError('global-error-message'));
      }
    },
    onSettled: async (res) => {
      await queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      setLoadingPersona((prev) => prev.filter((id) => id !== res?.id));
    },
  });

  const onSelectPersona = (persona: Persona) => {
    setLoadingPersona((prev) => [...prev, persona.id]);

    const isVisible = selectPersona.includes(persona.id);

    // 보이는 상태라면 숨김으로, 숨김 상태라면 보이는 상태로 변경 요청
    mutate({ personaId: persona.id, visible: !isVisible });
  };

  const initSelectPersonas = (list: Persona[]) => {
    const visiblePersonaIds = list.filter((persona) => persona.visible).map((persona) => persona.id);
    setSelectPersona(visiblePersonaIds);
  };

  return (
    <div>
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
        <Dialog.Content size="large">
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
  customScrollHorizontalStyle,
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
