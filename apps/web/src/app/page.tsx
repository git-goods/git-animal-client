import AvailablePetSection from './landing/AvailablePetSection/AvailablePetSection';
import WelcomeSection from './landing/WelcomeSection';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <AvailablePetSection />
    </div>
  );
}
