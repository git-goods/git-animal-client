import { Main, MainHeading } from '@/components/layout/Main';

import type { MetaFunction } from '@remix-run/node';
import { css } from '_panda/css';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <Main>
      <MainHeading>Home</MainHeading>
      <p className={css({ pt: '2' })}>Gitanimals Admin 페이지입니다. </p>
    </Main>
  );
}
