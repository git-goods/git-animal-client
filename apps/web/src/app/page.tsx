import AvailablePetSection from './landing/AvailablePetSection/AvailablePetSection';
import { Footer } from './landing/Footer';
import WelcomeSection from './landing/WelcomeSection';

import '@egjs/react-flicking/dist/flicking.css';
import '@egjs/react-flicking/dist/flicking-inline.css';

export default function Home() {
  return (
    <div>
      <WelcomeSection />
      <AvailablePetSection />
      <Footer />
    </div>
  );
}
