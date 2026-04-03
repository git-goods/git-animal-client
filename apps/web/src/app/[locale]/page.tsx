import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { ErrorBoundary } from '@suspensive/react';

import { ErrorSection } from '@/components/Error/ErrorSection';
import GNB from '@/widgets/gnb/GNB';

import { SpringContent } from './landing/(spring)';
import {
  AvailablePetSection,
  ChoosePetSection,
  Footer,
  HavePetWaySection,
  RankingServerSide,
} from './landing';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('main'),
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const t = await getTranslations('Error');

  return (
    <>
      <GNB />
      <main>
        <SpringContent />
        <ErrorBoundary
          fallback={<ErrorSection title={t('ranking-error-title')} description={t('ranking-error-description')} />}
        >
          <RankingServerSide searchParams={searchParams} />
        </ErrorBoundary>
        <AvailablePetSection />
        <HavePetWaySection />
        <ChoosePetSection />
      </main>
      <Footer />
    </>
  );
}
