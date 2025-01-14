'use client';
import { useState } from 'react';
import { createGuild } from '@gitanimals/api';
import { Button } from '@gitanimals/ui-panda';

import { useRouter } from '@/i18n/routing';

import { SelectPersonaList } from '../../_components/SelectPersonaList';

import { GuildCreateForm } from './GuildCreateForm';

export default function GuildCreate() {
  const router = useRouter();

  const [step, setStep] = useState<'guild-info' | 'guild-persona'>('guild-info');
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    icon: '',
    background: '',
  });
  const [selectPersona, setSelectPersona] = useState('');

  const onChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const isValid = Object.values(formData).every((value) => value !== '');

  const onSubmit = async () => {
    try {
      const res = await createGuild({
        title: formData.title,
        body: formData.body,
        guildIcon: formData.icon,
        autoJoin: false,
        farmType: formData.background,
        personaId: selectPersona,
      });
      router.push(`/guild/${res.id}`);
    } catch (error) {}
  };

  return (
    <>
      {step === 'guild-info' && (
        <>
          <GuildCreateForm formData={formData} onDataChange={onChange} />
          <Button mx="auto" disabled={!isValid} onClick={() => setStep('guild-persona')}>
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
