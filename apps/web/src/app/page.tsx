import { AvailablePetSection, HavePetWaySection, MainSection } from './landing';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <MainSection />
      <AvailablePetSection />
      <HavePetWaySection />
    </div>
  );
}
