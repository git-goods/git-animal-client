import type { PropsWithChildren } from 'react';
import { css } from '_panda/css';

import type { DottedBoxProps } from './DottedBox';

function DottedDoubleBox({ width, height, children, ...props }: PropsWithChildren<DottedBoxProps>) {
  return (
    <div
      className={containerStyle}
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <DottedDoubleBoxBg width={width} height={height} {...props} />
      {children}
    </div>
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

function DottedDoubleBoxBg({ width, height, bgColor }: DottedBoxProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x={width - 12} width="4" height="4" fill="#141414" />
      <rect x="8" width={width - 16} height="4" fill="#141414" />
      <rect x="8" y={height - 4} width={width - 16} height="4" fill="#141414" />
      <rect x={width - 12} y={height - 4} width="4" height="4" fill="#141414" />
      <rect x={width - 4} y="8" width="4" height={height - 16} fill="#141414" />
      <rect y="8" width="4" height={height - 16} fill="#141414" />
      <rect x="4" y="4" width={width - 8} height={height - 8} fill={bgColor ?? 'transparent'} />
      <rect x="4" y="4" width="4" height="4" fill="#141414" />
      <rect x="4" y={height - 8} width="4" height="4" fill="#141414" />
      <rect x={width - 8} y="4" width="4" height="4" fill="#141414" />
      <rect x={width - 8} y={height - 8} width="4" height="4" fill="#141414" />
    </svg>
  );
}

export default DottedDoubleBox;
