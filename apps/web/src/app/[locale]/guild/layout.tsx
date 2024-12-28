import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

export default function GuildLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className={containerStyle}>{children}</div>
    </>
  );
}

const containerStyle = css({
  width: '100%',
  background: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',
  minHeight: 'calc(100vh - 60px)',
  height: 'calc(100vh - 60px)',
  overflow: 'hidden',
  position: 'relative',

  _mobile: {
    minHeight: '100vh ',
  },
});
