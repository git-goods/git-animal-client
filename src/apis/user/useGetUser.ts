import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import { get } from '..';

// {
//   "id": "1",
//   "username": "devxb",
//   "points": "491128",
//   "profileImage": "https://avatars.githubusercontent.com/u/62425964?v=4"
// }

export interface UserType {
  id: string;
  username: string;
  points: string;
  profileImage: string;
}

export const getUserByToken = async (token: string): Promise<UserType> =>
  get('/users', {
    headers: {
      Authorization: token,
    },
  });

export const useGetUser = (option?: UseQueryOptions<UserType>) =>
  useQuery<UserType>({
    queryKey: ['user'],
    queryFn: () => get('/users'),
    ...option,
  });
