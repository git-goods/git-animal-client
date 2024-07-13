import { css } from '_panda/css';
import React, { PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren<{}>) {
  return <div className={containerStyle}>{children}</div>;
}

export default Main;

const containerStyle = css({
  p: 8,
});
