import Header from '@/components/Header';
import Layout from '@/components/Layout';

import Welcome from './Welcome';

export default function Home() {
  return (
    <Layout>
      <Header />
      <Welcome />
    </Layout>
  );
}
