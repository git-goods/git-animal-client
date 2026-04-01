import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AlertDialog } from './alert-dialog';
import { Button } from './button';

const meta: Meta<typeof AlertDialog> = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    closeText: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="m" onClick={() => setIsOpen(true)}>
          Open AlertDialog
        </Button>
        <AlertDialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Notice',
    description: 'Your pet has leveled up!',
    closeText: 'OK',
  },
};

export const ErrorAlert: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="secondary" size="m" onClick={() => setIsOpen(true)}>
          Show Error
        </Button>
        <AlertDialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </>
    );
  },
  args: {
    title: 'Error',
    description: 'Failed to complete the action. Please try again later.',
    closeText: 'Close',
  },
};

export const WithChildren: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="primary" size="m" onClick={() => setIsOpen(true)}>
          Show Details
        </Button>
        <AlertDialog {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ul className="list-disc list-inside text-sm text-white/70 space-y-1">
            <li>Contribution streak: 30 days</li>
            <li>Pets earned: 3</li>
            <li>Total points: 1,500</li>
          </ul>
        </AlertDialog>
      </>
    );
  },
  args: {
    title: 'Monthly Summary',
    description: 'Here is your activity for this month:',
    closeText: 'Got it',
  },
};
