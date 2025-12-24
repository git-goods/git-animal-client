import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';
import { ErrorBoundary } from '@suspensive/react';

import { ErrorSection } from '@/components/Error/ErrorSection';
import GNB from '@/components/GNB/GNB';

import { ChristmasContent } from './landing/(christmas)';
import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { RankingServerSide } from './landing/RankingSection/RankingServerSide';
import { AvailablePetSection, HavePetWaySection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('main'),
  };
}

export default function HomePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  return (
    <div>
      <GNB />
      <ChristmasContent />
      {/* <MainSection /> */}
      <ErrorBoundary
        fallback={<ErrorSection title="랭킹 정보를 불러올 수 없습니다" description="잠시 후 다시 시도해주세요" />}
      >
        <RankingServerSide searchParams={searchParams} />
      </ErrorBoundary>
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <div className={css({ bg: 'black' })}>
        <Footer />
      </div>
    </div>
  );
}
