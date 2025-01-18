'use client';

/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { guildQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

import { GuildInfoFormClient } from '../[id]/setting/GuidlInfoFormClient';

export interface GuildCreateFormProps {
  formData: {
    title: string;
    body: string;
    guildIcon: string;
    farmType: string;
    autoJoin: boolean;
  };
  onDataChange: (key: string, value: string | boolean) => void;
  error: Record<string, string>;
  setError: (error: Record<string, string>) => void;
}

export function GuildCreateForm({ formData, onDataChange, error, setError }: GuildCreateFormProps) {
  const { data: icons } = useQuery(guildQueries.getGuildIconsOptions());
  const { data: backgrounds } = useQuery(guildQueries.getGuildBackgroundsOptions());

  useEffect(() => {
    if (icons && icons.length > 0 && !formData.guildIcon) {
      onDataChange('guildIcon', icons[0]);
    }
    if (backgrounds && backgrounds.length > 0 && !formData.farmType) {
      onDataChange('farmType', backgrounds[0]);
    }
  }, [icons, backgrounds]);

  if (!icons || !backgrounds) return null;

  return (
    <GuildInfoFormClient
      icons={icons}
      backgrounds={backgrounds}
      onFieldChange={onDataChange}
      fields={formData}
      formError={error}
      setFormError={setError}
    />
  );
}
