import React from 'react';
import { css } from '_panda/css/css';
import { Button } from '@gitanimals/ui-panda';

function DevComponentPage() {
  return (
    <div className={containerStyle}>
      <Button size="s">S size Button</Button>
      <Button size="m">M size Button</Button>
      <Button size="l">L size Button</Button>
      <Button disabled>disabled Button</Button>
      <Button floating>floating Button</Button>
    </div>
  );
}

export default DevComponentPage;

const containerStyle = css({
  backgroundColor: '#f0f0f0',
  padding: '24px',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
});
