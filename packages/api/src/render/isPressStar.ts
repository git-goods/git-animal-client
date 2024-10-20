import { safeRenderGet } from '../_instance/safe';
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
  return safeRenderGet(IsPressStarResponseSchema)(`stargazers/${login}/press`);
};
