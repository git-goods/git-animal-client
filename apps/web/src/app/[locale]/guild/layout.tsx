import { css } from '_panda/css';

import GNB from '@/components/GNB/GNB';

export default function GuildLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <GNB />
      <div className={containerStyle}>{children}</div>
      {modal}
    </>
  );
}

const containerStyle = css({
  width: '100%',
  background: 'linear-gradient(180deg, #000 0%, #004875 38.51%, #005B93 52.46%, #006FB3 73.8%, #0187DB 100%)',
  minHeight: 'fit-content',
  height: 'calc(100vh - 60px)',
  overflow: 'hidden',
  position: 'relative',
  px: 5,

  _mobile: {
    minHeight: '100vh',
    height: '100%',
  },
});
