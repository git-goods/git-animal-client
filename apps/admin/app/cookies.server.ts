import { createCookie } from '@remix-run/node'; // or cloudflare/deno

export const userToken = createCookie('user-token', {
  maxAge: 604_800, // one week
});
