import { z } from 'zod';
import { safeGet } from '../_instance/safe';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  points: z.string(),
  profileImage: z.string(),
});

export const getUser = async () => {
  const res = await safeGet(UserSchema)(`/users`);

  return res;
};
