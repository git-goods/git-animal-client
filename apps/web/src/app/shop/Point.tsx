import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

export function Point() {
  const { data } = useGetSuspenseUser();

  return <div>my points : {addNumberComma(data.points)}</div>;
}
