import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialogV2 } from './alert-dialog-v2';

const meta: Meta<typeof AlertDialogV2> = {
  title: 'UI/AlertDialogV2',
  component: AlertDialogV2,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeText: { control: 'text' },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'full'] },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Notice',
    description: 'Your pet has leveled up!',
    closeText: 'OK',
  },
};

export const ErrorAlert: Story = {
  args: {
    title: 'Error',
    description: 'Failed to complete the action. Please try again later.',
    closeText: 'Close',
  },
};

export const WithChildren: Story = {
  args: {
    title: 'Monthly Summary',
    description: 'Here is your activity for this month:',
    closeText: 'Got it',
    children: (
      <ul className="text-white/70 list-disc pl-4 space-y-1">
        <li>Contribution streak: 30 days</li>
        <li>Pets earned: 3</li>
        <li>Total points: 1,500</li>
      </ul>
    ),
  },
};

export const MediumSize: Story = {
  args: {
    title: 'Update Available',
    description: 'A new version is ready. Please review the changelog below.',
    closeText: 'Dismiss',
    size: 'md',
    children: (
      <div className="bg-white/10 text-white rounded-md p-3 space-y-1 text-sm">
        <p>- Improved pet animation performance</p>
        <p>- Fixed streak calculation bug</p>
        <p>- Added new pet skins for top contributors</p>
      </div>
    ),
  },
};
