'use client';

import { css } from '_panda/css';
import { Select } from '@gitanimals/ui-panda';

function DevComponentPage() {
  return (
    <div className={containerStyle}>
      <Select>
        <Select.Trigger w="180px">
          <Select.Value placeholder="Theme" />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="light">Light</Select.Item>
          <Select.Item value="dark">Dark</Select.Item>
          <Select.Item value="system">System</Select.Item>
        </Select.Content>
      </Select>
    </div>
  );
}

export default DevComponentPage;

const containerStyle = css({
  backgroundColor: '#2C2929',
  padding: '24px',
  height: '100vh',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
});
