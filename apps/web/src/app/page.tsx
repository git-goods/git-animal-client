'use client';

import type { Metadata } from 'next';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import Welcome from './Welcome';

export const metadata: Metadata = {
  title: 'GitAnimals | Home',
};

export default function Home() {
  return (
    <Layout>
      <Header />
      <Welcome />
    </Layout>
  );
}
