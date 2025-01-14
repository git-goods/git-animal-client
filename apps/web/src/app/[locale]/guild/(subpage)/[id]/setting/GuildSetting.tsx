'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { type Guild, updateGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import console from 'console';

import { useRouter } from '@/i18n/routing';

import { GuildInfoFormClient } from './GuidlInfoFormClient';

export function GuildSetting({
  icons,
  backgrounds,
  guildId,
  initialData,
}: {
  icons: string[];
  backgrounds: string[];
  guildId: string;
  initialData?: Guild;
}) {
  const router = useRouter();
  const [state, setState] = useState<{
    title: string;
    body: string;
    farmType: string;
    guildIcon: string;
    autoJoin: boolean;
  }>({
    title: '',
    body: '',
    farmType: '',
    guildIcon: '',
    autoJoin: false,
  });
  const [error, setError] = useState('');

  const onFieldChange = (key: string, value: string) => {
    setState({ ...state, [key]: value });
  };

  const onSubmit = async () => {
    try {
      await updateGuild(guildId, state);

      router.push(`/guild/${guildId}`);
    } catch (error) {
      setError('Failed to update guild');
      console.error(error);
    }
  };

  return (
    <div>
      <GuildInfoFormClient
        icons={icons}
        backgrounds={backgrounds}
        initialData={initialData}
        onFieldChange={onFieldChange}
        fields={state}
      />
      {error && <p aria-live="polite">{error}</p>}
      <Button className={css({ display: 'block', mt: 10, mx: 'auto' })} onClick={onSubmit}>
        Save
      </Button>
    </div>
  );
}
