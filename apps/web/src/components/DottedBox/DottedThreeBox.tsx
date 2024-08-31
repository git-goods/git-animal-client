import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';

import type { DottedBoxProps } from './DottedBox';

function DottedThreeBox({ width, height, children, ...props }: PropsWithChildren<DottedBoxProps>) {
  return (
    <div
      className={containerStyle}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <DottedThreeBoxBg width={width} height={height} {...props} />
      {children}
    </div>
  );
}

export default DottedThreeBox;

function DottedThreeBoxBg({ width, height, bgColor }: DottedBoxProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="4" y="8" width={width - 8} height={height - 16} fill={bgColor} />
      <rect x="8" y="4" width={width - 16} height={height - 8} fill={bgColor} />
      <rect x={width - 12} y="4" width="4" height="4" fill="#141414" />
      <rect x={width - 8} y="8" width="4" height="4" fill="#141414" />
      <rect x={width - 12} y={height - 8} width="4" height="4" fill="#141414" />
      <rect x={width - 8} y={height - 12} width="4" height="4" fill="#141414" />
      <rect x={width - 4} y="12" width="4" height={height - 24} fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 12 4)" fill="#141414" />
      <rect width="4" height="4" transform="matrix(-1 0 0 1 8 8)" fill="#141414" />
      <rect width="4" height="4" transform={`matrix(-1 0 0 1 12 ${height - 8})`} fill="#141414" />
      <rect width="4" height="4" transform={`matrix(-1 0 0 1 8 ${height - 12})`} fill="#141414" />
      <rect width="4" height={height - 24} transform="matrix(-1 0 0 1 4 12)" fill="#141414" />
      <rect x="12" width={width - 24} height="4" fill="#141414" />
      <rect x="12" y={height - 4} width={width - 24} height="4" fill="#141414" />
    </svg>
  );
}

const containerStyle = css({
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
  backgroundColor: 'transparent',
  boxSizing: 'border-box',
  padding: '8px',
  zIndex: 0,

  '& > svg': {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
});
