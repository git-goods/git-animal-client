'use client';
import { useState } from 'react';
import { createGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/routing';

import { SelectPersonaList } from '../../_components/SelectPersonaList';

import { GuildCreateForm } from './GuildCreateForm';

export default function GuildCreate() {
  const router = useRouter();

  const [step, setStep] = useState<'guild-info' | 'guild-persona'>('guild-info');
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    guildIcon: '',
    farmType: '',
    autoJoin: false,
  });
  const [error, setError] = useState<{ all?: string; title?: string }>({});
  const [selectPersona, setSelectPersona] = useState('');

  const onChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isValid = Object.values(formData).every((value) => value !== '');

  const onSubmit = async () => {
    try {
      const res = await createGuild({
        title: formData.title,
        body: formData.body,
        guildIcon: formData.guildIcon,
        autoJoin: formData.autoJoin,
        farmType: formData.farmType,
        personaId: selectPersona,
      });
      router.push(`/guild/${res.id}`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const isFirstStepValid = !isValid || Object.values(error).some((value) => value !== '');

  return (
    <>
      {step === 'guild-info' && (
        <>
          <GuildCreateForm formData={formData} onDataChange={onChange} error={error} setError={setError} />
          <Button mx="auto" disabled={isFirstStepValid} onClick={() => setStep('guild-persona')}>
            Create / 100,000P
          </Button>
        </>
      )}
      {step === 'guild-persona' && (
        <>
          <SelectPersonaList
            selectPersona={selectPersona ? [selectPersona] : []}
            onSelectPersona={(persona) => setSelectPersona(persona.id)}
          />
          <Button mx="auto" disabled={!selectPersona} onClick={onSubmit}>
            Done
          </Button>
        </>
      )}
    </>
  );
}
