'use client';

import { css } from '_panda/css';
import { grid } from '_panda/patterns';
import { changePersonaVisible, type Persona } from '@gitanimals/api';
import { userQueries } from '@gitanimals/react-query';
import { LevelBanner } from '@gitanimals/ui-panda';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { SubLayout } from '@/components/Layout/SubLayout';
import { useClientUser } from '@/utils/clientAuth';
import { getPersonaImage } from '@/utils/image';

export default function PersonaPage() {
  const session = useClientUser();
  const queryClient = useQueryClient();
  const { data: user } = useQuery(userQueries.allPersonasOptions(session.name));

  const personas = user?.personas ?? [];
  const selectedPersonas = personas.filter((persona) => persona.appVisible);

  const onSelectPersona = async (persona: Persona) => {
    try {
      await changePersonaVisible({
        personaId: persona.id,
        visible: !persona.appVisible,
        type: 'APP',
      });
      queryClient.invalidateQueries({ queryKey: userQueries.allPersonasKey() });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SubLayout title="Select Pet">
      <div
        className={grid({
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4px',
          width: '100%',
        })}
      >
        {personas.map((persona) => (
          <button key={persona.id} onClick={() => onSelectPersona(persona)}>
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
