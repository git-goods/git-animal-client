import { MediaQuery } from '../MediaQuery';

import { DesktopGNB } from './DesktopGNB';
import { MobileGNB } from './MobileGNB';

async function GNB() {
  return <MediaQuery mobile={<MobileGNB />} desktop={<DesktopGNB />} />;
}

export default GNB;
