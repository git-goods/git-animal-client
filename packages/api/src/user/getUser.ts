import { z } from 'zod';
import { CustomException } from '@gitanimals/exception';
import { get } from '../_instance';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  points: z.string(),
  profileImage: z.string(),
});

type User = z.infer<typeof UserSchema>;

export const getUser = async () => {
  const res = await get<User>(`/users`);

  const parsed = UserSchema.safeParse(res);
  if (parsed.error) throw new CustomException('API_TYPE_NOT_MATCH');

  return res;
};
