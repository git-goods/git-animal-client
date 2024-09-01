import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import { Links, Meta, Outlet, Scripts, ScrollRestoration, redirect, useLoaderData } from '@remix-run/react';

import styles from './index.css?url';
import { Header } from './components/layout/Header';
import QueryClientProvider from './QueryClientProvider';
import { userToken } from './cookies.server';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  if (request.url.includes('/auth-main')) {
    return { noHeader: true };
  }

  if (request.url.includes('/auth')) {
    return null;
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userToken.parse(cookieHeader)) || {};

  if (!cookie.token) {
    return redirect('/auth-main');
  }

  return null;
};
export default function App() {
  const isAuthMain = useLoaderData<typeof loader>()?.noHeader;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider>
          {!isAuthMain && <Header />}
          <Outlet />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}
