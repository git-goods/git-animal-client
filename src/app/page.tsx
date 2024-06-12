'use client';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';
import Welcome from '@/pages/Welcome';

export default function Home() {
  return (
    <Layout>
      <Header />
      <Welcome />
    </Layout>
  );
}
