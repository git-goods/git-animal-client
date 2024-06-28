'use client';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import LandingMainSlider from './landing/MainSlider';

export default function Home() {
  return (
    <Layout>
      <Header />
      {/* <Welcome /> */}
      <LandingMainSlider />
    </Layout>
  );
}
