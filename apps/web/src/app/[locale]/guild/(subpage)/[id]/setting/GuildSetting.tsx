'use client';

import { useState } from 'react';
import { css } from '_panda/css';
import { type Guild, updateGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
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
  console.log('initialData: ', initialData);
  const router = useRouter();
  const [state, setState] = useState<{
    title: string;
    body: string;
    farmType: string;
    guildIcon: string;
    autoJoin: boolean;
  }>({
    title: initialData?.title || '',
    body: initialData?.body || '',
    farmType: initialData?.farmType || '',
    guildIcon: initialData?.guildIcon || '',
    autoJoin: initialData?.autoJoin || false,
  });
  const [error, setError] = useState('');
  const [formError, setFormError] = useState<Record<string, string>>({});
  console.log('formError: ', formError);

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
        onFieldChange={onFieldChange}
        fields={state}
        setFormError={setFormError}
        formError={formError}
      />
      {error && <p aria-live="polite">{error}</p>}
      <Button
        className={css({ display: 'block', mt: 10, mx: 'auto' })}
        onClick={onSubmit}
        disabled={Object.keys(formError).length > 0}
      >
        Save
      </Button>
    </div>
  );
}
