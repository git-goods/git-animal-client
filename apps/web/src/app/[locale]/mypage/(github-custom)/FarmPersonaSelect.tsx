'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@gitanimals/ui-tailwind';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Dialog, ScrollArea } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';
import { customScrollHorizontalStyle } from '@/styles/scrollStyle';

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

      onChangeStatus('error');

      if (isMaximumPetCountError) {
        // 최대 펫 개수 초과 에러
        toast.error(t('maximum-pet-count-error'));
      } else {
        // 기타 에러
        toast.error(tError('global-error-message'));
      }
    },
    onSettled: async (res, error, variables) => {
      await queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      setLoadingPersona((prev) => prev.filter((id) => id !== variables.personaId));
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
      <section
        className={cn(
          'relative flex items-center justify-between mb-4',
          '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold [&_.heading]:text-white'
        )}
      >
        <h2 className="heading">{t('change-pet')}</h2>
        <button onClick={() => setIsOpen(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <ScrollArea className="h-40">
        <SelectPersonaList
          loadingPersona={loadingPersona}
          selectPersona={selectPersona}
          onSelectPersona={onSelectPersona}
          initSelectPersonas={initSelectPersonas}
        />
      </ScrollArea>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content size="large">
          <Dialog.Title>{t('farm-type-select-pet')}</Dialog.Title>
          <div
            className={cn(
              customScrollHorizontalStyle,
              'flex overflow-y-auto overflow-x-hidden w-full gap-1',
              'h-full min-h-0 flex-wrap justify-center max-h-full mt-6'
            )}
          >
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
