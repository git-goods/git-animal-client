import { MediaQuery } from '../MediaQuery';

import { DesktopGNB } from './DesktopGNB';
import { MobileGNB } from './MobileGNB';

async function GNB({ mobileHideAtTop = false }: { mobileHideAtTop?: boolean }) {
  return <MediaQuery mobile={<MobileGNB hideAtTop={mobileHideAtTop} />} desktop={<DesktopGNB />} />;
}

export default GNB;
