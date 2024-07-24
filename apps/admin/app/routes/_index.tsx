import { Main, MainHeading } from '@/components/layout/Main';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { userToken } from '@/cookies.server';

import { ActionFunctionArgs, redirect, type MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
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
  const cookie = (await userToken.parse(cookieHeader)) || {};
  const bodyParams = await request.formData();

  const token = bodyParams.get('token') as string;
  if (token) {
    cookie.token = token;
  }

  return redirect('/', {
    headers: {
      'Set-Cookie': await userToken.serialize(cookie),
    },
  });
}

export default function Index() {
  return (
    <Main>
      <MainHeading>Home</MainHeading>
      <p className={css({ pt: '2' })}>Gitanimals Admin 페이지입니다. </p>
      <Login />
    </Main>
  );
}

const ADMIN_TOKEN = 'gitanimals-admin-token';

function Login() {
  const [value, setValue] = useState('');

  const onSubmit = () => {
    console.log('value: ', value);
    window.localStorage && window.localStorage.setItem(ADMIN_TOKEN, value);
  };

  return (
    <Box mt={8}>
      <p>token을 입력해주세요</p>
      <Form method="post">
        <Input type="text" name="token" my={4} onChange={(e) => setValue(e.target.value)} />
        <Button type="submit" onClick={() => onSubmit()}>
          Submit
        </Button>
      </Form>
    </Box>
  );
}
