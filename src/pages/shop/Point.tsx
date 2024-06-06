import { useGetSuspenseUser } from '@/apis/user/useGetUser';
import { addNumberComma } from '@/utils/number';

function Point() {
  const { data } = useGetSuspenseUser();

  return <div>my points : {addNumberComma(data.points)}</div>;
}

export default Point;
