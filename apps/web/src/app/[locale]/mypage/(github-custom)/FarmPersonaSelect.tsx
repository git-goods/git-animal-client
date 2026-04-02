'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { cn, DialogV2 } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/features/change-persona-visible/model/useChangePersonaVisible';

import { SelectPersonaList } from '../PersonaList';

export function FarmPersonaSelect({ onImageRefresh }: { onImageRefresh: () => void }) {
  const queryClient = useQueryClient();
  const t = useTranslations('Mypage');
  const tError = useTranslations('Error');

  const [loadingPersona, setLoadingPersona] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useChangePersonaVisible({
    throwOnError: false,
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error(t('maximum-pet-count-error'));
      } else {
        toast.error(tError('global-error-message'));
      }
    },
    onSettled: async (_, __, variables) => {
      await queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
      setLoadingPersona((prev) => prev.filter((id) => id !== variables.personaId));
      onImageRefresh();
    },
  });

  const onSelectPersona = (persona: Persona) => {
    setLoadingPersona((prev) => [...prev, persona.id]);
    mutate({ personaId: persona.id, visible: !persona.visible });
  };

  const personaListProps = {
    loadingPersona,
    onSelectPersona,
  };

  return (
    <div>
      <section
        className={cn(
          'relative flex items-center justify-between mb-4',
          '[&_.heading]:font-product [&_.heading]:text-glyph-18 [&_.heading]:font-bold [&_.heading]:text-white',
        )}
      >
        <h2 className="heading">{t('change-pet')}</h2>
        <button onClick={() => setIsOpen(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <SelectPersonaList {...personaListProps}>
        <SelectPersonaList.InventoryGrid minRows={2} maxRows={3} />
      </SelectPersonaList>
      <DialogV2 open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogV2.Content size="lg" className="h-full">
          <DialogV2.CloseButton />
          <SelectPersonaList {...personaListProps}>
            <DialogV2.Header>
              <DialogV2.Title>{t('farm-type-select-pet')}</DialogV2.Title>
              <SelectPersonaList.Toolbar showSearch showVisibilityFilter />
            </DialogV2.Header>

            <DialogV2.Body scroll={false} className="h-full flex-1">
              <SelectPersonaList.InventoryGrid minRows={2} mode="dialog" />
            </DialogV2.Body>
          </SelectPersonaList>
        </DialogV2.Content>
      </DialogV2>
    </div>
  );
}
