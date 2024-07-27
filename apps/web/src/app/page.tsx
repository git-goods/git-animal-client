'use client';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import CheckTime from './CheckTime';
import Welcome from './Welcome';

export default function Home() {
  return (
    <Layout>
      <CheckTime />
      <Header />
      <Welcome />
    </Layout>
  );
}
