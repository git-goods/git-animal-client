import { useTranslations } from 'next-intl';

import Header from '@/components/Layout/Header_v2';

import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <Header />
      <MainSection />
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <Footer />
    </div>
  );
}
