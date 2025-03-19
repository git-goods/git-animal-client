import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';
import { PWADetector } from '@/hooks/useDeviceInfo';

import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

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
      <GNB />
      <MainSection />
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <div className={css({ bg: 'black' })}>
        <Footer />
      </div>
      <PWADetector />
    </div>
  );
}
