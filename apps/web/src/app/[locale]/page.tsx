import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { RankingSection } from './landing/RankingSection/RankingSection';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page');

  return {
    title: t('main'),
  };
}

export default function HomePage() {
  return (
    <div>
      <RankingSection />
      {/* <GNB />
      <MainSection />
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <div className={css({ bg: 'black' })}>
        <Footer />
      </div>
      <PWADetector /> */}
    </div>
  );
}
