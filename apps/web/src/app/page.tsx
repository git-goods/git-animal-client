'use client';

import { css } from '_panda/css';

import Header from '@/components/Layout/Header';
import Layout from '@/components/Layout/Layout';

import LandingMainSlider from './landing/MainSlider';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <Layout>
      <Header />
      <main className={mainCss}>
        <LandingMainSlider />
      </main>
    </Layout>
  );
}

const mainCss = css({
  marginTop: '80px',
});
