'use client';

import { Select } from '@gitanimals/ui-tailwind';

function DevComponentPage() {
  return (
    <div className="bg-[#2C2929] p-6 h-screen flex flex-col items-start gap-4">
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
