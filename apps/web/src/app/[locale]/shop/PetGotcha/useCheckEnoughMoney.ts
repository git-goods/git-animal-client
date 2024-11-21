import { userQueries } from '@gitanimals/react-query';
import { useQuery } from '@tanstack/react-query';

const TEN_PET_POINT = 10000;
const ONE_PET_POINT = 1000;

type CheckType = 'ten-pet-gotcha' | 'one-pet-gotcha';

export const useCheckEnoughMoney = (type: CheckType) => {
  const { data: userData } = useQuery(userQueries.userOptions());

  const checkEnoughMoney = () => {
    const point = type === 'ten-pet-gotcha' ? TEN_PET_POINT : ONE_PET_POINT;
    return userData?.points && Number(userData.points) >= point;
  };

  return { checkEnoughMoney };
};
