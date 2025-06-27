'use client';

import { css } from '_panda/css';
import { grid } from '_panda/patterns';
import type { ChangePersonaVisibleRequest } from '@gitanimals/api';
import { changePersonaVisible, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { LevelBanner } from '@gitanimals/ui-panda';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SubLayout } from '@/components/Layout/SubLayout';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

import { CharacterViewMemo } from '../CharacterView';

export default function PersonaPage() {
  const session = useClientUser();
  const queryClient = useQueryClient();

  const { data: user } = useQuery(userQueries.allPersonasOptions(session.name));
  const { mutate: mutateChangePersonaVisible, isPending: isChangingPersonaVisible } = useMutation({
    mutationFn: (request: ChangePersonaVisibleRequest) => changePersonaVisible(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    },
    onError: () => {
      toast.error('Failed to change persona visible');
    },
  });

  const personas = user?.personas ?? [];
  const selectedPersonas = personas.filter((persona) => persona.appVisible);
  console.log('selectedPersonas: ', selectedPersonas);

  // 선택된 펫들의 petId 리스트 생성 (Persona의 id를 petId로 사용)
  const selectedPetIds = selectedPersonas.map((persona) => persona.id);

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
    <SubLayout title="Select Pet">
      <div
        className={css({
          bgImage: 'url(/assets/home/preview-background.png)',
          bgSize: 'cover',
          bgPosition: 'center',
          bgRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          overflow: 'hidden',
          bgColor: '#94D7A1',
        })}
      >
        <CharacterViewMemo petIds={selectedPetIds} />
      </div>
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
              })}
            />
          </button>
        ))}
      </div>
    </SubLayout>
  );
}
