import { Center } from '_panda/jsx';

import Button from '@/components/Button';
import Header from '@/components/Layout/Header2';
import Layout from '@/components/Layout/Layout';

function PreparePage() {
  return (
    <Layout>
      <Header />
      <Center>
        <h1>준비중입니다.</h1>
        <Button href="/">돌아가기</Button>
      </Center>
    </Layout>
  );
}

export default PreparePage;
