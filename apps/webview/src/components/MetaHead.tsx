import Head from 'next/head';

interface MetaHeadProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const MetaHead = ({
  title = 'GitAnimals',
  description = '깃허브 활동으로 펫을 키우세요!',
  url = 'https://www.gitanimals.org/',
  image = '/og-image.png',
}: MetaHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:article:author" content="sumi-0011" />
    </Head>
  );
};

export default MetaHead;
