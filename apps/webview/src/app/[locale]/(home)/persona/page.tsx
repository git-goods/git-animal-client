'use client';

import { css } from '_panda/css';
import { grid } from '_panda/patterns';
import type { ChangePersonaVisibleRequest } from '@gitanimals/api';
import { changePersonaVisible, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { Button, LevelBanner } from '@gitanimals/ui-panda';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { BottomButton, SubLayout } from '@/components/Layout/SubLayout';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { CharacterViewMemo } from '../CharacterView';

export default function PersonaPage() {
  const session = useClientUser();

  const { data: user } = useQuery(userQueries.allPersonasOptions(session.name));

  const personas = user?.personas ?? [];
  const selectedPersonas = personas.filter((persona) => persona.appVisible);

  const selectedPetIds = selectedPersonas.map((persona) => persona.id);
  return (
    <SubLayout title="Select Pet">
      <div
        className={css({
          bgImage: 'url(/assets/home/preview-background.png)',
          bgSize: 'cover',
          bgPosition: 'center',
          bgRepeat: 'no-repeat',
          width: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          bgColor: '#94D7A1',
        })}
      >
        <CharacterViewMemo petIds={selectedPetIds} />
      </div>
      <div className={css({ flex: 1, overflowY: 'auto' })}>
        <PersonaSelectList personas={personas} selectedPersonas={selectedPersonas} />
        <div className={css({ h: '32px' })}></div>
      </div>
      <BottomButton>
        <Button size="m" className={css({ width: '100%' })}>
          Save
        </Button>
      </BottomButton>
    </SubLayout>
  );
}

function PersonaSelectList({ personas, selectedPersonas }: { personas: Persona[]; selectedPersonas: Persona[] }) {
  const queryClient = useQueryClient();

  const { mutate: mutateChangePersonaVisible, isPending: isChangingPersonaVisible } = useMutation({
    mutationFn: (request: ChangePersonaVisibleRequest) => changePersonaVisible(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    },
    onError: () => {
      toast.error('Failed to change persona visible');
    },
  });

  const onSelectPersona = async (persona: Persona) => {
    try {
      mutateChangePersonaVisible({
        personaId: persona.id,
        visible: !persona.appVisible,
        type: 'APP',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={grid({
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '4px',
        width: '100%',
      })}
    >
      {personas.map((persona) => (
        <button
          key={persona.id}
          onClick={() => !isChangingPersonaVisible && onSelectPersona(persona)}
          disabled={isChangingPersonaVisible}
        >
          <LevelBanner
            image={getPersonaImage(persona.type)}
            status={selectedPersonas.find((p) => p.id === persona.id) ? 'selected' : 'default'}
            level={Number(persona.level)}
            size="small"
            className={css({
              width: 'auto',
              height: 'auto',
              aspectRatio: '1/1',
              p: 2,
              cursor: 'pointer',

              _mobile: {
                width: 'auto',
                height: 'auto',
              },
            })}
          />
        </button>
      ))}
    </div>
  );
}
