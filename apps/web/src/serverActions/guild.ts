'use server';

import type { JoinGuildRequest } from '@gitanimals/api';
import { joinGuild, updateGuild } from '@gitanimals/api';

import type { FormState } from '@/app/[locale]/guild/(components)/GuidlInfoFormClient';

export async function joinGuildAction(request: JoinGuildRequest) {
  return joinGuild(request);
}

// NOTE: 작업 중
export const createGuildAction = async (prevState: FormState, formData: FormData) => {
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const icon = formData.get('icon') as string;
  const background = formData.get('background') as string;

  if (!name || !description || !icon || !background) {
    return { message: 'Please fill in all fields', success: false };
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  console.log('form end');
  return { message: 'Guild created', success: true };
};

export const updateGuildAction = async (prevState: FormState, formData: FormData) => {
  const guildId = formData.get('guildId') as string;
  const title = formData.get('name') as string;
  const body = formData.get('description') as string;
  const farmType = formData.get('background') as string;
  const guildIcon = formData.get('icon') as string;

  if (!title || !body || !farmType || !guildIcon) {
    return { message: 'Please fill in all fields', success: false };
  }

  try {
    await updateGuild(guildId, {
      title,
      body,
      farmType,
      guildIcon,
      autoJoin: true,
    });

    // redirect(`/guild/${guildId}`);
    return { message: 'Guild updated', success: true };
  } catch (error) {
    console.log('error: ', error);
    console.log('error: ', (error as Error).message);
    return { message: 'Failed to update guild', success: false };
  }
};
