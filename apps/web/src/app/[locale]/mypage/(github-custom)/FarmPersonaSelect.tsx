import { useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Dialog } from '@gitanimals/ui-tailwind';
import { useQueryClient } from '@tanstack/react-query';
import { ExpandIcon } from 'lucide-react';
import { toast } from 'sonner';

import { useChangePersonaVisible } from '@/apis/persona/useChangePersonaVisible';

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
      <section className={selectPetContainerStyle}>
        <h2 className="glyph18-bold text-white">{t('change-pet')}</h2>
        <button onClick={() => setIsOpen(true)}>
          <ExpandIcon color="white" size={20} />
        </button>
      </section>
      <SelectPersonaList {...personaListProps}>
        <SelectPersonaList.InventoryGrid rows={2} />
      </SelectPersonaList>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Content size="lg" scrollable>
          <Dialog.Title>{t('farm-type-select-pet')}</Dialog.Title>
          <SelectPersonaList {...personaListProps}>
            <Dialog.TopSlot>
              <SelectPersonaList.Toolbar showSearch showVisibilityFilter />
            </Dialog.TopSlot>
            <Dialog.Body>
              <SelectPersonaList.InventoryGrid rows="auto" minRows={2} />
            </Dialog.Body>
          </SelectPersonaList>
        </Dialog.Content>
      </Dialog>
    </div>
  );
}

const selectPetContainerStyle = 'relative flex items-center justify-between mb-[16px]';
