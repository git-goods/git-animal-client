import type { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, res: NextResponse) {
  const accessToken = req.headers.get('authorization');
  console.log('req.headers: ', req.headers);
  console.log('accessToken: ', accessToken);

  // const session = await getServerSession(authOptions);

  // console.log('session: ', session);

  return new Response(null, { status: 200 });
  // console.log('req: ', req);
  // // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
  // // const token = await getToken({ req })
  // try {
  //   const token = await getToken({ req, secret, raw: true });
  //   console.log('JSON Web Token', token);
  //   // res.end();

  //   return new Response(token);
  // } catch (error) {
  //   console.error(error);
  //   return new Response('Error', { status: 500 });
  // }
}
