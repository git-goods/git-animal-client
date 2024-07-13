import { Header } from '@/components/layout/Header';
import { Main, MainHeading } from '@/components/layout/Main';
import { Badge } from '@/components/ui/badge';

import type { MetaFunction } from '@remix-run/node';
import { css } from '_panda/css';

export const meta: MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div>
      <Header />
      <Main>
        <MainHeading>Hello</MainHeading>
      </Main>
    </div>
  );
}
