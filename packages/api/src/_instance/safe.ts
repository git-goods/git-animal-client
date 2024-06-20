import { ZodType, z } from 'zod';
import { del, get, patch, post, put } from './default';
import { CustomException } from '@gitanimals/exception';

export const safeGet =
  <Z extends ZodType>(zodSchema: Z) =>
  async (...args: Parameters<typeof get>): Promise<z.infer<Z>> => {
    const response = await get(...args);

    const parsed = zodSchema.safeParse(response);
    if (parsed.error) throw new CustomException('API_TYPE_NOT_MATCH');

    return response;
  };

// type Method = typeof get | typeof post | typeof put | typeof patch | typeof del;

// const safeFactory =
//   <M extends Method>(method: M) =>
//   <Z extends ZodType>(zodSchema: Z) =>
//   async (...args: Parameters<M>): Promise<z.infer<Z>> => {
//     const response = await method(...args);

//     const parsed = zodSchema.safeParse(response);
//     if (parsed.error) throw new CustomException('API_TYPE_NOT_MATCH');

//     return response;
//   };
