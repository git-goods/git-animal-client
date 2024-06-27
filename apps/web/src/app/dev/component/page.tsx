import React from 'react';
import { css } from '_panda/css/css';
import { Button } from '@gitanimals/ui-panda';

function DevComponentPage() {
  return (
    <div className={containerStyle}>
      <Button size="s">Base Button</Button>
      <Button size="m">Base Button</Button>
      <Button size="l">Base Button</Button>
      <Button disabled>Base Button</Button>
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
