import Image from 'next/image';
import { css } from '_panda/css';

export default function GuildLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  return (
    <>
      <div className={bottomBgStyle}>
        <Image src="/guild/guild-bg-bottom.webp" className="bg-bottom" alt="bg-bottom" width={3600} height={228} />
        <Image
          src="/guild/guild-bg-bottom-house.webp"
          className="bg-bottom-house"
          alt="bg-bottom"
          width={257}
          height={202}
        />
      </div>
      <div className={containerStyle}>{children}</div>
      {modal}
    </>
  );
}

const containerStyle = css({
  position: 'relative',
  width: '100%',
  maxW: '880px',
  m: 'auto',
  minH: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  paddingY: '120px',
  _mobile: {
    paddingY: '0',
    height: 'calc(100vh - var(--mobile-header-height))',
  },
});

const bottomBgStyle = css({
  position: 'absolute',
  width: '100vw',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',

  '& .bg-bottom': {
    height: '228px',
    objectFit: 'cover',
  },
  '& .bg-bottom-house': {
    position: 'absolute',
    bottom: '32px',
    right: '62px',
    height: '202px',
    width: 'auto',
    objectFit: 'contain',
  },
});
