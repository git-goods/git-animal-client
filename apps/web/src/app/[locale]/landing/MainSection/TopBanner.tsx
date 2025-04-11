import Image from 'next/image';
import { css } from '_panda/css';

export default function TopBanner() {
  return (
    <div className={containerStyle}>
      <p style={textStyle}>Last Week 1ST sumi-0011</p>
      <Image className={coinStyle} width={32} height={32} src="/shop/coin.webp" alt="coin" />
      <p style={textStyle}>10000P!</p>
    </div>
  );
}

const containerStyle = css({
  background: 'white.white_25',
  color: 'white.white_100',
  padding: '12px 20px',
  borderRadius: '8px',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  width: '100%',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  textAlign: 'center',
  fontFeatureSettings: 'liga off, clig off',
  fontFamily: 'token(fonts.dosgothic)',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '120%',
  letterSpacing: '-0.3px',
});

const textStyle = {
  background: 'linear-gradient(116deg, #FFFA8E 31.98%, #62FFE3 98.75%)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
};

const coinStyle = css({
  width: '32px',
  height: '32px',
  ml: '10px',
  mr: '8px',
});
