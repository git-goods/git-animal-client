import Image from 'next/image';
import { css } from '_panda/css';

export default function GuildPage() {
  return (
    <div>
      <Image src="/guild/init-bg-bottom.png" className={bottomBgStyle} alt="init-bg-bottom" width={3600} height={228} />
    </div>
  );
}

const bottomBgStyle = css({
  position: 'absolute',
  width: '100vw',
  bottom: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  height: '228px',
  objectFit: 'cover',
});
