import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
  const { data } = useQuery({ ...userQueries.userOptions() });

  return (
    data || {
      id: '',
      username: '',
      points: 0,
      profileImage: '',
    }
  );
};
