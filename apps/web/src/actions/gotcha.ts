'use server';

import { postGotcha } from '@gitanimals/api';

export async function onePetGotcha() {
  return postGotcha({ count: 1 });
}
