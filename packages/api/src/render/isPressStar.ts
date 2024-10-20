import { safeGet } from '../_instance/safe';
import { z } from 'zod';
interface IsPressStarRequest {
  /**
   * @description github id
   */
  login: string;
}

const IsPressStarResponseSchema = z.object({
  isPressStar: z.boolean(),
});

export const isPressStar = ({ login }: IsPressStarRequest) => {
  return safeGet(IsPressStarResponseSchema)(`stargazers/${login}/press`);
};
