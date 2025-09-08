import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

/**
 * @deprecated use useSuspenseQuery instead
 */
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
