import React from 'react';
import { css } from '_panda/css/css';
import { Button } from '@gitanimals/ui-panda';

function DevComponentPage() {
  return (
    <div className={containerStyle}>
      <Button size="s">s size Button</Button>
      <Button size="m">m size Button</Button>
      <Button size="l">l size Button</Button>
      <Button disabled>disabled size Button</Button>
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
