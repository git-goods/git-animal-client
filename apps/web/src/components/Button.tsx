'use client';

import type { ComponentProps } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

type ButtonColorType = 'primary' | 'secondary';

const COLOR_OBJ: Record<
  ButtonColorType,
  {
    bg: string;
    inner: string;
    outline: string;
  }
> = {
  primary: {
    bg: '#ffa109',
    inner: '#F49400',
    outline: '#141414',
  },
  secondary: {
    bg: '#F7F7F7',
    inner: '#EBEBEB',
    outline: '#141414',
  },
};

interface ButtonProps extends ComponentProps<'button'> {
  color?: ButtonColorType;
  href?: string;
}

function Button({ href, color = 'primary', ...props }: ButtonProps) {
  if (href) {
    return (
      <Link href={href}>
        <ButtonStyled {...props} className={'button ' + props.className}>
          <Bg className="bg" color={COLOR_OBJ[color].bg} />
          <BlackOutline />
          <InnerSvg color={COLOR_OBJ[color].inner} />
          <span>{props.children}</span>
        </ButtonStyled>
      </Link>
    );
  }

  return (
    <ButtonStyled {...props} className={'button ' + props.className}>
      <Bg className="bg" color={COLOR_OBJ[color].bg} />
      <BlackOutline />
      <InnerSvg color={COLOR_OBJ[color].inner} />
      <span>{props.children}</span>
    </ButtonStyled>
  );
}

export default Button;

const Bg = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  margin: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  z-index: 0;
`;

const ButtonStyled = styled.button`
  width: 286px;
  border: none;
  position: relative;
  height: 80px;
  color: #000;

  text-align: center;
  font-size: 33px;
  font-weight: 400;
  line-height: 140%; /* 46.209px */
  letter-spacing: -0.413px;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  span {
    z-index: 2;
    position: relative;
  }

  &:disabled {
    // 밝기 어둡게
    filter: brightness(0.7);
    cursor: not-allowed;
  }
`;

const BlackOutline = () => (
  <div className="bg">
    <svg width="286" height="80" viewBox="0 0 286 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M274 0H12V4H8V8H4V12H0V68H4V72H8V76H12V80H274V76H278V72H282V68H286V12H282V8H278V4H274V0ZM274 4V8H278V12H282V68H278V72H274V76H12V72H8V68H4V12H8V8H12V4H274Z"
        fill="#141414"
      />
    </svg>
  </div>
);

const InnerSvg = ({ color }: { color: string }) => (
  <div className="bg" style={{ padding: '4px' }}>
    <svg width="278" height="72" viewBox="0 0 278 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M270 0H8V4H4V8H0V64H4V68H8V72H270V68H274V64H278V8H274V4L270 4V0ZM262 12H16V16H12V56H16V60H262V56H266V16H262V12Z"
        fill={color ?? '#EBEBEB'}
      />
    </svg>
  </div>
);
