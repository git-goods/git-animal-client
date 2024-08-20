import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, res: any) {
  // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // const token = await getToken({ req })
  console.log('secret: ', secret);
  const token = await getToken({ req, secret });
  console.log('JSON Web Token', token);
  res.end();
}
