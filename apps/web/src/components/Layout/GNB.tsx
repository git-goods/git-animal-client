import { DesktopGNB } from './DesktopGNB';
import { MobileGNB } from './MobileGNB';

async function GNB() {
  return (
    <>
      <MobileGNB />
      <DesktopGNB />
    </>
  );
}

export default GNB;
