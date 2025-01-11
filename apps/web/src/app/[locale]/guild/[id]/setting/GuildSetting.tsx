'use client';

import { useFormState } from 'react-dom';
import type { Guild } from '@gitanimals/api';

import { useRouter } from '@/i18n/routing';
import { updateGuildAction } from '@/serverActions/guild';

import { GuildInfoFormClient, GuildInfoFormSubmitButton } from '../../_components/GuidlInfoFormClient';

export interface FormState {
  message: string;
}

const initialState: FormState = {
  message: '',
};

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

  const [state, formAction] = useFormState(async (prevState: FormState, formData: FormData) => {
    const result = await updateGuildAction(prevState, formData);

    if (result.success) {
      router.push(`/guild/${guildId}`);
    }

    return result;
  }, initialState);

  return (
    <form action={formAction}>
      <input type="text" name="guildId" value={guildId} hidden />
      <GuildInfoFormClient icons={icons} backgrounds={backgrounds} initialData={initialData} />
      {state?.message && <p aria-live="polite">{state?.message}</p>}
      <GuildInfoFormSubmitButton>Save</GuildInfoFormSubmitButton>
    </form>
  );
}
