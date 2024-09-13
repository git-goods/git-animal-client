import Image from 'next/image';
import { css } from '_panda/css';

function Loading() {
  return (
    <div className={loadingWrapperStyle}>
      <Image src="/icon/loading.svg" width={100} height={100} alt="loading" />
    </div>
  );
}

export default Loading;

const loadingWrapperStyle = css({
  position: 'absolute',
  top: '-4px',
  borderRadius: '16px',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
