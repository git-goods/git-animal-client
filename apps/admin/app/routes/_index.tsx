import { Main, MainHeading } from '@/components/layout/Main';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userToken } from '@/cookies.server';

import { ActionFunctionArgs, redirect, type MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { css } from '_panda/css';
import { Box } from '_panda/jsx';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'GitAnimals Admin' },
    { name: 'description', content: 'GitAnimals 관리를 위한 admin 페이지입니다. ' },
    {
      property: 'og:title',
      content: 'GitAnimals Admin',
    },
    {
      property: 'og:description',
      content: 'GitAnimals 관리를 위한 admin 페이지입니다. ',
    },
    {
      property: 'og:image',
      content: '/og-image.png',
    },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get('Cookie');

  return {};
}

export default function Index() {
  return (
    <Main>
      <MainHeading>Home</MainHeading>
      <p className={css({ pt: '2' })}>Gitanimals Admin 페이지입니다. </p>
    </Main>
  );
}

const ADMIN_TOKEN = 'gitanimals-admin-token';
