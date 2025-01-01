import { ZodType, z } from 'zod';
import { del, get, patch, post, put } from './default';
import { CustomException } from '@gitanimals/exception/src/CustomException';
import { renderGet, renderDelete, renderPatch, renderPost, renderPut } from './render';

type Method = typeof get | typeof post | typeof put | typeof patch | typeof del;

const safeFactory =
  <A extends Parameters<Method>>(method: (...args: A) => ReturnType<Method>) =>
  <Z extends ZodType>(zodSchema: Z) =>
  async (...args: A): Promise<z.infer<Z>> => {
    const response = await method(...args);

    const parsed = zodSchema.safeParse(response);
    if (parsed.error) throw new CustomException('API_TYPE_NOT_MATCH');

    return response;
  };

export const safeGet = safeFactory(get);
export const safePost = safeFactory(post);
export const safePut = safeFactory(put);
export const safePatch = safeFactory(patch);
export const safeDel = safeFactory(del);

export const safeRenderGet = safeFactory(renderGet);
export const safeRenderPost = safeFactory(renderPost);
export const safeRenderPut = safeFactory(renderPut);
export const safeRenderPatch = safeFactory(renderPatch);
export const safeRenderDel = safeFactory(renderDelete);
