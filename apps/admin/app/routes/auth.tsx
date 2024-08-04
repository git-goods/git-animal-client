import { userToken } from '@/cookies.server';
import { LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export let loader: LoaderFunction = async ({ request }) => {
  const query = new URL(request.url).searchParams;

  const authToken = query.get('jwt');

  if (authToken) {
    const cookieHeader = request.headers.get('Cookie');
    const cookie = (await userToken.parse(cookieHeader)) || {};

    cookie.token = authToken.split(' ')[1];

    return redirect('/', {
      headers: {
        'Set-Cookie': await userToken.serialize(cookie),
      },
    });
  }

  const res = await fetch('https://api.gitanimals.org/logins/oauth/github', {
    headers: {
      'Redirect-When-Success': process.env.NODE_ENV === 'production' ? 'ADMIN' : 'LOCAL_ADMIN',
    },
  });

  return redirect(res.url);
};

function AuthPage() {
  useLoaderData<typeof loader>();

  return <div></div>;
}

export default AuthPage;
