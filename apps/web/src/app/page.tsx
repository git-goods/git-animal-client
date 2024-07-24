import { ChoosePetSection } from './landing/ChoosePetSection';
import { Footer } from './landing/Footer';
import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <MainSection />
      {/* image error로 인해 잠시 주석 처리 @hyesungoh */}
      <AvailablePetSection />
      <HavePetWaySection />
      <ChoosePetSection />
      <Footer />
    </div>
  );
}
