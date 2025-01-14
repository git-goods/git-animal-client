import type { JoinGuildRequest } from '@gitanimals/api';
import { joinGuild, updateGuild } from '@gitanimals/api';

interface FormState {
  message: string;
}
export async function joinGuildAction(request: JoinGuildRequest) {
  try {
    console.log('request: ', request);
    const res = await joinGuild(request);
    console.log('res: ', res);
    return res;
  } catch (error) {
    console.log('error: ', error);
    throw error;
  }
}

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
