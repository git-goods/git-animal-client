import type { NextRequest } from 'next/server';
import { getUserByToken } from '@gitanimals/api';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get('token');

  if (!token) {
    return new Response(null, { status: 400 });
  }

  try {
    await getUserByToken(`Bearer ${token}`);

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(null, { status: 401 });
  }
}
