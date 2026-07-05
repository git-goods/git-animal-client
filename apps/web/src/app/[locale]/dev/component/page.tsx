'use client';

import { Select } from '@gitanimals/ui-tailwind';

function DevComponentPage() {
  return (
    <div className={containerStyle}>
      <Select>
        <Select.Trigger className="w-[180px]">
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

const containerStyle = 'bg-[#2C2929] p-[24px] h-[100vh] flex flex-col items-start gap-[16px]';
