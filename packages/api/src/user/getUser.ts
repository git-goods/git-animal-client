import { z } from 'zod';
import { safeGet } from '../_instance/safe';

const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  points: z.string(),
  profileImage: z.string(),
});

export type UserResponse = z.infer<typeof UserSchema>;

export const getUser = async () => {
  return safeGet(UserSchema)(`/users`);
};

export const getUserByToken = async (token: string) => {
  const res = await safeGet(UserSchema)(`/users`, {
    headers: {
      Authorization: token,
    },
  });

  return res;
};
