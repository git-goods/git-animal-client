import dynamic from 'next/dynamic';

const LazyLoginProgress = dynamic(() => import('./LoginProgress'), { ssr: false });

function DevLocalLoginPage({ searchParams }: { searchParams: URLSearchParams }) {
  console.log('searchParams: ', searchParams);
  return (
    <>
      <LazyLoginProgress />
    </>
  );
}

export default DevLocalLoginPage;
