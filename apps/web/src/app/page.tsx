import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <MainSection />
      {/* <AvailablePetSection /> */}
      <HavePetWaySection />
      <ChoosePetSection />
      <Footer />
    </div>
  );
}
