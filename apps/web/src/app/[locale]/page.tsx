import GNB from '@/components/Layout/GNB';

import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function HomePage() {
  return (
    <div>
      <GNB />
      <MainSection />
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <Footer />
    </div>
  );
}
