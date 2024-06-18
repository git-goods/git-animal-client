'use client';

import { css } from '_panda/css';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import Welcome from './Welcome';

export default function Home() {
  return (
    <Layout>
      <h1 className={css({ fontSize: '2xl' })}>asdffff</h1>
      <Header />
      <Welcome />
    </Layout>
  );
}
