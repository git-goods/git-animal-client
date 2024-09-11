import type { HtmlHTMLAttributes } from 'react';
import { css } from '_panda/css';

interface Props extends HtmlHTMLAttributes<HTMLButtonElement> {
  color: string;
}

function SmallButton({ children, color, ...props }: Props) {
  return (
    <button className={buttonStyle} {...props}>
      <ButtonBackground color={color} />
      <span>{children}</span>
    </button>
  );
}

export default SmallButton;

const buttonStyle = css({
  width: '103px',
  height: '36px',

  color: '#000',
  textAlign: 'center',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '140%' /* 22.4px */,

  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& span': {
    zIndex: 1,
    position: 'relative',
  },
  '& .button-background': {
    position: 'absolute',
    zIndex: 0,
  },
});

const ButtonBackground = ({ color }: { color: string }) => (
  <svg
    className="button-background"
    width="103"
    height="36"
    viewBox="0 0 103 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="91" width="4" height="4" fill="#141414" />
    <rect x="8" width="87" height="4" fill="#141414" />
    <rect x="8" y="32" width="87" height="4" fill="#141414" />
    <rect x="91" y="32" width="4" height="4" fill="#141414" />
    <rect x="99" y="8" width="4" height="20" fill="#141414" />
    <rect y="8" width="4" height="20" fill="#141414" />
    <rect x="4" y="4" width="95" height="28" fill={color} />
    <rect x="4" y="4" width="4" height="4" fill="#141414" />
    <rect x="4" y="28" width="4" height="4" fill="#141414" />
    <rect x="95" y="4" width="4" height="4" fill="#141414" />
    <rect x="95" y="28" width="4" height="4" fill="#141414" />
  </svg>
);
