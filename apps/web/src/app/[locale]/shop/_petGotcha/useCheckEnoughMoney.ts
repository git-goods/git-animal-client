import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

export const useCheckEnoughMoney = ({ enoughPoint }: { enoughPoint: number }) => {
  const { data: userData } = useQuery(userQueries.userOptions());

  const checkEnoughMoney = () => {
    return userData?.points && Number(userData.points) >= enoughPoint;
  };

  return { checkEnoughMoney };
};
