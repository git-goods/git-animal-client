import AvailablePetSection from './landing/AvailablePetSection/AvailablePetSection';
import { MainSection } from './landing/MainSection';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <MainSection />
      <AvailablePetSection />
    </div>
  );
}
