import Image from 'next/image';
import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

export default function GuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className={containerStyle}>
        {children}

        <Image src="/guild/init-bg-bottom.png" className="bg-bottom" alt="init-bg-bottom" width={3600} height={228} />
      </div>
    </>
  );
}

const containerStyle = css({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',
  minHeight: 'calc(100vh - 60px)',
  overflow: 'hidden',
  position: 'relative',

  '& .bg-bottom': {
    position: 'absolute',
    width: '100vw',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: '228px',
    objectFit: 'cover',
  },
  _mobile: {
    minHeight: '100vh ',
  },
});
