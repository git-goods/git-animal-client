'use client';

import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

function UserPoint() {
  const { data } = useGetSuspenseUser();
  return <>{addNumberComma(data.points)}</>;
}

export default UserPoint;
