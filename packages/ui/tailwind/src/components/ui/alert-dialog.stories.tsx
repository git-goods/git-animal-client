import type { Meta, StoryObj } from '@storybook/react';
import { AlertDialog } from './alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
  },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeText: { control: 'text' },
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
      <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
        <li>Contribution streak: 30 days</li>
        <li>Pets earned: 3</li>
        <li>Total points: 1,500</li>
      </ul>
    ),
  },
};
